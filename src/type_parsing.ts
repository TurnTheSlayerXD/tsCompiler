import { AstBracketNode } from "./ast_bracket_node";
import { AstNode } from "./ast_node";
import { Context } from "./context";
import { throwError, TODO, TokenParserError, UNREACHABLE } from "./helper";
import { Token } from "./lexer";
import { TokenType } from "./token_type";
import { ArrayType, FunctionType, PtrType, ValueType } from "./value_types";

export function parse_type_from_tokens(context: Context, root: AstNode): ValueType | { type: ValueType, name: string } {
    root.type === TokenType.DECL_TYPENAME || UNREACHABLE();
    let variable_name: string | undefined;
    const nodes = collect_all_nodes_sorted_backwards(root);
    if (nodes[0]!.type !== TokenType.DECL_TYPENAME) {
        UNREACHABLE();
    }
    let final_type: ValueType = context.hasTypename(nodes[0]!.order.tok.text) ?? UNREACHABLE();
    if (nodes.at(-1)!.type === TokenType.NAME) {
        variable_name = nodes.at(-1)!.order.tok.text;
    }
    let type_modifiers = nodes.slice(1, !!variable_name ? nodes.length - 1 : nodes.length);

    for (let i = 0; i < type_modifiers.length; ++i) {
        const node = type_modifiers[i]!;
        if (node.type === TokenType.O_SQR) {
            const bracket_node = node as AstBracketNode ?? UNREACHABLE();
            let array_size: number | null = null;
            if (bracket_node.middle) {
                if (bracket_node.middle.type !== TokenType.NUM_INT) {
                    throwError(new TokenParserError(bracket_node.order.tok, `Expected constant expression inside Array size qualifier. Found: ${bracket_node.middle.order.tok}`))
                }
                array_size = parseInt(bracket_node.middle.order.tok.text);
                if (!Number.isFinite(array_size)) {
                    throwError(new TokenParserError(bracket_node.middle.order.tok, `Expected Integer expression`));
                }
            }
            final_type = ArrayType.getInstance(final_type, array_size);
        }
        if (node.type === TokenType.O_PAREN) {
            const bracket_node = node as AstBracketNode ?? UNREACHABLE();
            if (bracket_node.middle) {
                if (bracket_node.middle.type === TokenType.OP_DEREFERENCE) {
                    if (i + 1 >= type_modifiers.length || type_modifiers[i + 1]!.type !== TokenType.O_PAREN) {
                        throwError(new TokenParserError(bracket_node.order.tok, `Expected O_PAREN IN PTR TO FUNCTION TYPE DECLARATION`));
                    }
                    const fun_param_types: ValueType[] = [];

                    final_type = PtrType.getInstance(FunctionType.getInstance(final_type, fun_param_types));
                    TODO('PARSE FUNCTION\'s ARGS TYPES');

                }
                else {
                    throwError(new TokenParserError(bracket_node.order.tok, `EXPECTED EXPR INSIDE BRACES`))
                }
            }
        }
        if (node.type === TokenType.OP_DEREFERENCE) {
            final_type = PtrType.getInstance(final_type);
        }
    }

    return final_type;
}

export function parse_declaration_from_tokens(context: Context, root: AstNode): { type: ValueType, name: string } {
    const res = parse_declaration_from_tokens(context, root);
    if (!!res.name) {
        return res;
    }
    throwError(new TokenParserError(root.order.tok, `Expected Name after type declaration`));
}

function collect_all_nodes_sorted_backwards(root: AstNode): AstNode[] {
    const nodes: AstNode[] = [];
    const recurs = (node: AstNode | null) => {
        if (node === null) {
            return;
        }
        nodes.push(node);
        recurs(node.left);
        recurs(node.right);
    };
    nodes.sort((lhs, rhs) => lhs.order.pos < rhs.order.pos ? -1 : lhs.order.pos === rhs.order.pos ? 0 : 1);
    return nodes;
}
