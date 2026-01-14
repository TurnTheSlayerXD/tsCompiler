import { Context } from "./context";
import { convert_val_to_type } from "./converter";
import { DebugPosError, findIndex, getMatchingBracket, splitBy, throwError, TokenParserError, UNREACHABLE } from "./helper";
import { CmpInstr, JniInstr } from "./instruction/comparison_instruction";
import { get_mov_i_on_size, JmpInstr, MarkToJump, MovInstr, PopScopeInstr, RetqInstr, StringInstruction } from "./instruction/instruction";
import { LiteralMemLocation, Register } from "./instruction/mem_location";
import { Token } from "./lexer";
import { SemicolonExprParser } from "./rvalue_expression_parser";
import { Scope, TypeofScope } from "./scope";
import { TokenType } from "./token_type";
import { Value, valueToMemLoc } from "./value";
import { FunctionType } from "./value_types/function_type";
import { VoidType } from "./value_types/void_type";

export class CurlExpressionParser {

    constructor(public context: Context, public tokens: Token[]) {
    }


    parse(): Value | null {
        // console.log('CurlExpressionParser\n', `${tokens}`);

        for (let i = 0; i < this.tokens.length; ++i) {
            let token = this.tokens[i]!;
            if (token.type === TokenType.KWD_IF) {
                let forBranchFailedCase = this.context.getNewMarkToJump();
                const forBranchSuccededCase = this.context.getNewMarkToJump();
                i = this.parse_IF_expr(i, true, forBranchFailedCase, forBranchSuccededCase);
                while (++i < this.tokens.length) {
                    if (this.tokens[i]!.type === TokenType.KWD_ELSE && this.tokens[i + 1]!.type === TokenType.KWD_IF) {

                        //mark to jump if previous condition failed
                        this.context.addInstruction(forBranchFailedCase);

                        const newMark = this.context.getNewMarkToJump();
                        forBranchFailedCase = newMark;

                        i = this.parse_IF_expr(i + 1, true, forBranchFailedCase, forBranchSuccededCase);
                    }
                    else if (this.tokens[i]!.type === TokenType.KWD_ELSE) {

                        this.context.addInstruction(forBranchFailedCase);

                        const newMark = this.context.getNewMarkToJump();
                        forBranchFailedCase = newMark;
                        i = this.parse_IF_expr(i, false, forBranchFailedCase, forBranchSuccededCase);
                        break;
                    }
                    else {
                        --i;
                        break;
                    }
                }
                this.context.addInstruction(forBranchFailedCase);
                this.context.addInstruction(forBranchSuccededCase);
            }
            else if (this.tokens[i]!.type === TokenType.KWD_ELSE) {
                throwError(new TokenParserError(this.tokens[i]!, 'KWD ELSE must be preceeded with IF expression'));
            }
            else if (this.tokens[i]!.type === TokenType.KWD_FOR) {
                i = this.parse_FOR_expr(i);
            }
            else if (this.tokens[i]!.type === TokenType.KWD_WHILE) {
                i = this.parse_WHILE_expr(i);
            }
            else if (this.tokens[i]!.type === TokenType.KWD_BREAK) {
                let poppedScope: Scope | null = this.context.getCurrentScope();
                while (poppedScope && poppedScope.typeofScope !== TypeofScope.CYCLE_SCOPE) {
                    this.context.addInstruction(new PopScopeInstr(poppedScope));
                    poppedScope = poppedScope.parentScope;
                }
                if (!poppedScope) {
                    throwError(new DebugPosError(this.tokens[i]!.pos, 'KWD BREAK can be used only inside CYCLE'));
                }
                //for compiler
                if (poppedScope.scopeParams.typeofScope !== TypeofScope.CYCLE_SCOPE) {
                    UNREACHABLE();
                }

                this.context.addInstruction(new PopScopeInstr(poppedScope));
                this.context.addInstruction(new JmpInstr(poppedScope.scopeParams.markToExitCycle));
            }
            else if (this.tokens[i]!.type === TokenType.KWD_CONTINUE) {
                let poppedScope: Scope | null = this.context.getCurrentScope();
                while (poppedScope && poppedScope.typeofScope !== TypeofScope.CYCLE_SCOPE) {
                    this.context.addInstruction(new PopScopeInstr(poppedScope));
                    poppedScope = poppedScope.parentScope;
                }
                if (!poppedScope) {
                    throwError(new DebugPosError(this.tokens[i]!.pos, 'KWD BREAK can be used only inside CYCLE'));
                }
                //for compiler
                if (poppedScope.scopeParams.typeofScope !== TypeofScope.CYCLE_SCOPE) {
                    UNREACHABLE();
                }

                this.context.addInstruction(new JmpInstr(poppedScope.scopeParams.markToEnterCycle));
            }
            else if (this.tokens[i]!.type === TokenType.KWD_RETURN) {
                let semi_pos = findIndex(this.tokens, t => t.type === TokenType.SEMICOLON, i);
                if (semi_pos === -1) {
                    throwError(new TokenParserError(this.tokens[i]!, `Expected SEMICOLON after expression`));
                }
                const { currentFunction } = this.context;
                if (!currentFunction || !(currentFunction.valueType instanceof FunctionType)) {
                    UNREACHABLE();
                }

                const functionType = currentFunction.valueType as FunctionType;

                if (semi_pos !== i + 1) {
                    const resultVar = new SemicolonExprParser(this.context, this.tokens.slice(i + 1, semi_pos)).parse_with_ast(false, true);

                    const convertedVar = convert_val_to_type(this.context, resultVar, functionType.returnType);

                    this.context.addInstruction(new MovInstr(get_mov_i_on_size(functionType.returnType.size), Register.forReturnValue(functionType.returnType), valueToMemLoc(convertedVar, this.context)));
                }

                if (semi_pos === i + 1 && !(functionType.returnType instanceof VoidType)) {
                    throwError(new DebugPosError(this.tokens[i]!.pos, `Expected return type of function to be [${functionType.returnType}].\nActual type: ${VoidType.getInstance()}`));
                }

                let poppedScope: Scope | null = this.context.getCurrentScope();
                while (poppedScope && poppedScope.typeofScope !== TypeofScope.FUN_SCOPE) {
                    this.context.addInstruction(new PopScopeInstr(poppedScope));
                    poppedScope = poppedScope.parentScope;
                }
                if (!poppedScope) {
                    throwError(new DebugPosError(this.tokens[i]!.pos, "Unexpected RETURN expression"));
                }
                this.context.addInstruction(new PopScopeInstr(poppedScope));

                this.context.addInstruction(new RetqInstr());
                // if (currentFunction.name === 'main') {
                //     this.context.addInstruction(new StringInstruction("xor %rax, %rax"));
                // }
                // else {
                //     this.context.addInstruction(new StringInstruction("retq"));
                // }

                i = semi_pos;

            }
            else if (this.tokens[i]!.type === TokenType.PREPROCESSOR) {
                continue;
            }
            else {
                let j = this.tokens.slice(i).findIndex((t) => t.type === TokenType.SEMICOLON);
                if (j === -1) {
                    throwError(new TokenParserError(this.tokens[i]!, `Unknown expression type:\n ${this.tokens.slice(i)}`));
                }
                j += i;
                if (i === j) {
                    break;
                }
                new SemicolonExprParser(this.context, this.tokens.slice(i, j)).parse_with_ast(false, true);
                i = j;
            }

        }

        return null;
    }


