"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const context_1 = require("./context");
const curl_expr_parser_1 = require("./curl_expr_parser");
const helper_1 = require("./helper");
const lexer_1 = require("./lexer");
const token_type_1 = require("./token_type");
const type_parsing_1 = require("./type_parsing");
const converter_1 = require("./converter");
const ast_builder_1 = require("./ast_builder");
const value_1 = require("./value");
const char_type_1 = require("./value_types/char_type");
const function_type_1 = require("./value_types/function_type");
const int_type_1 = require("./value_types/int_type");
const ptr_type_1 = require("./value_types/ptr_type");
const value_type_1 = require("./value_types/value_type");
const scope_1 = require("./scope");
const main = () => {
    const main_c = process.argv.slice(2)[0] ?? (0, helper_1.throwError)(new Error('No input file provided'));
    let text;
    try {
        text = (0, fs_1.readFileSync)(main_c).toString();
    }
    catch (err) {
        (0, helper_1.throwError)(`No correct input filepath provided. Provided - ${main_c}`);
    }
    const lexer = new lexer_1.Lexer(text);
    let token;
    let prev;
    const context = new context_1.Context(lexer);
    while (token = lexer.next_token()) {
        let cur = token.toString();
        if (cur === prev) {
            throw new helper_1.LexerError(lexer, `REPETITION: cur=[${cur}] prev=[${prev}])`);
        }
        prev = cur;
        if (token.type === token_type_1.TokenType.PREPROCESSOR) {
            continue;
        }
        if (token.type === token_type_1.TokenType.KWD_STRUCT) {
            const struct_name = lexer.next_token_or_throw();
            if (struct_name.type !== token_type_1.TokenType.NAME) {
                (0, helper_1.throwError)(new helper_1.TokenParserError(struct_name ?? token, `Expected STRUCT name after kwd struct`));
            }
            const after_name = lexer.next_token_or_throw();
            if (after_name.type === token_type_1.TokenType.O_CURL) {
                const inside_tokens = (0, helper_1.iterUntilMatchingBracket)(lexer, after_name, token_type_1.TokenType.O_CURL, token_type_1.TokenType.C_CURL);
                const splitted = (0, helper_1.splitBy)(inside_tokens, t => t.type === token_type_1.TokenType.SEMICOLON);
                for (const gr of splitted) {
                    const ast = new ast_builder_1.AstBuilder(gr, context).build();
                    const { type, name } = (0, type_parsing_1.parse_declaration_from_ast_node)(context, ast);
                }
                // then it is struct declaration
            }
        }
        else if (token.type === token_type_1.TokenType.NAME) {
            const decl_tokens = [token];
            while (!!(token = lexer.next_token()) && (token.type === token_type_1.TokenType.NAME || token.type === token_type_1.TokenType.OP_ASTERISK)) {
                decl_tokens.push(token);
            }
            if (!token || (token.type !== token_type_1.TokenType.O_PAREN && token.type !== token_type_1.TokenType.SEMICOLON)) {
                throw new helper_1.ParserError(lexer, `Unknown expression type: ${token}`);
            }
            if (token.type == token_type_1.TokenType.O_PAREN) {
                const ast = new ast_builder_1.AstBuilder(decl_tokens, context).build();
                const return_decl = (0, type_parsing_1.parse_declaration_from_ast_node)(context, ast);
                const fun_name = return_decl.name;
                const fun_return_type = return_decl.type;
                const token_params = (0, helper_1.iterUntilMatchingBracket)(lexer, token, token_type_1.TokenType.O_PAREN, token_type_1.TokenType.C_PAREN);
                let splitted_params = [];
                if (token_params.length > 0) {
                    splitted_params = (0, helper_1.splitBy)(token_params, t => t.type === token_type_1.TokenType.COMMA);
                }
                const fun_params = splitted_params.map(p => {
                    const ast = new ast_builder_1.AstBuilder(p, context).build();
                    return (0, type_parsing_1.parse_declaration_from_ast_node)(context, ast);
                });
                const fun_value = new value_1.Value(fun_name, function_type_1.FunctionType.getInstance(fun_return_type, fun_params.map(v => v.type)), token.pos, -100, value_type_1.AddrType.Stack);
                context.addAssembly(`\r.def	${fun_value.name};
                                     \r.endef
                                     \r.globl	${fun_value.name}
                                     \r${fun_value.name}:
                                     \r.seh_proc ${fun_value.name}
                                     \r`);
                context.addGlobalValue(fun_value);
                context.pushScope(scope_1.TypeofScope.FUN_SCOPE);
                if (fun_value.name === 'main' && fun_params.length > 0) {
                    if (fun_params.length !== 2
                        || !fun_params[0].type.isSameType(int_type_1.IntType.getInstance())
                        || !fun_params[1].type.isSameType(ptr_type_1.PtrType.getInstance(ptr_type_1.PtrType.getInstance(char_type_1.CharType.getInstance())))) {
                        (0, helper_1.throwError)(new helper_1.ParserError(lexer, `Expected [int, char**] param types in main declaration or no params at all\nFound: ${fun_params.map(p => p.type).join(', ')}`));
                    }
                    context.addAssembly(`
                            \rmovl %ecx, ${context.pushStack(int_type_1.IntType.getInstance().size)}(%rsp)
                        `);
                    context.addScopeValue(new value_1.Value(fun_params[0].name, int_type_1.IntType.getInstance(), token_params[0].pos, context.stackPtr, value_type_1.AddrType.Stack));
                    context.addAssembly(`
                            \rmovq %rdx, ${context.pushStack(fun_params[1].type.size)}(%rsp)
                        `);
                    context.addScopeValue(new value_1.Value(fun_params[1].name, ptr_type_1.PtrType.getInstance(ptr_type_1.PtrType.getInstance(char_type_1.CharType.getInstance())), token_params[1].pos, context.stackPtr, value_type_1.AddrType.Stack));
                }
                else {
                    let offset = 0;
                    for (const param of fun_params.reverse()) {
                        const val = new value_1.Value(param.name, param.type, token.pos, context.pushStack(param.type.size), value_type_1.AddrType.Stack);
                        context.addScopeValue(val);
                        const [reg_c, mov] = (0, converter_1.get_rcx_i)(param.type.size);
                        const [reg_d, _] = (0, converter_1.get_rdx_i)(param.type.size);
                        context.addAssembly(`
                                \r${value_type_1.MOV_I[mov]} ${offset}(%rcx), %${value_type_1.REG_I[reg_d]}                                
                                \r${value_type_1.MOV_I[mov]} %${value_type_1.REG_I[reg_d]}, ${val.real_addr}(%rsp)                               
                            `);
                        offset += param.type.size;
                    }
                }
                token = lexer.next_token_or_throw();
                context.cur_function = fun_value;
                if (token.type === token_type_1.TokenType.O_CURL) {
                    const tokens = (0, helper_1.iterUntilMatchingBracket)(lexer, token, token_type_1.TokenType.O_CURL, token_type_1.TokenType.C_CURL);
                    new curl_expr_parser_1.CurlExpressionParser(context, tokens, null, null).parse();
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
            else if (token.type === token_type_1.TokenType.SEMICOLON) {
                (0, helper_1.TODO)();
            }
        }
        else {
            (0, helper_1.TODO)();
        }
    }
    // console.log(context.getAsm());
    context.asmToFile('out.asm');
};
try {
    main();
}
catch (err) {
    console.error(err);
}
