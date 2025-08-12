import { readFileSync } from "fs";
import { Context } from "./context";
import { CurlExpressionParser } from "./curl_expr_parser";
import { iterUntilMatchingBracket, LexerError, ParserError, splitBy, throwError, TODO } from "./helper";
import { Lexer, Token } from "./lexer";
import { TokenType } from "./token_type";
import { parse_declaration_from_tokens } from "./type_parsing";
import { AddrType, CharType, FunctionType, IntType, PtrType, Value } from "./value_types";


const main = () => {
    const text = readFileSync("./example/main.c").toString();

    const lexer = new Lexer(text);

    let token: Token | null;
    let prev;
    let i = 0;


    const context = new Context(lexer);

    while (token = lexer.next_token()) {
        let cur = token.toString();
        if (cur === prev) {
            throw new LexerError(lexer, `REPETITION: cur=[${cur}] prev=[${prev}])`);
        }
        prev = cur;

        if (token.type === TokenType.PREPROCESSOR) {
            continue;
        }



        if (token.type === TokenType.NAME) {
            const decl_tokens = [token];

            while (!!(token = lexer.next_token()) && token.type === TokenType.NAME) {
                decl_tokens.push(token);
            }


            if (!token || (token.type !== TokenType.O_PAREN && token.type !== TokenType.SEMICOLON)) {
                throw new ParserError(lexer, 'Unknown expression type');
            }

            if (token.type == TokenType.O_PAREN) {
                const return_decl = parse_declaration_from_tokens(context, decl_tokens);
                const fun_name = return_decl.name;
                const fun_return_type = return_decl.type;

                const token_params = iterUntilMatchingBracket(lexer, token, TokenType.O_PAREN, TokenType.C_PAREN)
                const splitted_params = splitBy(token_params, t => t.type === TokenType.COMMA);

                const fun_params = splitted_params.map(p => parse_declaration_from_tokens(context, p));
                const fun_value = new Value(fun_name, FunctionType.getInstance(fun_return_type, fun_params.map(v => v.type)), token.pos, -100, AddrType.Stack);

                context.addAssembly(`\r.def	${fun_value.name};
                                     \r.endef
                                     \r.globl	${fun_value.name}
                                     \r${fun_value.name}:
                                     \r.seh_proc ${fun_value.name}
                                     \r`);
                context.pushScope();

                if (fun_value.name === 'main' && fun_params.length > 0) {
                    if (fun_params.length !== 2
                        || !fun_params[0]!.type.isSameType(IntType.getInstance())
                        || !fun_params[1]!.type.isSameType(PtrType.getInstance(PtrType.getInstance(CharType.getInstance())))) {
                        throwError(new ParserError(lexer, `Expected [int, char**] param types in main declaration or no params at all\nFound: ${fun_params.map(p => p.type).join(', ')}`));
                    }


                    context.addAssembly(`
                            \rmovl %ecx, ${context.pushStack(IntType.getInstance().size)}(%rsp)
                        `);
                    context.addScopeValue(new Value(fun_params[0]!.name, IntType.getInstance(), token_params[0]!.pos, context.stackPtr, AddrType.Stack));

                    context.addAssembly(`
                            \rmovq %rdx, ${context.pushStack(fun_params[1]!.type.size)}(%rsp)
                        `);
                    context.addScopeValue(new Value(fun_params[1]!.name, PtrType.getInstance(PtrType.getInstance(CharType.getInstance())), token_params[1]!.pos, context.stackPtr, AddrType.Stack));

                }

                token = lexer.next_token_or_throw();
                if (token.type === TokenType.O_CURL) {
                    const tokens = iterUntilMatchingBracket(lexer, token, TokenType.O_CURL, TokenType.C_CURL);
                    new CurlExpressionParser(context, tokens, null, null).parse();
                }

                context.popScope();
                context.addAssembly(`
                                     \rxor %eax, %eax
	                                 \rretq
	                                 \r.seh_endproc
                                     \r`);

            }
            else if (token.type === TokenType.SEMICOLON) {
                TODO();
            }

        } else {
            TODO();
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