    parse_IF_expr(startSearchPos: number, hasConditionPart: boolean, mark_if_false: MarkToJump, mark_if_true: MarkToJump): number {

        let o_paren_pos: number;
        let c_paren_pos: number;

        let i = startSearchPos;
        let token = this.tokens[i]!;
        if (hasConditionPart) {
            o_paren_pos = i + 1;
            c_paren_pos = getMatchingBracket(this.tokens, o_paren_pos, TokenType.O_PAREN, TokenType.C_PAREN);

            if (o_paren_pos >= this.tokens.length
                || this.tokens[o_paren_pos]!.type !== TokenType.O_PAREN
                || c_paren_pos === -1) {
                throwError(new TokenParserError(token, `No matching O_PAREN found for IF keyword`));
            }

            const conditionResultVar = new SemicolonExprParser(
                this.context,
                this.tokens.slice(o_paren_pos + 1, c_paren_pos)
            ).parse_with_ast(false, false);

            // res - 1 byte value which either $0 or $1
            this.context.addInstruction(new StringInstruction("\t#IF"));
            this.context.addInstruction(new StringInstruction("xor %edx, %edx"));
            this.context.addInstruction(new MovInstr("movb", Register.getInstance("dh"), valueToMemLoc(conditionResultVar, this.context)));
            this.context.addInstruction(new CmpInstr("cmpb", LiteralMemLocation.staticNull(), Register.getInstance("dh")));
            this.context.addInstruction(new JniInstr("je", mark_if_false));

        }
        else {
            c_paren_pos = i;
        }
        this.context.pushScope(TypeofScope.IF_SCOPE);
        c_paren_pos = i;

        let o_curl_pos = c_paren_pos + 1;
        let c_curl_pos = getMatchingBracket(this.tokens, o_curl_pos, TokenType.O_CURL, TokenType.C_CURL);

        if (this.tokens[o_curl_pos]?.type !== TokenType.O_CURL
            || c_curl_pos === -1) {
            throwError(new TokenParserError(token, `No matching O_CURL found for IF keyword`));
        }

        new CurlExpressionParser(
            this.context,
            this.tokens.slice(o_curl_pos + 1, c_curl_pos),
        ).parse();

        this.context.popScope();

        this.context.addInstruction(new JmpInstr(mark_if_true));
        return c_curl_pos;
    }


