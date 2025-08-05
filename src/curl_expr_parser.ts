import { Context } from "./context";
import { getMatchingBracket, splitBy, throwError, TODO, TokenParserError } from "./helper";
import { Token } from "./lexer";
import { SemicolonExprParser } from "./rvalue_expression_parser";
import { TokenType } from "./token_type";
import { Value } from "./value_types";

export class CurlExpressionParser {

    constructor(public context: Context, public tokens: Token[], public cycle_begin_mark: string | null, public cycle_end_mark: string | null) {
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
                        \rmovb ${res.stack_addr(context)}(%rsp), %dh
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
            new CurlExpressionParser(context, tokens.slice(o_curl_pos + 1, c_curl_pos), this.cycle_begin_mark, this.cycle_end_mark).parse();
            context.addAssembly(`
                \rjmp ${mark_if_true}
                `);
            context.popScope();

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
                new SemicolonExprParser(context, splitted[0]!).parse(false);
            }

            context.get
            if (splitted[1]!.length > 0) {


                const cond_part = new SemicolonExprParser(context, splitted[1]!).parse(false);


            }
            context.popScope();
            const iter_part = new SemicolonExprParser(context, splitted[2]!).parse(false);
        }
        const parse_WHILE_expr = (i: number): number => {
            TODO();
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
            else if (tokens[i]!.type === TokenType.KWD_FOR) {
                i = parse_FOR_expr(i);
            }
            else if (tokens[i]!.type === TokenType.KWD_WHILE) {
                i = parse_WHILE_expr(i);
            }
            else if (tokens[i]!.type === TokenType.KWD_BREAK) {
                TODO();
            }
            else if (tokens[i]!.type === TokenType.KWD_CONTINUE) {
                TODO();
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

