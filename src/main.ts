import { LexerError, ParserError, throwError, TODO, TokenParserError, splitBy, getMatchingBracket, iterUntilMatchingBracket } from "./helper";
import { strict } from "assert";
import { error } from "console";
import { readFileSync } from "fs";
import { CursorPos } from "readline";
import { TokenType } from "./token_type";
import { Lexer, Token } from "./lexer"
import { IntType, CharType, PtrType, Value, FunctionType, ValueType, VoidType, AddrType } from "./value_types";
import { Context } from "./context";
import { SemicolonExprParser } from "./rvalue_expression_parser";


class CurlExpressionParser {

    constructor(public context: Context, public tokens: Token[]) {
    }

    parse(): Value | null {

        const { context, tokens } = this;
        // console.log('CurlExpressionParser\n', `${tokens}`);
        let is_prev_if = false;
        let mark_for_next_if: string | null = null;

        const parse_IF_expr = (i: number, with_condition: boolean, mark_if_false: string, mark_if_true: string): number => {
            let o_paren_pos;
            let c_paren_pos = i;
            let token = tokens[i]!;
            if (with_condition) {
                o_paren_pos = i + 1;
                context.pushScope();
                if (o_paren_pos >= tokens.length
                    || tokens[o_paren_pos]!.type !== TokenType.O_PAREN
                    || (c_paren_pos = getMatchingBracket(tokens, o_paren_pos, TokenType.O_PAREN, TokenType.C_PAREN)) === -1) {
                    throwError(new TokenParserError(token, `No matching O_PAREN found for IF keyword`));
                }
                const res = new SemicolonExprParser(context, tokens.slice(o_paren_pos + 1, c_paren_pos)).parse(false);
                // res - 1 byte value which either $0 or $1
                context.addAssembly(`
                        \r #IF
                        \rxor %edx, %edx
                        \rmovb ${res.address}(%rsp), %dh
                        \rcmpb $0, %dh
                        \rje ${mark_if_false}
                `);
            }
            let o_curl_pos = c_paren_pos + 1, c_curl_pos;
            if (o_curl_pos >= tokens.length
                || tokens[o_curl_pos]!.type !== TokenType.O_CURL
                || (c_curl_pos = getMatchingBracket(tokens, o_curl_pos, TokenType.O_CURL, TokenType.C_CURL)) === -1) {
                throwError(new TokenParserError(token, `No matching O_CURL found for IF keyword`));
            }
            new CurlExpressionParser(context, tokens.slice(o_curl_pos + 1, c_curl_pos)).parse();
            context.addAssembly(`
                \rjmp ${mark_if_true}
                `);
            context.popScope();

            return c_curl_pos;
        };


        for (let i = 0; i < tokens.length; ++i) {
            let token = tokens[i]!;
            if (token.type === TokenType.KWD_IF) {
                let mark_if_false = context.gen_mark();
                let mark_if_true = context.gen_mark();
                i = parse_IF_expr(i, true, mark_if_false, mark_if_true);
                while (++i < tokens.length) {
                    if (tokens[i]!.type === TokenType.KWD_ELSE && tokens[i + 1]!.type === TokenType.KWD_IF) {
                        context.addAssembly(`
                            \r${mark_if_false}:
                            `);
                        mark_if_false = context.gen_mark();
                        i = parse_IF_expr(i + 1, true, mark_if_false, mark_if_true);
                    }
                    else if (tokens[i]!.type === TokenType.KWD_ELSE) {
                        context.addAssembly(`
                            \r${mark_if_false}:
                            `);
                        mark_if_false = context.gen_mark();
                        i = parse_IF_expr(i, false, mark_if_false, mark_if_true);
                    }
                    else {
                        --i;
                        break;
                    }
                }
                context.addAssembly(`
                        \r${mark_if_false}:
                    `);
                context.addAssembly(`
                        \r${mark_if_true}:
                    `);
            }
            else {
                let j = tokens.slice(i).findIndex((t) => t.type === TokenType.SEMICOLON);
                if (j === -1) {
                    throwError(new TokenParserError(tokens[i]!, `Unknown expression type: ${tokens.slice(i)}`));
                }
                j += i;
                if (i === j) {
                    break;
                }
                new SemicolonExprParser(context, tokens.slice(i, j)).parse(false);
                i = j;
            }

        }
        // for (const line of splitBy(tokens, (t) => t.type === TokenType.SEMICOLON)) {
        // const filtered = line.filter(t => t.type !== TokenType.PREPROCESSOR);
        // if (filtered.length > 0) {
        // new SemicolonExprParser(this.context, line).parse(false);
        // }
        // }
        // for (let i = 0; i < tokens.length; ++i) {
        //     if (tokens[i]!.type === TokenType.NAME) {
        //         const semi_index = tokens.slice(i + 1).findIndex(t => t.type === TokenType.SEMICOLON) + i + 1;
        //         if (semi_index === -1) {
        //             throwError(new TokenParserError(tokens[i]!, "No semicolon at the of the expression"));
        //         }
        //         const tokens_till_semicolon = tokens.slice(i, semi_index);
        //         new SemicolonExprParser(this.context, tokens_till_semicolon).parse();
        //         i = semi_index;
        //     }
        //     else if (tokens[i]!.type === TokenType.PREPROCESSOR) {
        //         continue;
        //     }
        //     else {
        //         TODO(`ITER = ${i}, ${tokens[i]}`);
        //     }
        // }
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
        if (!(type = context.hasTypename(token.text))) {
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
        if (next_token.type !== TokenType.NAME || context.hasValue(next_token.text)) {
            throwError(new ParserError(gen, `Token type ${TokenType[next_token.type]}`));
        }
        return [gen.next_token_or_throw(), new Value(next_token.text, type, next_token.pos, 100, AddrType.Stack)];
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


        if (token.type === TokenType.NAME && !context.hasValue(token.text)) {
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
                const new_fun = new Value(name, FunctionType.getInstance(decl_type, fun_params.map(v => v.valueType)), first_token.pos, -100, AddrType.Stack);
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

