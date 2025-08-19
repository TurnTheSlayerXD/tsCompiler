import { AstNode, OperToken, OrderedToken } from "./ast_node";
import { Context } from "./context";
import { get_rax_i, get_rdx_i } from "./converter";
import { Category, get_token_category, prettyHtml, replace_ambigous_token_types, RulesError, throwError, TODO, TokenParserError, UNREACHABLE } from "./helper";
import { Token } from "./lexer";
import { C_BRACES, DECL_TOKENS, O_BRACES, OP_TOKENS, TokenType } from "./token_type";
import { parse_declaration_from_tokens } from "./type_parsing";
import { ValueType } from "./value_types";


export class AstBuilder {
    constructor(private tokens: Token[], private context: Context) {
        const res = this.is_paren_correct();
        if (!res.ok) {
            throwError(res.err);
        }
        replace_ambigous_token_types(context, tokens);
    }

    is_paren_correct(): { ok: boolean, err: Error | null } {
        const arr: Token[] = [];

        for (let i = 0; i < this.tokens.length; ++i) {
            const tok = this.tokens[i]!;
            if (O_BRACES.includes(tok.type)) {
                arr.push(tok);
            }
            else if (C_BRACES.includes(tok.type)) {
                let popped = arr.pop() ?? throwError(new TokenParserError(tok, `Unmatched bracket (`));
                if (tok.type === TokenType.C_PAREN && popped.type !== TokenType.O_PAREN) {
                    return { ok: false, err: new TokenParserError(tok, `Unmatched bracket )`) };
                }
                if (tok.type === TokenType.C_CURL && popped.type !== TokenType.O_CURL) {
                    return { ok: false, err: new TokenParserError(tok, `Unmatched bracket }`) };
                }
                if (tok.type === TokenType.C_SQR && popped.type !== TokenType.O_SQR) {
                    return { ok: false, err: new TokenParserError(tok, `Unmatched bracket ]`) }
                }
            }
        }
        if (arr.length !== 0) {
            return { ok: false, err: new TokenParserError(arr.pop()!, `Unmatched bracket ${TokenType[arr.at(-1)!.type]}`) };
        }
        return { ok: true, err: null };
    }


    map_to_ordered(): OrderedToken[] {
        let cur_depth = 0;
        const res: OrderedToken[] = [];
        for (let i = 0; i < this.tokens.length; ++i) {
            const tok = this.tokens[i]!;
            if (O_BRACES.includes(tok.type)) {
                res.push({ tok, pos: i, depth: cur_depth, });
                cur_depth += 1;
            }
            else if (C_BRACES.includes(tok.type)) {
                cur_depth -= 1;
            }
            else {
                res.push({ tok, pos: i, depth: cur_depth, });
            }
        }
        return res;
    }

    build(): AstNode {
        const ordered = this.map_to_ordered();
        const ordered_tokens: OperToken[] = ordered.map(t => {
            const categ = get_token_category(t.tok.type) ?? throwError(new TokenParserError(t.tok, `AST SORTING NOT IMPL: ${t.tok}`));
            return { depth: t.depth, pos: t.pos, imp: categ.imp, exec_order: categ.exec_order, tok: t.tok };
        });
        ordered_tokens.sort((lhs: OperToken, rhs: OperToken) => {
            if (lhs.depth === rhs.depth) {

                if (lhs.imp === rhs.imp) {

                    lhs.pos !== rhs.pos || throwError(new Error(`TOKENS HAVE SAME POS: ${lhs}, ${rhs}`));
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
            UNREACHABLE();
        }
        const root: AstNode = new AstNode(ordered_tokens[0]!, null, null, this.context);
        for (const tok of ordered_tokens.slice(1)) {
            root.insert_node(new AstNode(tok, null, null, this.context));
        }
        prettyHtml(root);
        return root;
    }

}


function gather_nodes_in_order(root: AstNode): AstNode[] {
    const nodes: AstNode[] = [];
    const in_order = (v: AstNode | null) => {
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

export function handle_declaration_case(root: AstNode): { type: ValueType, name: string } | null {
    let left: AstNode | null = root;
    if (!!left && DECL_TOKENS.includes(root.type)) {
        return null;
    }
    const toks: Token[] = [];
    while (!!left && [TokenType.NAME, TokenType.DECL_PTR, TokenType.DECL_REF].includes(left.order.tok.type)) {
        toks.push(left.order.tok);
        left = left.left;
    }
    if (toks.length === 1) {
        return null;
    }
    toks.reverse();
    return parse_declaration_from_tokens(root.context, toks);
}
