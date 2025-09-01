"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurlExpressionParser = void 0;
const converter_1 = require("./converter");
const helper_1 = require("./helper");
const rvalue_expression_parser_1 = require("./rvalue_expression_parser");
const scope_1 = require("./scope");
const token_type_1 = require("./token_type");
const value_type_1 = require("./value_types/value_type");
class CurlExpressionParser {
    context;
    tokens;
    parent_cycle_begin_mark;
    parent_cycle_end_mark;
    constructor(context, tokens, parent_cycle_begin_mark, parent_cycle_end_mark) {
        this.context = context;
        this.tokens = tokens;
        this.parent_cycle_begin_mark = parent_cycle_begin_mark;
        this.parent_cycle_end_mark = parent_cycle_end_mark;
    }
    parse() {
        const { context, tokens } = this;
        // console.log('CurlExpressionParser\n', `${tokens}`);
        const parse_IF_expr = (i, with_condition, mark_if_false, mark_if_true) => {
            let o_paren_pos;
            let c_paren_pos = i;
            let token = tokens[i];
            if (with_condition) {
                o_paren_pos = i + 1;
                if (o_paren_pos >= tokens.length
                    || tokens[o_paren_pos].type !== token_type_1.TokenType.O_PAREN
                    || (c_paren_pos = (0, helper_1.getMatchingBracket)(tokens, o_paren_pos, token_type_1.TokenType.O_PAREN, token_type_1.TokenType.C_PAREN)) === -1) {
                    (0, helper_1.throwError)(new helper_1.TokenParserError(token, `No matching O_PAREN found for IF keyword`));
                }
                const res = new rvalue_expression_parser_1.SemicolonExprParser(context, tokens.slice(o_paren_pos + 1, c_paren_pos)).parse_with_ast(false, false);
                // res - 1 byte value which either $0 or $1
                context.addAssembly(`
                        \r #IF
                        \rxor %edx, %edx
                        \rmovb ${res.stack_addr(context)}(%rsp), %dh
                        \rcmpb $0, %dh
                        \rje ${mark_if_false}
                `);
            }
            context.pushScope(scope_1.TypeofScope.IF_SCOPE);
            let o_curl_pos = c_paren_pos + 1, c_curl_pos;
            if (o_curl_pos >= tokens.length
                || tokens[o_curl_pos].type !== token_type_1.TokenType.O_CURL
                || (c_curl_pos = (0, helper_1.getMatchingBracket)(tokens, o_curl_pos, token_type_1.TokenType.O_CURL, token_type_1.TokenType.C_CURL)) === -1) {
                (0, helper_1.throwError)(new helper_1.TokenParserError(token, `No matching O_CURL found for IF keyword`));
            }
            new CurlExpressionParser(context, tokens.slice(o_curl_pos + 1, c_curl_pos), this.parent_cycle_begin_mark, this.parent_cycle_end_mark).parse();
            context.popScope();
            context.addAssembly(`
                \rjmp ${mark_if_true}
                `);
            return c_curl_pos;
        };
        const parse_FOR_expr = (i) => {
            if (i + 1 >= tokens.length || tokens[i + 1].type !== token_type_1.TokenType.O_PAREN) {
                (0, helper_1.throwError)(new helper_1.TokenParserError(tokens[i], 'Expected bracket after FOR keyword'));
            }
            let o_paren_pos = i + 1;
            let c_paren_pos = (0, helper_1.getMatchingBracket)(tokens, o_paren_pos, token_type_1.TokenType.O_PAREN, token_type_1.TokenType.C_PAREN);
            if (c_paren_pos === -1) {
                (0, helper_1.throwError)(new helper_1.TokenParserError(tokens[o_paren_pos], 'Unmatched O_PAREN'));
            }
            let splitted = (0, helper_1.splitBy)(tokens.slice(o_paren_pos + 1, c_paren_pos), (t) => t.type === token_type_1.TokenType.SEMICOLON);
            if (splitted.length !== 3) {
                (0, helper_1.throwError)(new helper_1.TokenParserError(tokens[o_paren_pos], 'Expected three expressions inside FOR braces'));
            }
            context.pushScope(scope_1.TypeofScope.CYCLE_SCOPE);
            if (splitted[0].length > 0) {
                new rvalue_expression_parser_1.SemicolonExprParser(context, splitted[0]).parse_with_ast(false, true);
            }
            const cycle_begin_mark = context.gen_mark();
            const cycle_end_mark = context.gen_mark();
            context.addAssembly(`
                    \r  ${cycle_begin_mark}:
                `);
            if (splitted[1].length > 0) {
                const cond_res = new rvalue_expression_parser_1.SemicolonExprParser(context, splitted[1]).parse_with_ast(false, true);
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
                || tokens[o_curl_pos].type !== token_type_1.TokenType.O_CURL
                || (c_curl_pos = (0, helper_1.getMatchingBracket)(tokens, o_curl_pos, token_type_1.TokenType.O_CURL, token_type_1.TokenType.C_CURL)) === -1) {
                (0, helper_1.throwError)(new helper_1.TokenParserError(tokens[i], `No matching O_CURL found for FOR keyword`));
            }
            new CurlExpressionParser(context, tokens.slice(o_curl_pos + 1, c_curl_pos), cycle_begin_mark, cycle_end_mark).parse();
            if (splitted[2].length > 0) {
                new rvalue_expression_parser_1.SemicolonExprParser(context, splitted[2]).parse_with_ast(false, true);
            }
            context.addAssembly(`
                \rjmp ${cycle_begin_mark}
                `);
            context.addAssembly(`
                    \r${cycle_end_mark}:
                `);
            context.popScope();
            return c_curl_pos;
        };
        const parse_WHILE_expr = (i) => {
            if (i + 1 >= tokens.length || tokens[i + 1].type !== token_type_1.TokenType.O_PAREN) {
                (0, helper_1.throwError)(new helper_1.TokenParserError(tokens[i], 'Expected bracket after FOR keyword'));
            }
            let o_paren_pos = i + 1;
            let c_paren_pos = (0, helper_1.getMatchingBracket)(tokens, o_paren_pos, token_type_1.TokenType.O_PAREN, token_type_1.TokenType.C_PAREN);
            if (c_paren_pos === -1) {
                (0, helper_1.throwError)(new helper_1.TokenParserError(tokens[o_paren_pos], 'Unmatched O_PAREN'));
            }
            const condition_tokens = tokens.slice(o_paren_pos + 1, c_paren_pos);
            context.pushScope(scope_1.TypeofScope.CYCLE_SCOPE);
            if (!condition_tokens.length) {
                (0, helper_1.throwError)(new helper_1.TokenParserError(tokens[i], 'Expected expression inside WHILE braces'));
            }
            const cycle_begin_mark = context.gen_mark();
            const cycle_end_mark = context.gen_mark();
            context.addAssembly(`
                    \r${cycle_begin_mark}:
                `);
            const cond_res = new rvalue_expression_parser_1.SemicolonExprParser(context, condition_tokens).parse_with_ast(false, true);
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
                || tokens[o_curl_pos].type !== token_type_1.TokenType.O_CURL
                || (c_curl_pos = (0, helper_1.getMatchingBracket)(tokens, o_curl_pos, token_type_1.TokenType.O_CURL, token_type_1.TokenType.C_CURL)) === -1) {
                (0, helper_1.throwError)(new helper_1.TokenParserError(tokens[i], `No matching O_CURL found for FOR keyword`));
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
        };
        for (let i = 0; i < tokens.length; ++i) {
            let token = tokens[i];
            if (token.type === token_type_1.TokenType.KWD_IF) {
                let mark_if_false = context.gen_mark();
                let mark_if_true = context.gen_mark();
                i = parse_IF_expr(i, true, mark_if_false, mark_if_true);
                while (++i < tokens.length) {
                    if (tokens[i].type === token_type_1.TokenType.KWD_ELSE && tokens[i + 1].type === token_type_1.TokenType.KWD_IF) {
                        context.addAssembly(`
                            \r${mark_if_false}:
                            `);
                        mark_if_false = context.gen_mark();
                        i = parse_IF_expr(i + 1, true, mark_if_false, mark_if_true);
                    }
                    else if (tokens[i].type === token_type_1.TokenType.KWD_ELSE) {
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
            else if (tokens[i].type === token_type_1.TokenType.KWD_ELSE) {
                (0, helper_1.throwError)(new helper_1.TokenParserError(tokens[i], 'KWD ELSE must be preceeded with IF expression'));
            }
            else if (tokens[i].type === token_type_1.TokenType.KWD_FOR) {
                i = parse_FOR_expr(i);
            }
            else if (tokens[i].type === token_type_1.TokenType.KWD_WHILE) {
                i = parse_WHILE_expr(i);
            }
            else if (tokens[i].type === token_type_1.TokenType.KWD_BREAK) {
                const gen = context.asm_pop_scope();
                while (true) {
                    if ((gen.next().value ?? (0, helper_1.UNREACHABLE)()).typeofScope === scope_1.TypeofScope.CYCLE_SCOPE) {
                        gen.next();
                        break;
                    }
                }
                context.addAssembly(`
                        \rjmp ${this.parent_cycle_end_mark ?? (0, helper_1.throwError)(new helper_1.TokenParserError(tokens[i], 'KWD BREAK can be used only inside CYCLE'))}
                    `);
            }
            else if (tokens[i].type === token_type_1.TokenType.KWD_CONTINUE) {
                const gen = context.asm_pop_scope();
                while (true) {
                    if ((gen.next().value ?? (0, helper_1.UNREACHABLE)()).typeofScope === scope_1.TypeofScope.CYCLE_SCOPE) {
                        break;
                    }
                }
                context.addAssembly(`
                        \rjmp ${this.parent_cycle_begin_mark ?? (0, helper_1.throwError)(new helper_1.TokenParserError(tokens[i], 'KWD CONTINUE can be used only inside CYCLE'))}
                    `);
            }
            else if (tokens[i].type === token_type_1.TokenType.KWD_RETURN) {
                let semi_pos = (0, helper_1.findIndex)(tokens, t => t.type === token_type_1.TokenType.SEMICOLON, i);
                if (semi_pos === -1) {
                    (0, helper_1.throwError)(new helper_1.TokenParserError(tokens[i], `Expected SEMICOLON after expression`));
                }
                if (semi_pos === i + 1) {
                    return null;
                }
                let res = new rvalue_expression_parser_1.SemicolonExprParser(context, tokens.slice(i + 1, semi_pos)).parse_with_ast(false, true);
                const { cur_function } = context;
                const fun_type = cur_function?.valueType ?? (0, helper_1.UNREACHABLE)();
                res = (0, converter_1.convert_val_to_type)(context, res, fun_type.returnType);
                const [reg, mov] = (0, converter_1.get_rax_i)(res.valueType.size);
                context.addAssembly(`
                        \r${value_type_1.MOV_I[mov]} ${res.stack_addr(context)}(%rsp), %${value_type_1.REG_I[reg]} 
                    `);
                context.clearAllStacks();
                if (!cur_function) {
                    (0, helper_1.throwError)(new helper_1.TokenParserError(tokens[i], 'Unexpected KWD_RETURN as not in function'));
                }
                if (cur_function.name === 'main') {
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
                i = semi_pos;
            }
            else if (tokens[i].type === token_type_1.TokenType.PREPROCESSOR) {
                continue;
            }
            else {
                let j = tokens.slice(i).findIndex((t) => t.type === token_type_1.TokenType.SEMICOLON);
                if (j === -1) {
                    (0, helper_1.throwError)(new helper_1.TokenParserError(tokens[i], `Unknown expression type:\n ${tokens.slice(i)}`));
                }
                j += i;
                if (i === j) {
                    break;
                }
                new rvalue_expression_parser_1.SemicolonExprParser(context, tokens.slice(i, j)).parse_with_ast(false, true);
                i = j;
            }
        }
        return null;
    }
}
exports.CurlExpressionParser = CurlExpressionParser;