    parse_FOR_expr(startSearchPos: number): number {
        let i = startSearchPos;

        if (this.tokens[i + 1]?.type !== TokenType.O_PAREN) {
            throwError(new TokenParserError(this.tokens[i]!, 'Expected bracket after FOR keyword'));
        }
        let o_paren_pos = i + 1;
        let c_paren_pos = getMatchingBracket(this.tokens, o_paren_pos, TokenType.O_PAREN, TokenType.C_PAREN);
        if (c_paren_pos === -1) {
            throwError(new TokenParserError(this.tokens[o_paren_pos]!, 'Unmatched O_PAREN'));
        }
        let splitted = splitBy(this.tokens.slice(o_paren_pos + 1, c_paren_pos), (t) => t.type === TokenType.SEMICOLON);

        const [declarationPart, comparePart, iterPart] = splitted;

        if (!declarationPart || !comparePart || !iterPart) {
            throwError(new TokenParserError(this.tokens[o_paren_pos]!, 'Expected three expressions inside FOR braces'));
        }

        const currentScope = this.context.pushScope(TypeofScope.CYCLE_SCOPE);
        if (splitted[0]!.length > 0) {
            new SemicolonExprParser(this.context, declarationPart).parse_with_ast(false, true);
        }

        if (currentScope.scopeParams.typeofScope !== TypeofScope.CYCLE_SCOPE) {
            UNREACHABLE();
        }

        const { markToEnterCycle, markToExitCycle } = currentScope.scopeParams;
        currentScope.addInstruction(markToEnterCycle);


        if (splitted[1]!.length > 0) {
            const condResultVar = new SemicolonExprParser(
                this.context,
                comparePart,
            ).parse_with_ast(false, true);
            // res - 1 byte value which either $0 or $1
            this.context.addInstruction(new StringInstruction("      #FOR"));
            this.context.addInstruction(new StringInstruction("xor %edx, %edx"));
            this.context.addInstruction(new MovInstr("movb", Register.getInstance("dh"), valueToMemLoc(condResultVar, this.context)));
            this.context.addInstruction(new CmpInstr("cmpb", LiteralMemLocation.staticNull(), Register.getInstance("dh")));
            this.context.addInstruction(new JniInstr("je", markToExitCycle));
        }

        let o_curl_pos = c_paren_pos + 1;
        let c_curl_pos = getMatchingBracket(this.tokens, o_curl_pos, TokenType.O_CURL, TokenType.C_CURL);

        if (this.tokens[o_curl_pos]?.type !== TokenType.O_CURL
            || c_curl_pos === -1) {
            throwError(new TokenParserError(this.tokens[i]!, `No matching O_CURL found for FOR keyword`));
        }

        new CurlExpressionParser(
            this.context,
            this.tokens.slice(o_curl_pos + 1, c_curl_pos),
        ).parse();

        if (iterPart.length > 0) {
            new SemicolonExprParser(this.context, iterPart).parse_with_ast(false, true);
        }

        this.context.addInstruction(new JmpInstr(markToEnterCycle));
        this.context.addInstruction(new JmpInstr(markToExitCycle));
        this.context.addInstruction(markToExitCycle);

        this.context.popScope();

        return c_curl_pos;
    }


