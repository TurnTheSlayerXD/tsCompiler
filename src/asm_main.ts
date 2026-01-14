import * as fs from "fs";
import { Context } from "./context";
import { CurlExpressionParser } from "./curl_expr_parser";
import { iterUntilMatchingBracket, LexerError, ParserError, splitBy, throwError, TODO, TokenParserError } from "./helper";
import { Lexer, Token } from "./lexer";
import { TokenType } from "./token_type";
import { parse_declaration_from_ast_node } from "./type_parsing";
import { AstBuilder } from "./ast_builder";
import { NamedValue, Value } from "./value";
import { CharType } from "./value_types/char_type";
import { FunctionType } from "./value_types/function_type";
import { IntType } from "./value_types/int_type";
import { PtrType } from "./value_types/ptr_type";
import { ValueType } from "./value_types/value_type";
import { TypeofScope } from "./scope";
import { StructType } from "./value_types/struct_type";
import { ArrayType } from "./value_types/array_type";
import { IndirectRegisterWithOffset, Register, StaticLocation } from "./instruction/mem_location";
import { get_mov_i_on_size, MovInstr, RetqInstr, StringInstruction } from "./instruction/instruction";
import { SCANF_DECL } from "./imp_scanf";

export class AsmGenerator {
    
    public parseProgram(programText: string, genParams: { doImportScanf?: boolean } = { doImportScanf: false }): string {
        const context = new Context();
        const lexer = new Lexer(programText);
        this.doProcessing(context, lexer);
        let finalProgramText = "";
        if (genParams.doImportScanf) {
            finalProgramText += SCANF_DECL + "\n";
        }
        const programInstructions = context.interpretInstructions();
        finalProgramText += programInstructions.join("\n");
        return finalProgramText;
    }

    private doProcessing(context: Context, lexer: Lexer): void {

        let token: Token | null;
        let prev;

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
                    const { name: funName, type: funReturnType } = parse_declaration_from_ast_node(context, ast);

                    const token_params = iterUntilMatchingBracket(lexer, token, TokenType.O_PAREN, TokenType.C_PAREN)
                    let splitted_params: Token[][] = [];
                    if (token_params.length > 0) {
                        splitted_params = splitBy(token_params, t => t.type === TokenType.COMMA);
                    }
                    const funParams = splitted_params.map(p => {
                        const ast = new AstBuilder(p, context).build();
                        return parse_declaration_from_ast_node(context, ast);
                    });
                    const declaredFunValue = new NamedValue(
                        funName,
                        new Value(new StaticLocation(), FunctionType.getInstance(funReturnType, funParams.map(v => v.type)), token.pos),
                    );
                    context.currentFunction = declaredFunValue;

                    context.addInstruction(new StringInstruction(`.def ${declaredFunValue.name}`));
                    context.addInstruction(new StringInstruction(`.endef`));
                    context.addInstruction(new StringInstruction(`.globl ${declaredFunValue.name}`));
                    context.addInstruction(new StringInstruction(`${declaredFunValue.name}:`));
                    context.addInstruction(new StringInstruction(`.seh_proc ${declaredFunValue.name}`));

                    context.addNewVarValue(declaredFunValue);

                    context.pushScope(TypeofScope.FUN_SCOPE);

                    if (declaredFunValue.name === 'main' && funParams.length > 0) {
                        const argvTypeDef = PtrType.getInstance(PtrType.getInstance(CharType.getInstance()));
                        if (!funParams[0]?.type.isSameType(IntType.getInstance()) || !funParams[1]?.type.isSameType(argvTypeDef)) {
                            throwError(new ParserError(lexer, `Expected [int, char**] param types in main declaration or no params at all\nFound: ${funParams.map(p => p.type).join(', ')}`));
                        }

                        const memlocForArgC = context.getNewMemLocation(IntType.getInstance());
                        const memlocForArgV = context.getNewMemLocation(argvTypeDef);

                        context.addInstruction(new MovInstr("movl", memlocForArgC, Register.getInstance("ecx")))
                        const argcVar = new NamedValue("argc", new Value(memlocForArgC, IntType.getInstance(), token_params[0]!.pos));

                        context.addInstruction(new MovInstr("movq", memlocForArgV, Register.getInstance("rdx")))
                        const argvVar = new NamedValue("argv", new Value(memlocForArgV, argvTypeDef, token_params[1]!.pos));

                        context.addNewVarValue(argcVar);
                        context.addNewVarValue(argvVar);

                        // context.addAssembly(`
                        //     \rmovl %ecx, ${context.pushStack(IntType.getInstance().size)}(%rsp)
                        // `);
                        // context.addScopeValue(new Value(fun_params[0]!.name, IntType.getInstance(), token_params[0]!.pos, context.stackPtr, AddrType.Stack));
                        // context.addAssembly(`
                        //     \rmovq %rdx, ${context.pushStack(fun_params[1]!.type.size)}(%rsp)
                        // `);
                        // context.addScopeValue(new Value(fun_params[1]!.name, PtrType.getInstance(PtrType.getInstance(CharType.getInstance())), token_params[1]!.pos, context.stackPtr, AddrType.Stack));
                    }
                    else {
                        let offset = 0;
                        for (const { name: paramName, type: paramType } of funParams.reverse()) {
                            const memlocForVar = context.getNewMemLocation(paramType)
                            const movInstr = get_mov_i_on_size(paramType.size);
                            const bufRegister = Register.getFrom("b", paramType.size);
                            context.addInstruction(new MovInstr(
                                movInstr,
                                bufRegister,
                                new IndirectRegisterWithOffset(Register.forParamPass(), offset),
                            ));
                            context.addInstruction(new MovInstr(movInstr, memlocForVar, bufRegister))

                            const varFromParam = new NamedValue(paramName, new Value(memlocForVar, paramType, token.pos));
                            context.addNewVarValue(varFromParam);

                            offset += paramType.size;
                        }
                    }
                    token = lexer.next_token_or_throw();
                    if (token.type === TokenType.O_CURL) {
                        const tokens = iterUntilMatchingBracket(lexer, token, TokenType.O_CURL, TokenType.C_CURL);
                        new CurlExpressionParser(context, tokens).parse();
                    }

                    if (!(context._currentScope.instructions.at(-1) instanceof RetqInstr)) {
                        context.popScope({withPopInstr: true});
                        if (funName === 'main') {
                            context.addInstruction(new StringInstruction("xor %rax, %rax"));
                        }
                        context.addInstruction(new RetqInstr());
                    } 
                    else {
                        context.popScope({withPopInstr: false});
                    }
                    context.addInstruction(new StringInstruction(".seh_endproc"));
                }
                else if (token.type === TokenType.SEMICOLON) {
                    TODO();
                }

            } else {
                TODO(token.toString());
            }
        }

    }
}


