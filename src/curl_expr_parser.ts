import { Context } from "./context";
import { convert_val_to_type, get_rax_i } from "./converter";
import { findIndex, getMatchingBracket, splitBy, throwError, TODO, TokenParserError, UNREACHABLE } from "./helper";
import { Token } from "./lexer";
import { SemicolonExprParser } from "./rvalue_expression_parser";
import { TokenType } from "./token_type";
import { FunctionType, MOV_I, REG_I, Value } from "./value_types";

export class CurlExpressionParser {

    constructor(public context: Context, public tokens: Token[], public parent_cycle_begin_mark: string | null, public parent_cycle_end_mark: string | null) {
    }


    parse(): Value | null {
        const { context, tokens } = this;
        // console.log('CurlExpressionParser\n', `${tokens}`);
        const parse_IF_expr = (i: number, with_condition: boolean, mark_if_false: string, mark_if_true: string): number => {
            let o_paren_pos;
            let c_paren_pos = i;
            let token = tokens[i]!;
            if (with_condition) {
                o_paren_pos = i + 1;
                if (o_paren_pos >= tokens.length
                    || tokens[o_paren_pos]!.type !== TokenType.O_PAREN
                    || (c_paren_pos = getMatchingBracket(tokens, o_paren_pos, TokenType.O_PAREN, TokenType.C_PAREN)) === -1) {
                    throwError(new TokenParserError(token, `No matching O_PAREN found for IF keyword`));
                }
                const res = new SemicolonExprParser(context, tokens.slice(o_paren_pos + 1, c_paren_pos)).parse_with_ast(false, false);
                // res - 1 byte value which either $0 or $1
                context.addAssembly(`
                        \r #IF
                        \rxor %edx, %edx
                        \rmovb ${res.stack_addr(context)}(%rsp), %dh
                        \rcmpb $0, %dh
                        \rje ${mark_if_false}
                `);
            }
            context.pushScope();
            let o_curl_pos = c_paren_pos + 1, c_curl_pos;
            if (o_curl_pos >= tokens.length
                || tokens[o_curl_pos]!.type !== TokenType.O_CURL
                || (c_curl_pos = getMatchingBracket(tokens, o_curl_pos, TokenType.O_CURL, TokenType.C_CURL)) === -1) {
                throwError(new TokenParserError(token, `No matching O_CURL found for IF keyword`));
            }
            new CurlExpressionParser(context,
                tokens.slice(o_curl_pos + 1, c_curl_pos), this.parent_cycle_begin_mark, this.parent_cycle_end_mark).parse();
            context.popScope();
            context.addAssembly(`
                \rjmp ${mark_if_true}
                `);
            return c_curl_pos;
        };

        const parse_FOR_expr = (i: number): number => {

            if (i + 1 >= tokens.length || tokens[i + 1]!.type !== TokenType.O_PAREN) {
                throwError(new TokenParserError(tokens[i]!, 'Expected bracket after FOR keyword'));
            }
            let o_paren_pos = i + 1;
            let c_paren_pos = getMatchingBracket(tokens, o_paren_pos, TokenType.O_PAREN, TokenType.C_PAREN);
            if (c_paren_pos === -1) {
                throwError(new TokenParserError(tokens[o_paren_pos]!, 'Unmatched O_PAREN'));
            }
            let splitted = splitBy(tokens.slice(o_paren_pos + 1, c_paren_pos), (t) => t.type === TokenType.SEMICOLON);
            if (splitted.length !== 3) {
                throwError(new TokenParserError(tokens[o_paren_pos]!, 'Expected three expressions inside FOR braces'));
            }


            context.pushScope();
            if (splitted[0]!.length > 0) {
                new SemicolonExprParser(context, splitted[0]!).parse_with_ast(false, true);
            }

            const cycle_begin_mark = context.gen_mark();
            const cycle_end_mark = context.gen_mark();

            context.addAssembly(`
                    \r  ${cycle_begin_mark}:
                `);
            if (splitted[1]!.length > 0) {
                const cond_res = new SemicolonExprParser(context, splitted[1]!).parse_with_ast(false, true);
                // res - 1 byte value which either $0 or $1
                context.addAssembly(`
                        \r      #FOR
                        \rxor %edx, %edx
                        \rmovb ${cond_res.stack_addr(context)}(%rsp), %dh
                        \rcmpb $0, %dh
                        \rje ${cycle_end_mark}
                `);
            }

            let o_curl_pos = c_paren_pos + 1, c_curl_pos;
            if (o_curl_pos >= tokens.length
                || tokens[o_curl_pos]!.type !== TokenType.O_CURL
                || (c_curl_pos = getMatchingBracket(tokens, o_curl_pos, TokenType.O_CURL, TokenType.C_CURL)) === -1) {
                throwError(new TokenParserError(tokens[i]!, `No matching O_CURL found for FOR keyword`));
            }
            new CurlExpressionParser(context, tokens.slice(o_curl_pos + 1, c_curl_pos), cycle_begin_mark, cycle_end_mark).parse();

            if (splitted[2]!.length > 0) {
                new SemicolonExprParser(context, splitted[2]!).parse_with_ast(false, true);
            }
            context.addAssembly(`
                \rjmp ${cycle_begin_mark}
                `);
            context.addAssembly(`
                    \r${cycle_end_mark}:
                `);
            context.popScope();
            return c_curl_pos;
        }
        const parse_WHILE_expr = (i: number): number => {

            if (i + 1 >= tokens.length || tokens[i + 1]!.type !== TokenType.O_PAREN) {
                throwError(new TokenParserError(tokens[i]!, 'Expected bracket after FOR keyword'));
            }
            let o_paren_pos = i + 1;
            let c_paren_pos = getMatchingBracket(tokens, o_paren_pos, TokenType.O_PAREN, TokenType.C_PAREN);
            if (c_paren_pos === -1) {
                throwError(new TokenParserError(tokens[o_paren_pos]!, 'Unmatched O_PAREN'));
            }

            const condition_tokens = tokens.slice(o_paren_pos + 1, c_paren_pos);
            context.pushScope();

            if (!condition_tokens.length) {
                throwError(new TokenParserError(tokens[i]!, 'Expected expression inside WHILE braces'));
            }
            const cycle_begin_mark = context.gen_mark();
            const cycle_end_mark = context.gen_mark();
            context.addAssembly(`
                    \r${cycle_begin_mark}:
                `);
            const cond_res = new SemicolonExprParser(context, condition_tokens).parse_with_ast(false, true);
            // res - 1 byte value which either $0 or $1
            context.addAssembly(`
                    \r #WHILE
                    \rxor %edx, %edx
                    \rmovb ${cond_res.stack_addr(context)}(%rsp), %dh
                    \rcmpb $0, %dh
                    \rje ${cycle_end_mark}
                `);

            let o_curl_pos = c_paren_pos + 1, c_curl_pos;
            if (o_curl_pos >= tokens.length
                || tokens[o_curl_pos]!.type !== TokenType.O_CURL
                || (c_curl_pos = getMatchingBracket(tokens, o_curl_pos, TokenType.O_CURL, TokenType.C_CURL)) === -1) {
                throwError(new TokenParserError(tokens[i]!, `No matching O_CURL found for FOR keyword`));
            }
            new CurlExpressionParser(context, tokens.slice(o_curl_pos + 1, c_curl_pos), cycle_begin_mark, cycle_end_mark).parse();
            context.addAssembly(`
                \rjmp ${cycle_begin_mark}
                `);
            context.addAssembly(`
                    \r${cycle_end_mark}:
                `);
            context.popScope();
            return c_curl_pos;
        }


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
                        break;
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
            else if (tokens[i]!.type === TokenType.KWD_ELSE) {
                throwError(new TokenParserError(tokens[i]!, 'KWD ELSE must be preceeded with IF expression'));
            }
            else if (tokens[i]!.type === TokenType.KWD_FOR) {
                i = parse_FOR_expr(i);
            }
            else if (tokens[i]!.type === TokenType.KWD_WHILE) {
                i = parse_WHILE_expr(i);
            }
            else if (tokens[i]!.type === TokenType.KWD_BREAK) {
                context.addAssembly(`
                        \rjmp ${this.parent_cycle_end_mark ?? throwError(new TokenParserError(tokens[i]!, 'KWD BREAK can be used only inside CYCLE'))}
                    `);
            }
            else if (tokens[i]!.type === TokenType.KWD_CONTINUE) {
                context.addAssembly(`
                        \rjmp ${this.parent_cycle_begin_mark ?? throwError(new TokenParserError(tokens[i]!, 'KWD CONTINUE can be used only inside CYCLE'))}
                    `);
            }
            else if (tokens[i]!.type === TokenType.KWD_RETURN) {
                let semi_pos = findIndex(tokens, t => t.type === TokenType.SEMICOLON, i);
                if (semi_pos === -1) {
                    throwError(new TokenParserError(tokens[i]!, `Expected SEMICOLON after expression`));
                }
                if (semi_pos === i + 1) {
                    return null;
                }
                let res = new SemicolonExprParser(context, tokens.slice(i + 1, semi_pos)).parse_with_ast(false, true);
                const { cur_function } = context;
                const fun_type = cur_function?.valueType as FunctionType ?? UNREACHABLE();
                res = convert_val_to_type(context, res, fun_type.returnType);
                const [reg, mov] = get_rax_i(res.valueType.size);
                context.addAssembly(`
                        \r${MOV_I[mov]} ${res.stack_addr(context)}(%rsp), %${REG_I[reg]} 
                    `);
                context.clearAllStacks();
                if (!cur_function) {
                    throwError(new TokenParserError(tokens[i]!, 'Unexpected KWD_RETURN as not in function'));
                }

                if (cur_function.name === 'main') {
                    context.addAssembly(`
                        \rxor %rax, %rax
                        \rretq
                    `);
                } else {
                    context.addAssembly(`
                        \rretq
                    `);
                }
                i = semi_pos;
            }
            else if (tokens[i]!.type === TokenType.PREPROCESSOR) {
                continue;
            }
            else {
                let j = tokens.slice(i).findIndex((t) => t.type === TokenType.SEMICOLON);
                if (j === -1) {
                    throwError(new TokenParserError(tokens[i]!, `Unknown expression type:\n ${tokens.slice(i)}`));
                }
                j += i;
                if (i === j) {
                    break;
                }
                new SemicolonExprParser(context, tokens.slice(i, j)).parse_with_ast(false, true);
                i = j;
            }

        }
        return null;
    }

}

