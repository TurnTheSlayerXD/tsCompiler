import { Context } from "./context";
import { Token } from "./lexer";
import { is_op_token_type, O_BRACES, TokenType } from "./token_type";

export function replace_ambigous_token_types(context: Context, tokens: Token[]) {
    for (let i = 0; i < tokens.length; ++i) {
        let cur = tokens[i]!;
        let prev = tokens[i - 1];

        if (cur.type === TokenType.OP_ASTERISK) {
            if ((prev && (is_op_token_type(prev.type) || O_BRACES.includes(prev.type)))
                || i - 1 < 0) {
                // then asterics is dereference
                cur.type = TokenType.OP_DEREFERENCE;
            }
            else {
                // then asterics is multiply
                cur.type = TokenType.OP_MULTIPLY;
            }
        }

        else if (cur.type === TokenType.OP_AMPERSAND) {
            if ((prev
                && (is_op_token_type(prev.type) || O_BRACES.includes(prev.type)))
                || i - 1 < 0) {
                // then ampersand is dereference
                cur.type = TokenType.OP_REFERENCE;
            }
            else {
                // then ampersand is logical "plus"
                cur.type = TokenType.OP_LOGICAL_PLUS;
            }
        }
        else if (cur.type === TokenType.NAME && context.hasTypename(cur.text)) {
            cur.type = TokenType.DECL_TYPENAME;
        }

        // if (i + 1 < tokens.length && tokens[i]!.type === TokenType.NAME && tokens[i + 1]!.type === TokenType.O_PAREN) {
        //     tokens[i]!.type = TokenType.FUNC_CALL;
        // }

        // if (i + 1 < tokens.length && tokens[i]!.type === TokenType.NAME && tokens[i + 1]!.type === TokenType.O_SQR) {
        //     tokens[i]!.type = TokenType.SQR_CALL;
        // }

    }
}
