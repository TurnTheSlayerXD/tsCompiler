import { Context } from "./context";
import { throwError, TokenParserError } from "./helper";
import { Token } from "./lexer";
import { TokenType } from "./token_type";
import { PtrType, ValueType } from "./value_types";

export function parse_type_from_tokens(context: Context, tokens: Token[]): ValueType {
    let i = 0;
    let type: ValueType | null;
    let isConst = false;
    while (i < tokens.length && tokens[i]!.type === TokenType.KWD_CONST) {
        isConst = true;
        ++i;
    }
    if (i >= tokens.length) {
        throwError(new TokenParserError(tokens.at(-1)!, `No type declared except keyword CONST`));
    }
    if (!(type = context.hasTypename(tokens[i]!.text))) {
        throwError(new TokenParserError(tokens[i]!, `Unknown VALUE TYPE: [${tokens[i]!.text}]`));
    }
    ++i;
    while (i < tokens.length && tokens[i]!.type === TokenType.KWD_CONST) {
        isConst = true;
        ++i;
    }
    type.is_const = isConst;
    while (i < tokens.length && (tokens[i]!.type === TokenType.OP_ASTERISK || tokens[i]!.type === TokenType.OP_DEREFERENCE)) {
        type = PtrType.getInstance(type);
        ++i;
        while (i < tokens.length && tokens[i]!.type === TokenType.KWD_CONST) {
            type.is_const = true;
            ++i;
        }
    }
    return type;
}