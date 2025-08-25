import { AstBracketNode } from "./ast_bracket_node";
import { AstNode } from "./ast_node";
import { Context } from "./context";
import { throwError, TODO, TokenParserError, UNREACHABLE } from "./helper";
import { Token } from "./lexer";
import { TokenType } from "./token_type";
import { ArrayType, PtrType, ValueType } from "./value_types";

export function parse_type_from_tokens(context: Context, root: AstNode): ValueType {
    root.type === TokenType.DECL_TYPENAME || UNREACHABLE();

    let variable_name: string | undefined;
    let final_type: ValueType = context.hasTypename(root.order.tok.text) ?? UNREACHABLE();
    const recurs = (node: AstNode): ValueType => {
        if (node.type === TokenType.OP_DEREFERENCE) {
            final_type = PtrType.getInstance(final_type);
        }
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
            if (!node.left) {
                return ArrayType.getInstance(final_type, array_size);
            }
            return ArrayType.getInstance(recurs(node.left), array_size);
        }
        if (node.type === TokenType.OP_DEREFERENCE) {
            if (!node.left) {
                return PtrType.getInstance(final_type);
            }
        }

        if (!node.left && !node.right) {
            return;
        }
        TODO(`Type parsing ${node.order}`);
    };




    return type;
}

export function parse_declaration_from_tokens(context: Context, tokens: Token[]): { type: ValueType, name: string } {

}
