import { LexerError, ParserError, throwError, TODO } from "./helper";
import { strict } from "assert";
import { error } from "console";
import { readFileSync } from "fs";
import { CursorPos } from "readline";
import { TokenType } from "./token_type";
import { Lexer, Token, toString } from "./lexer"
import { IntType, CharType, PtrType, Value, FunctionType, ValueType, VoidType } from "./value_types";




class Context {

    BUILT_IN_TYPES = {
        int: IntType.constructor,
        char: CharType.constructor,
    };

    private scopeValues: (Value[])[] = [[],];
    private scopeTypes: (ValueType[])[] = [[],];
    private literals: string[] = [];

    constructor(public lexer: Lexer) { }


    isFamiliarTypename(typename: string): ValueType | null {
        switch (typename) {
            case 'int': return IntType.getInstance();
            case 'char': return CharType.getInstance();
            case 'void': return VoidType.getInstance();
            default: return null;
        }
    }

    isFamiliarTypenameOrThrow(typename: string): ValueType {
        if (typename in this.BUILT_IN_TYPES) {
            return (this.BUILT_IN_TYPES[typename as keyof typeof this.BUILT_IN_TYPES] as Function)();
        }
        throw new ParserError(this.lexer, `Unknown type: [${typename}]`);
    }

    pushScope() {
        this.scopeValues.push([]);
        this.scopeTypes.push([]);
    }

    popScope() {
        this.scopeValues.pop();
        this.scopeTypes.pop();
    }

    addScopeType() {
        TODO();
    }

    addScopeValue(value: Value) {
        this.scopeValues.at(-1)!.push(value);
    }


    addStringLiteral(literal: string) {
        if (!this.literals.includes(literal)) {
            this.literals.push(literal);
        }
    }

    isFamiliarValue(name: string): Value | null {
        if (name === 'printf') {
            return true;
        }
        return false;
    }

}



const main = () => {

    let asm: string = "";
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
        if (next_token.type !== TokenType.NAME || context.isFamiliarValue(next_token.text)) {
            throwError(new ParserError(gen, `Token type ${TokenType[next_token.type]}`));
        }
        return [gen.next_token_or_throw(), new Value(next_token.text, type)];
    }

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


        if (token.type === TokenType.NAME && !context.isFamiliarNameInScope(token.text)) {
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

                asm += `.def	${new_fun.name};
                        .endef
                        .globl	${new_fun.name}
                        ${new_fun.name}:
                        .seh_proc ${new_fun.name}
                        subq	$40, %rsp
                        `;

                token = lexer.next_token_or_throw();
                if (token.type === TokenType.O_CURL) {
                    context.pushScope();
                    while ((token = lexer.next_token_or_throw()).type !== TokenType.C_CURL) {
                        if (token.type === TokenType.NAME) {
                            if (context.isFamiliarTypename(token.text)) {
                                parseDeclarationTypeWithName(token, lexer);
                                TODO();
                            }
                            else if (context.isFamiliarNameInScope(token.text)) {

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