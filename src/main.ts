import { LexerError, ParserError, throwError, TODO, TokenParserError, splitBy, getMatchingBracket, iterUntilMatchingBracket } from "./helper";
import { strict } from "assert";
import { error } from "console";
import { readFileSync } from "fs";
import { CursorPos } from "readline";
import { TokenType } from "./token_type";
import { Lexer, Token } from "./lexer"
import { IntType, CharType, PtrType, Value, FunctionType, ValueType, VoidType } from "./value_types";
import { Context } from "./context";
import { SemicolonExprParser } from "./rvalue_expression_parser";


class CurlExpressionParser {

    constructor(public context: Context, public tokens: Token[]) {
    }

    parse(): Value | null {
        const tokens = this.tokens;
        // console.log('CurlExpressionParser\n', `${tokens}`);
        for (let i = 0; i < tokens.length; ++i) {
            if (tokens[i]!.type === TokenType.NAME) {
                const semi_index = tokens.slice(i + 1).findIndex(t => t.type === TokenType.SEMICOLON) + i + 1;
                if (semi_index === -1) {
                    throwError(new TokenParserError(tokens[i]!, "No semicolon at the of the expression"));
                }
                const tokens_till_semicolon = tokens.slice(i, semi_index);
                new SemicolonExprParser(this.context, tokens_till_semicolon).parse();
                i = semi_index;
            }
            else if (tokens[i]!.type === TokenType.PREPROCESSOR) {
                continue;
            }
            else {
                TODO(`ITER = ${i}, ${tokens[i]}`);
            }
        }
        return null;
    }

}


const main = () => {
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
        return [gen.next_token_or_throw(), new Value(next_token.text, type, next_token.pos)];
    }


    while (token = lexer.next_token()) {
        let cur = token.toString();
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
            const first_token = token;
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
                        throwError(new ParserError(lexer, `Unexpected token in function parameters ${token}`));
                    }
                    token = lexer.next_token_or_throw();
                    if (token.type === TokenType.C_PAREN) {
                        break;
                    }
                }
                const new_fun = new Value(name, FunctionType.getInstance(decl_type, fun_params.map(v => v.valueType)), first_token.pos);
                context.addScopeValue(new_fun);


                context.addAssembly(`\r.def	${new_fun.name};
                                     \r.endef
                                     \r.globl	${new_fun.name}
                                     \r${new_fun.name}:
                                     \r.seh_proc ${new_fun.name}
                                     \rsubq	$${context.stackPtr}, %rsp
                                     \r`);

                token = lexer.next_token_or_throw();
                if (token.type === TokenType.O_CURL) {
                    const tokens = iterUntilMatchingBracket(lexer, token, TokenType.O_CURL, TokenType.C_CURL);
                    new CurlExpressionParser(context, tokens).parse();
                }

                context.addAssembly(`\rxor %eax, %eax
                                     \raddq	$${context.init_stack_offset}, %rsp
	                                 \rretq
	                                 \r.seh_endproc
                                     \r`);
            }
        }
    }
    // console.log(context.getAsm());
    context.asmToFile('out.asm');
};


try {
    main();
} catch (err: any) {
    console.error(err);
}

