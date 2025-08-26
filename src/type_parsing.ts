import { AstBracketNode } from "./ast_bracket_node";
import { AstNode } from "./ast_node";
import { Context } from "./context";
import { throwError, TODO, TokenParserError, UNREACHABLE } from "./helper";
import { Token } from "./lexer";
import { TokenType } from "./token_type";
import { ArrayType, FunctionType, PtrType, ValueType } from "./value_types";

type ONLY_TYPE = { has_name: false, type: ValueType };
type WITH_NAME = { has_name: true, type: ValueType, name: string };

type PARSE_TYPE_RES = ONLY_TYPE | WITH_NAME;

export function parse_type_from_tokens(context: Context, root: AstNode): PARSE_TYPE_RES {
    root.type === TokenType.DECL_TYPENAME || UNREACHABLE();
    let variable_name: string | undefined;
    const nodes = collect_all_nodes_sorted_backwards(root);
    if (nodes.length === 0) {
        UNREACHABLE();
    }
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
            final_type = ArrayType.getArrayInstance(final_type, array_size);
        }
        else if (node.type === TokenType.O_PAREN) {
            const bracket_node = node as AstBracketNode ?? UNREACHABLE();
            if (bracket_node.middle) {
                if (bracket_node.middle.type === TokenType.OP_DEREFERENCE) {
                    if (i + 1 >= type_modifiers.length || type_modifiers[i + 1]!.type !== TokenType.O_PAREN) {
                        throwError(new TokenParserError(bracket_node.order.tok, `Expected O_PAREN IN PTR TO FUNCTION TYPE DECLARATION`));
                    }
                    const fun_param_types: ValueType[] = [];
                    let comma_node = (type_modifiers[i + 1]! as AstBracketNode ?? UNREACHABLE()).middle;
                    while (comma_node && comma_node.type === TokenType.COMMA) {
                        const param_type = parse_type_from_tokens(context, comma_node.left ?? throwError(new TokenParserError(comma_node.order.tok, `Expected type`)));
                        fun_param_types.push(param_type.has_name ? throwError() : param_type.type);
                        comma_node = comma_node.right;
                    }
                    if (comma_node) {
                        const param_type = parse_type_from_tokens(context, comma_node.left ?? throwError(new TokenParserError(comma_node.order.tok, `Expected type`)));
                        fun_param_types.push(param_type.has_name ? throwError() : param_type.type);
                    }
                    final_type = PtrType.getInstance(FunctionType.getInstance(final_type, fun_param_types));
                }
                else {
                    throwError(new TokenParserError(bracket_node.order.tok, `EXPECTED EXPR INSIDE BRACES`))
                }
            }
        }
        else if (node.type === TokenType.OP_DEREFERENCE) {
            final_type = PtrType.getInstance(final_type);
        }
        else {
            TODO(`parse type: ${node.order.tok}`);
        }
    }

    return variable_name ? { type: final_type, has_name: true, name: variable_name } : { type: final_type, has_name: false };
}

export function parse_declaration_from_tokens(context: Context, root: AstNode): { type: ValueType, name: string } {
    const res = parse_type_from_tokens(context, root);
    if (!res.has_name) {
        throwError(new TokenParserError(root.order.tok, `Expected Name after type declaration`));
    }
    return { type: res.type, name: res.name };
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
    recurs(root);
    nodes.sort((lhs, rhs) => lhs.order.pos < rhs.order.pos ? -1 : lhs.order.pos === rhs.order.pos ? 0 : 1);
    return nodes;
}
