import { LexerError, ParserError, throwError, TODO, TokenParserError } from "./helper";
import { strict } from "assert";
import { error } from "console";
import { readFileSync } from "fs";
import { CursorPos } from "readline";
import { TokenType } from "./token_type";
import { Lexer, Token, toString } from "./lexer"
import { IntType, CharType, PtrType, Value, FunctionType, ValueType, VoidType } from "./value_types";
import { Context } from "./context";


function splitBy<T, U extends (arg0: T) => boolean>(arr: T[], cbk: U): T[][] {
    const arrs: T[][] = [];
    let prev_i = 0;
    for (let i = 0; i < arr.length; ++i) {
        if (cbk(arr[i]!) && i - prev_i > 0) {
            arrs.push(arr.slice(prev_i, i));
            prev_i = i + 1;
        }
    }
    return arrs;
}


class SemicolonExpressionParser {


    constructor(public context: Context) {
    }


    parse(tokens: Token[]): Value | null {

        if (tokens.length >= 3 && tokens[0]!.type === TokenType.NAME && tokens[1]!.type === TokenType.O_PAREN) {
            const c_parent_pos = tokens.findIndex(tok => tok.type === TokenType.C_PAREN);
            if (c_parent_pos === -1) {
                throwError(new TokenParserError(tokens[1]!, `Unclosed O_PAREN`));
            }
            const fun_name = tokens[0]!.text;
            const splitted = splitBy(tokens.slice(2, c_parent_pos), t => t.type === TokenType.COMMA);
            const params = splitted.map(s => this.parse(s)
                ?? throwError(new TokenParserError(tokens[0]!, "Void params are not allowed")));
            const actual_type = FunctionType.getInstance(VoidType.getInstance(), params.map(p => p.valueType));
            const fun_value = this.context.getValueWithTypeOrThrow(fun_name, actual_type);

            if (fun_value.name === 'print') {
                this.context.addAssembly(`leaq ${params[0]!.getAddress()}(%rsp), %rdx`);
                this.context.addAssembly(`movl ${params[1]!.getAddress()}(%rsp), %r8d`);
                return null;
            } else {
                TODO();
            }
        }


        TODO();
    }

}


class Asm {
    asm: string = '';
    add(asm: string): void {
        this.asm += asm;
    }
}

const main = () => {

    let asm = new Asm();
    const text = readFileSync("./example/main.c").toString();

    const lexer = new Lexer(text);

    let token: Token | null;
    let prev;
    let i = 0;

    const tokens = [];

    const context = new Context(lexer);


    const parseDeclarationType = (token: Token, gen: Lexer): [Token, ValueType] => {
        let type: ValueType | null;
        let isConst = false;
        while (token.type === TokenType.KWD_CONST) {
            isConst = true;
            token = gen.next_token_or_throw();
        }
        if (!(type = context.isFamiliarTypename(token.text))) {
            throwError(new LexerError(gen, `Unknown VALUE TYPE: [${token.text}]`));
        }
        while ((token = gen.next_token_or_throw()).type === TokenType.KWD_CONST) {
            isConst = true;
        }
        type.is_const = isConst;

        while (token.type === TokenType.OP_ASTERISK) {
            type = PtrType.getInstance(type);
            let next_token = gen.next_token_or_throw();
            if (next_token.type === TokenType.KWD_CONST) {
                type.is_const = true;
                next_token = gen.next_token_or_throw();
            }
            token = next_token;
        }

        return [token, type];
    };
    const parseDeclarationTypeWithName = (token: Token, gen: Lexer): [Token, Value] => {
        const [next_token, type] = parseDeclarationType(token, gen);
        if (next_token.type !== TokenType.NAME || context.isFamiliarValueName(next_token.text)) {
            throwError(new ParserError(gen, `Token type ${TokenType[next_token.type]}`));
        }
        return [gen.next_token_or_throw(), new Value(next_token.text, type)];
    }


    const genAsmOfFunctionCall = (fun_name: string, fun_type: FunctionType, gen: Lexer) => {
        if (lexer.next_token_or_throw().type !== TokenType.O_PAREN) {
            throwError(new ParserError(lexer, "Not function call"));
        }
        let token;
        let value;
        while ((token = lexer.next_token_or_throw()).type !== TokenType.C_PAREN) {
            if (token.type === TokenType.NAME && (value = context.isFamiliarValueNameOrThrow(token.text))) {
                asm.add(`movl ${value.getAddress()}(%rsp), %rcx`);
            }
            else if ()
        }
    };

    while (token = lexer.next_token()) {
        console.log(`${i++}-th token: ${toString(token)}\n`);
        let cur = toString(token);
        tokens.push(token);
        if (cur === prev) {
            throw new LexerError(lexer, `REPETITION: cur=[${cur}] prev=[${prev}])`);
        }
        prev = cur;

        if (token.type === TokenType.PREPROCESSOR) {
            continue;
        }

        let decl_type: ValueType;
        [token, decl_type] = parseDeclarationType(token, lexer);

        let obj: Value;


        if (token.type === TokenType.NAME && !context.isFamiliarValueName(token.text)) {
            const name = token.text;
            token = lexer.next_token_or_throw();
            if (token.type === TokenType.O_PAREN) {
                token = lexer.next_token_or_throw();
                let val: Value;
                const fun_params: Value[] = [];
                while ([token, val] = parseDeclarationTypeWithName(token, lexer)) {
                    // console.log(toString(token), val.toString());
                    fun_params.push(val);
                    if (token.type === TokenType.C_PAREN) {
                        break;
                    }
                    if (token.type !== TokenType.COMMA) {
                        throwError(new ParserError(lexer, `Unexpected token in function parameters ${toString(token)}`));
                    }
                    token = lexer.next_token_or_throw();
                    if (token.type === TokenType.C_PAREN) {
                        break;
                    }
                }
                const decl_function = FunctionType.getInstance(decl_type, fun_params.map(v => v.valueType));
                console.log(decl_function.toString());
                const new_fun = new Value(name, decl_function);
                context.addScopeValue(new_fun);

                asm.add(`.def	${new_fun.name};
                        .endef
                        .globl	${new_fun.name}
                        ${new_fun.name}:
                        .seh_proc ${new_fun.name}
                        subq	$40, %rsp
                        `);

                token = lexer.next_token_or_throw();
                let value: Value | null;
                if (token.type === TokenType.O_CURL) {
                    context.pushScope();
                    while ((token = lexer.next_token_or_throw()).type !== TokenType.C_CURL) {
                        if (token.type === TokenType.NAME) {
                            if (context.isFamiliarTypename(token.text)) {
                                parseDeclarationTypeWithName(token, lexer);
                                TODO();
                            }
                            else if (!!(value = context.isFamiliarValueName(token.text))) {
                                if (value.valueType instanceof FunctionType) {
                                    const fun_type: FunctionType = value.valueType;

                                    if ((token = lexer.next_token_or_throw()).type === TokenType.O_PAREN) {

                                        while ((token = lexer.next_token_or_throw()).type !== TokenType.C_PAREN) {


                                        }

                                    }
                                }

                            } else {
                                throwError(new ParserError(lexer, `Unknown value [${token.text}}]`));
                            }
                        }
                    }
                }

            }
        }



    }
    // console.log(tokens.map((t) => t.text).join(' @\n\r'));

};


try {
    main();
} catch (err: any) {
    console.error(err);
}