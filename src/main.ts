import { readFileSync } from "fs";
import { Context } from "./context";
import { CurlExpressionParser } from "./curl_expr_parser";
import { getMatchingBracket, iterUntilMatchingBracket, LexerError, ParserError, splitBy, throwError, TODO, TokenParserError, UNREACHABLE } from "./helper";
import { Lexer, Token } from "./lexer";
import { TokenType } from "./token_type";
import { parse_declaration_from_ast_node, parse_type_from_ast_node } from "./type_parsing";
import { AstBuilder } from "./ast_builder";
import { Value } from "./value";
import { CharType } from "./value_types/char_type";
import { FunctionType } from "./value_types/function_type";
import { IntType } from "./value_types/int_type";
import { PtrType } from "./value_types/ptr_type";
import { AddrType, MOV_I, REG_I, ValueType } from "./value_types/value_type";
import { TypeofScope } from "./scope";
import { StructType } from "./value_types/struct_type";
import { ArrayType } from "./value_types/array_type";


const main = () => {
    const main_c = process.argv.slice(2)[0] ?? throwError(new Error('No input file provided'));
    const out_asm = process.argv.slice(3)[0] ?? throwError(new Error('No output file provided'));
    let text;
    try {
        text = readFileSync(main_c).toString();
    }
    catch (err) {
        throwError(`No correct input filepath provided. Provided - ${main_c}`);
    }
    const lexer = new Lexer(text);

    let token: Token | null;
    let prev;

    const context = new Context(lexer);

    while (token = lexer.next_token()) {
        let cur = token.toString();
        if (cur === prev) {
            throw new LexerError(lexer, `REPETITION: cur=[${cur}] prev=[${prev}])`);
        }
        prev = cur;

        if (token.type === TokenType.SEMICOLON) {
            continue;
        }
        if (token.type === TokenType.PREPROCESSOR) {
            continue;
        }
        if (token.type === TokenType.KWD_STRUCT) {
            const struct_name = lexer.next_token_or_throw();
            if (struct_name.type !== TokenType.NAME) {
                throwError(new TokenParserError(struct_name ?? token, `Expected STRUCT name after kwd struct`));
            }
            const after_name = lexer.next_token_or_throw();
            if (after_name.type === TokenType.O_CURL) {
                // then it is struct declaration
                const inside_tokens = iterUntilMatchingBracket(lexer, after_name, TokenType.O_CURL, TokenType.C_CURL);
                const fields: { name: string, type: ValueType }[] = [];

                const struct_type = StructType.getInstance(struct_name.text);
                context.addGlobalStructType(struct_type);

                const splitted = splitBy(inside_tokens, t => t.type === TokenType.SEMICOLON).filter(gr => gr.length > 0);
                for (const gr of splitted) {
                    const ast = new AstBuilder(gr, context).build();
                    fields.push(parse_declaration_from_ast_node(context, ast));
                }
                let offset = 0;
                for (const f of fields) {
                    struct_type.fields.push({ name: f.name, type: f.type, offset });
                    if (f.type instanceof ArrayType) {
                        offset += f.type.array_size ?? throwError(new TokenParserError(after_name, `Expected size in array struct field.`));
                    }
                    else {
                        offset += f.type.size;
                    }
                }
                struct_type._size = offset;
                console.log('struct_type', struct_type);
            }
            else {
                TODO();
            }
        }
        else if (token.type === TokenType.NAME) {
            const decl_tokens = [token];

            while (!!(token = lexer.next_token()) && (token.type === TokenType.NAME || token.type === TokenType.OP_ASTERISK)) {
                decl_tokens.push(token);
            }

            if (!token || (token.type !== TokenType.O_PAREN && token.type !== TokenType.SEMICOLON)) {
                throw new ParserError(lexer, `Unknown expression type: ${token}`);
            }

            if (token.type == TokenType.O_PAREN) {
                const ast = new AstBuilder(decl_tokens, context).build();
                const return_decl = parse_declaration_from_ast_node(context, ast);
                const fun_name = return_decl.name;
                const fun_return_type = return_decl.type;

                const token_params = iterUntilMatchingBracket(lexer, token, TokenType.O_PAREN, TokenType.C_PAREN)
                let splitted_params: Token[][] = [];
                if (token_params.length > 0) {
                    splitted_params = splitBy(token_params, t => t.type === TokenType.COMMA);
                }
                const fun_params = splitted_params.map(p => {
                    const ast = new AstBuilder(p, context).build();
                    return parse_declaration_from_ast_node(context, ast);
                });
                const fun_value = new Value(fun_name, FunctionType.getInstance(fun_return_type, fun_params.map(v => v.type)), token.pos, -100, AddrType.Stack);

                context.addAssembly(`\r.def	${fun_value.name};
                                     \r.endef
                                     \r.globl	${fun_value.name}
                                     \r${fun_value.name}:
                                     \r.seh_proc ${fun_value.name}
                                     \r`);
                context.addGlobalValue(fun_value);
                context.pushScope(TypeofScope.FUN_SCOPE);
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
                else {
                    let offset = 0;
                    for (const param of fun_params.reverse()) {
                        const val = new Value(param.name, param.type, token.pos, context.pushStack(param.type.size), AddrType.Stack);
                        context.addScopeValue(val);
                        const [reg_c, mov] = get_rcx_i(param.type.size);
                        const [reg_d, _] = get_rdx_i(param.type.size);
                        context.addAssembly(`
                                \r${MOV_I[mov]} ${offset}(%rcx), %${REG_I[reg_d]}                                
                                \r${MOV_I[mov]} %${REG_I[reg_d]}, ${val.real_addr}(%rsp)                               
                            `);
                        offset += param.type.size;
                    }
                }
                token = lexer.next_token_or_throw();
                context.cur_function = fun_value;
                if (token.type === TokenType.O_CURL) {
                    const tokens = iterUntilMatchingBracket(lexer, token, TokenType.O_CURL, TokenType.C_CURL);
                    new CurlExpressionParser(context, tokens, null, null).parse();
                }
                context.popScope();

                if (!context.ends_with_retq()) {
                    if (fun_name === 'main') {
                        context.addAssembly(`
                                     \rxor %rax, %rax
	                                 \rretq
                                     `);
                    }
                    else {
                        context.addAssembly(`
	                                 \rretq
                                     `);
                    }
                }
                context.addAssembly(`
	                                 \r.seh_endproc
                                     `);
            }
            else if (token.type === TokenType.SEMICOLON) {
                TODO();
            }

        } else {
            TODO();
        }
    }
    // console.log(context.getAsm());
    context.asmToFile(out_asm);
};


try {
    main();
} catch (err: any) {
    console.error(err);
}

