"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AstBuilder = void 0;
const ambigous_tokens_1 = require("./ambigous_tokens");
const ast_bracket_node_1 = require("./ast_bracket_node");
const ast_node_1 = require("./ast_node");
const helper_1 = require("./helper");
const token_category_1 = require("./token_category");
const token_type_1 = require("./token_type");
class AstBuilder {
    tokens;
    context;
    constructor(tokens, context) {
        this.tokens = tokens;
        this.context = context;
        const res = this.is_paren_correct();
        if (!res.ok) {
            (0, helper_1.throwError)(res.err);
        }
        (0, ambigous_tokens_1.replace_ambigous_token_types)(context, tokens);
    }
    is_paren_correct() {
        const arr = [];
        for (let i = 0; i < this.tokens.length; ++i) {
            const tok = this.tokens[i];
            if (token_type_1.O_BRACES.includes(tok.type)) {
                arr.push(tok);
            }
            else if (token_type_1.C_BRACES.includes(tok.type)) {
                let popped = arr.pop() ?? (0, helper_1.throwError)(new helper_1.TokenParserError(tok, `Unmatched bracket (`));
                if (tok.type === token_type_1.TokenType.C_PAREN && popped.type !== token_type_1.TokenType.O_PAREN) {
                    return { ok: false, err: new helper_1.TokenParserError(tok, `Unmatched bracket )`) };
                }
                if (tok.type === token_type_1.TokenType.C_CURL && popped.type !== token_type_1.TokenType.O_CURL) {
                    return { ok: false, err: new helper_1.TokenParserError(tok, `Unmatched bracket }`) };
                }
                if (tok.type === token_type_1.TokenType.C_SQR && popped.type !== token_type_1.TokenType.O_SQR) {
                    return { ok: false, err: new helper_1.TokenParserError(tok, `Unmatched bracket ]`) };
                }
            }
        }
        if (arr.length !== 0) {
            return { ok: false, err: new helper_1.TokenParserError(arr.pop(), `Unmatched bracket ${token_type_1.TokenType[arr.at(-1).type]}`) };
        }
        return { ok: true, err: null };
    }
    map_to_ordered() {
        let cur_depth = 0;
        const res = [];
        const bracket_stack = [];
        for (let i = 0; i < this.tokens.length; ++i) {
            const tok = this.tokens[i];
            if (token_type_1.O_BRACES.includes(tok.type)) {
                bracket_stack.push(res.length);
                res.push({ tok, pos: i, depth: cur_depth, is_bracket: true });
                cur_depth += 1;
            }
            else if (token_type_1.C_BRACES.includes(tok.type)) {
                res[bracket_stack.pop() ?? (0, helper_1.UNREACHABLE)()].matching_br_pos = i;
                cur_depth -= 1;
            }
            else {
                res.push({ tok, pos: i, depth: cur_depth, });
            }
        }
        return res;
    }
    build() {
        const ordered = this.map_to_ordered();
        const ordered_tokens = ordered.map(t => {
            const categ = (0, token_category_1.get_token_category)(t.tok.type) ?? (0, helper_1.throwError)(new helper_1.TokenParserError(t.tok, `AST SORTING NOT IMPL: ${t.tok}`));
            return {
                depth: t.depth, pos: t.pos, imp: categ.imp, exec_order: categ.exec_order, tok: t.tok,
                is_bracket: t.is_bracket, matching_br_pos: t.matching_br_pos
            };
        });
        ordered_tokens.sort((lhs, rhs) => {
            if (lhs.depth === rhs.depth) {
                if (lhs.imp === rhs.imp) {
                    lhs.pos !== rhs.pos || (0, helper_1.throwError)(new Error(`TOKENS HAVE SAME POS: ${lhs}, ${rhs}`));
                    if (lhs.exec_order === 'left') {
                        return lhs.pos - rhs.pos;
                    }
                    return rhs.pos - lhs.pos;
                }
                return lhs.imp - rhs.imp;
            }
            return lhs.depth - rhs.depth;
        });
        if (ordered_tokens.length === 0) {
            (0, helper_1.UNREACHABLE)();
        }
        const first_tok = ordered_tokens[0] ?? (0, helper_1.UNREACHABLE)();
        const root = first_tok.is_bracket ? new ast_bracket_node_1.AstBracketNode(first_tok, { l_b: first_tok.pos, r_b: first_tok.matching_br_pos ?? (0, helper_1.UNREACHABLE)() }, null, null, null, this.context)
            : new ast_node_1.AstNode(first_tok, null, null, this.context);
        for (const tok of ordered_tokens.slice(1)) {
            root.insert_node(tok.is_bracket ? new ast_bracket_node_1.AstBracketNode(tok, { l_b: tok.pos, r_b: tok.matching_br_pos ?? (0, helper_1.UNREACHABLE)() }, null, null, null, this.context)
                : new ast_node_1.AstNode(tok, null, null, this.context));
        }
        (0, helper_1.prettyHtml)(root);
        return root;
    }
}
exports.AstBuilder = AstBuilder;
function gather_nodes_in_order(root) {
    const nodes = [];
    const in_order = (v) => {
        if (v === null) {
            return;
        }
        in_order(v.left);
        nodes.push(v);
        in_order(v.right);
    };
    in_order(root);
    return nodes;
}
