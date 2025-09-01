"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse_type_from_ast_node = parse_type_from_ast_node;
exports.parse_declaration_from_ast_node = parse_declaration_from_ast_node;
const helper_1 = require("./helper");
const token_type_1 = require("./token_type");
const array_type_1 = require("./value_types/array_type");
const function_type_1 = require("./value_types/function_type");
const ptr_type_1 = require("./value_types/ptr_type");
function parse_type_from_ast_node(context, root) {
    root.type === token_type_1.TokenType.DECL_TYPENAME || (0, helper_1.UNREACHABLE)();
    let variable_name;
    const nodes = collect_all_nodes_sorted_backwards(root);
    if (nodes.length === 0) {
        (0, helper_1.UNREACHABLE)();
    }
    if (nodes[0].type !== token_type_1.TokenType.DECL_TYPENAME) {
        (0, helper_1.UNREACHABLE)();
    }
    let final_type = context.hasTypename(nodes[0].order.tok.text) ?? (0, helper_1.UNREACHABLE)();
    if (nodes.at(-1).type === token_type_1.TokenType.NAME) {
        variable_name = nodes.at(-1).order.tok.text;
    }
    let type_modifiers = nodes.slice(1, !!variable_name ? nodes.length - 1 : nodes.length);
    function get_type(index) {
        for (let i = index; i < type_modifiers.length; ++i) {
            const node = type_modifiers[i];
            if (node.type === token_type_1.TokenType.O_SQR) {
                const bracket_node = node ?? (0, helper_1.UNREACHABLE)();
                let array_size = null;
                if (bracket_node.middle) {
                    if (bracket_node.middle.type !== token_type_1.TokenType.NUM_INT) {
                        (0, helper_1.throwError)(new helper_1.TokenParserError(bracket_node.order.tok, `Expected constant expression inside Array size qualifier. Found: ${bracket_node.middle.order.tok}`));
                    }
                    array_size = parseInt(bracket_node.middle.order.tok.text);
                    if (!Number.isFinite(array_size)) {
                        (0, helper_1.throwError)(new helper_1.TokenParserError(bracket_node.middle.order.tok, `Expected Integer expression`));
                    }
                }
                get_type(i + 1);
                final_type = array_type_1.ArrayType.getArrayInstance(final_type, array_size);
                return;
            }
            else if (node.type === token_type_1.TokenType.O_PAREN) {
                const bracket_node = node ?? (0, helper_1.UNREACHABLE)();
                if (bracket_node.middle) {
                    if (bracket_node.middle.type === token_type_1.TokenType.OP_DEREFERENCE) {
                        if (i + 1 >= type_modifiers.length || type_modifiers[i + 1].type !== token_type_1.TokenType.O_PAREN) {
                            (0, helper_1.throwError)(new helper_1.TokenParserError(bracket_node.order.tok, `Expected O_PAREN IN PTR TO FUNCTION TYPE DECLARATION`));
                        }
                        const fun_param_types = [];
                        let comma_node = (type_modifiers[i + 1] ?? (0, helper_1.UNREACHABLE)()).middle;
                        while (comma_node && comma_node.type === token_type_1.TokenType.COMMA) {
                            const param_type = parse_type_from_ast_node(context, comma_node.left ?? (0, helper_1.throwError)(new helper_1.TokenParserError(comma_node.order.tok, `Expected type`)));
                            fun_param_types.push(param_type.has_name ? (0, helper_1.UNREACHABLE)() : param_type.type);
                            comma_node = comma_node.right;
                        }
                        if (comma_node) {
                            const param_type = parse_type_from_ast_node(context, comma_node.left ?? (0, helper_1.throwError)(new helper_1.TokenParserError(comma_node.order.tok, `Expected type`)));
                            fun_param_types.push(param_type.has_name ? (0, helper_1.UNREACHABLE)() : param_type.type);
                        }
                        final_type = ptr_type_1.PtrType.getInstance(function_type_1.FunctionType.getInstance(final_type, fun_param_types));
                    }
                    else {
                        (0, helper_1.throwError)(new helper_1.TokenParserError(bracket_node.order.tok, `EXPECTED EXPR INSIDE BRACES`));
                    }
                }
            }
            else if (node.type === token_type_1.TokenType.OP_DEREFERENCE) {
                final_type = ptr_type_1.PtrType.getInstance(final_type);
            }
            else {
                (0, helper_1.TODO)(`parse type: ${node.order.tok}`);
            }
        }
    }
    get_type(0);
    return variable_name ? { type: final_type, has_name: true, name: variable_name } : { type: final_type, has_name: false };
}
function parse_declaration_from_ast_node(context, root) {
    const res = parse_type_from_ast_node(context, root);
    if (!res.has_name) {
        (0, helper_1.throwError)(new helper_1.TokenParserError(root.order.tok, `Expected Name after type declaration`));
    }
    return { type: res.type, name: res.name };
}
function collect_all_nodes_sorted_backwards(root) {
    const nodes = [];
    const recurs = (node) => {
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
