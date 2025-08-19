import { Context } from "./context";
import { throwError, TODO, TokenParserError } from "./helper";
import { Token } from "./lexer";
import { TokenType } from "./token_type";
import { PtrType, ValueType } from "./value_types";

export function parse_type_from_tokens(context: Context, tokens: Token[]): ValueType {
    let type: ValueType | null;
    let isConst = false;
    const iter = tokens.values();
    let iter_out: IteratorResult<Token>;
    while (!(iter_out = iter.next()).done && iter_out.value.type === TokenType.KWD_CONST) {
        isConst = true;
    }
    if (iter_out.done) {
        throwError(new TokenParserError(tokens.at(-1)!, `No type declared except keyword CONST`));
    }
    if (!(type = context.hasTypename(iter_out.value.text))) {
        throwError(new TokenParserError(iter_out.value, `Unknown VALUE TYPE: [${iter_out.value.text}]`));
    }
    while (!(iter_out = iter.next()).done && iter_out.value.type === TokenType.KWD_CONST) {
        isConst = true;
    }
    type.is_const = isConst;
    while (!iter_out.done && (iter_out.value.type === TokenType.DECL_PTR)) {
        type = PtrType.getInstance(type);
        while (!(iter_out = iter.next()).done && iter_out.value.type === TokenType.KWD_CONST) {
            type.is_const = true;
        }
    }
    if (!iter_out.done) {
        throwError(new TokenParserError(iter_out.value!, `Couldn't parse type declaration: ${tokens}`));
    }
    return type;
}

export function parse_declaration_from_tokens(context: Context, tokens: Token[]): { type: ValueType, name: string } {
    if (tokens.length === 0) {
        throwError(new Error('Expected lvalue expression'));
    }
    if (tokens.at(-1)!.type !== TokenType.NAME) {
        throwError(new TokenParserError(tokens.at(-1)!, 'Expected variable name in lvalue expression'));
    }
    const value_name = tokens.at(-1)!.text;
    let typename;
    if (tokens.length >= 2 && tokens[0]!.type === TokenType.NAME && !!(typename = context.hasTypename(tokens[0]!.text))) {
        // then it is declaration of variable
        if (!!context.hasValue(value_name)) {
            throwError(new TokenParserError(tokens.at(-1)!, `Redeclaration of variable with name ${value_name}`));
        }
        const value_type = parse_type_from_tokens(context, tokens.slice(0, tokens.length - 1));
        return { type: value_type, name: value_name };
    }
    TODO(`${tokens}`);
}