    parse_WHILE_expr(startSearchPos: number): number {
        let i = startSearchPos;

        if (this.tokens[i + 1]?.type !== TokenType.O_PAREN) {
            throwError(new TokenParserError(this.tokens[i]!, 'Expected bracket after FOR keyword'));
        }
        let o_paren_pos = i + 1;
        let c_paren_pos = getMatchingBracket(this.tokens, o_paren_pos, TokenType.O_PAREN, TokenType.C_PAREN);
        if (c_paren_pos === -1) {
            throwError(new TokenParserError(this.tokens[o_paren_pos]!, 'Unmatched O_PAREN'));
        }

        const condition_tokens = this.tokens.slice(o_paren_pos + 1, c_paren_pos);
        if (!condition_tokens.length) {
            throwError(new TokenParserError(this.tokens[i]!, 'Expected expression inside WHILE braces'));
        }

        const currentScope = this.context.pushScope(TypeofScope.CYCLE_SCOPE);
        // for ts compiler
        if (currentScope.scopeParams.typeofScope !== TypeofScope.CYCLE_SCOPE) {
            UNREACHABLE();
        }

        const { markToEnterCycle, markToExitCycle } = currentScope.scopeParams;
        this.context.addInstruction(markToEnterCycle);
        const condiditonResVar = new SemicolonExprParser(this.context, condition_tokens).parse_with_ast(false, true);
        // res - 1 byte value which either $0 or $1
        this.context.addInstruction(new StringInstruction("\t#WHILE"));
        this.context.addInstruction(new StringInstruction("xor %edx, %edx"));
        this.context.addInstruction(new MovInstr("movb", Register.getInstance("dh"), valueToMemLoc(condiditonResVar, this.context)));
        this.context.addInstruction(new CmpInstr("cmpb", LiteralMemLocation.staticNull(), Register.getInstance("dh")));
        this.context.addInstruction(new JniInstr("je", markToExitCycle));

        let o_curl_pos = c_paren_pos + 1;
        let c_curl_pos = getMatchingBracket(this.tokens, o_curl_pos, TokenType.O_CURL, TokenType.C_CURL);
        if (this.tokens[o_curl_pos]?.type !== TokenType.O_CURL || c_curl_pos === -1) {
            throwError(new TokenParserError(this.tokens[i]!, `No matching O_CURL found for FOR keyword`));
        }

        new CurlExpressionParser(
            this.context,
            this.tokens.slice(o_curl_pos + 1, c_curl_pos),
        ).parse();

        this.context.addInstruction(new JmpInstr(markToEnterCycle));
        this.context.addInstruction(markToExitCycle);

        this.context.popScope();

        return c_curl_pos;
    }



}

