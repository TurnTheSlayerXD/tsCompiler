"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replace_ambigous_token_types = replace_ambigous_token_types;
const token_type_1 = require("./token_type");
function replace_ambigous_token_types(context, tokens) {
    for (let i = 0; i < tokens.length; ++i) {
        let cur = tokens[i];
        let prev = tokens[i - 1];
        if (cur.type === token_type_1.TokenType.OP_ASTERISK) {
            if ((prev && ((0, token_type_1.is_op_token_type)(prev.type) ||
                [token_type_1.TokenType.DECL_TYPENAME, token_type_1.TokenType.COMMA, ...token_type_1.O_BRACES].includes(prev.type)))
                || i - 1 < 0) {
                // then asterics is dereference
                cur.type = token_type_1.TokenType.OP_DEREFERENCE;
            }
            else {
                // then asterics is multiply
                cur.type = token_type_1.TokenType.OP_MULTIPLY;
            }
        }
        else if (cur.type === token_type_1.TokenType.OP_AMPERSAND) {
            if ((prev
                && ((0, token_type_1.is_op_token_type)(prev.type) ||
                    [token_type_1.TokenType.COMMA, ...token_type_1.O_BRACES].includes(prev.type)))
                || i - 1 < 0) {
                // then ampersand is dereference
                cur.type = token_type_1.TokenType.OP_REFERENCE;
            }
            else {
                // then ampersand is logical "plus"
                cur.type = token_type_1.TokenType.OP_LOGICAL_PLUS;
            }
        }
        else if (cur.type === token_type_1.TokenType.NAME && context.hasTypename(cur.text)) {
            cur.type = token_type_1.TokenType.DECL_TYPENAME;
        }
        // if (i + 1 < tokens.length && tokens[i]!.type === TokenType.NAME && tokens[i + 1]!.type === TokenType.O_PAREN) {
        //     tokens[i]!.type = TokenType.FUNC_CALL;
        // }
        // if (i + 1 < tokens.length && tokens[i]!.type === TokenType.NAME && tokens[i + 1]!.type === TokenType.O_SQR) {
        //     tokens[i]!.type = TokenType.SQR_CALL;
        // }
    }
}
