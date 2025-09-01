"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STOP_SYMBOLS = exports.KEYWORDS = exports.C_BRACES = exports.O_BRACES = exports.VALUE_TOKENS = exports.OP_TOKENS = exports.TokenType = void 0;
exports.is_op_token_type = is_op_token_type;
exports.is_value_or_name_type = is_value_or_name_type;
var TokenType;
(function (TokenType) {
    TokenType[TokenType["HASH"] = 0] = "HASH";
    TokenType[TokenType["IN_TYPE"] = 1] = "IN_TYPE";
    TokenType[TokenType["NAME"] = 2] = "NAME";
    TokenType[TokenType["KEYWORD"] = 3] = "KEYWORD";
    TokenType[TokenType["O_PAREN"] = 4] = "O_PAREN";
    TokenType[TokenType["C_PAREN"] = 5] = "C_PAREN";
    TokenType[TokenType["O_SQR"] = 6] = "O_SQR";
    TokenType[TokenType["C_SQR"] = 7] = "C_SQR";
    TokenType[TokenType["O_CURL"] = 8] = "O_CURL";
    TokenType[TokenType["C_CURL"] = 9] = "C_CURL";
    TokenType[TokenType["NUM_INT"] = 10] = "NUM_INT";
    TokenType[TokenType["NUM_FLOAT"] = 11] = "NUM_FLOAT";
    TokenType[TokenType["STRING_LITERAL"] = 12] = "STRING_LITERAL";
    TokenType[TokenType["CHAR_LITERAL"] = 13] = "CHAR_LITERAL";
    TokenType[TokenType["STRING_LITERAL_SQUARE"] = 14] = "STRING_LITERAL_SQUARE";
    TokenType[TokenType["COMMA"] = 15] = "COMMA";
    TokenType[TokenType["SEMICOLON"] = 16] = "SEMICOLON";
    TokenType[TokenType["PREPROCESSOR"] = 17] = "PREPROCESSOR";
    TokenType[TokenType["OP_PLUS"] = 18] = "OP_PLUS";
    TokenType[TokenType["OP_MINUS"] = 19] = "OP_MINUS";
    TokenType[TokenType["OP_DIVIDE"] = 20] = "OP_DIVIDE";
    TokenType[TokenType["OP_PERCENT"] = 21] = "OP_PERCENT";
    TokenType[TokenType["OP_DOT"] = 22] = "OP_DOT";
    TokenType[TokenType["OP_ARROW"] = 23] = "OP_ARROW";
    TokenType[TokenType["OP_QUESTION"] = 24] = "OP_QUESTION";
    TokenType[TokenType["OP_COMP_EQ"] = 25] = "OP_COMP_EQ";
    TokenType[TokenType["OP_COMP_NOT_EQ"] = 26] = "OP_COMP_NOT_EQ";
    TokenType[TokenType["OP_COMP_LESS"] = 27] = "OP_COMP_LESS";
    TokenType[TokenType["OP_COMP_GREATER"] = 28] = "OP_COMP_GREATER";
    TokenType[TokenType["OP_COMP_GREATER_EQ"] = 29] = "OP_COMP_GREATER_EQ";
    TokenType[TokenType["OP_COMP_LESS_EQ"] = 30] = "OP_COMP_LESS_EQ";
    TokenType[TokenType["OP_ASSIGNMENT"] = 31] = "OP_ASSIGNMENT";
    TokenType[TokenType["OP_ASSIGNMENT_PLUS"] = 32] = "OP_ASSIGNMENT_PLUS";
    TokenType[TokenType["OP_ASSIGNMENT_MINUS"] = 33] = "OP_ASSIGNMENT_MINUS";
    TokenType[TokenType["OP_ASSIGNMENT_MULTIPLY"] = 34] = "OP_ASSIGNMENT_MULTIPLY";
    TokenType[TokenType["OP_ASSIGNMENT_DIVIDE"] = 35] = "OP_ASSIGNMENT_DIVIDE";
    TokenType[TokenType["OP_ASSIGNMENT_PERSENT"] = 36] = "OP_ASSIGNMENT_PERSENT";
    TokenType[TokenType["OP_ASTERISK"] = 37] = "OP_ASTERISK";
    TokenType[TokenType["OP_DEREFERENCE"] = 38] = "OP_DEREFERENCE";
    TokenType[TokenType["OP_MULTIPLY"] = 39] = "OP_MULTIPLY";
    TokenType[TokenType["OP_AND"] = 40] = "OP_AND";
    TokenType[TokenType["OP_OR"] = 41] = "OP_OR";
    TokenType[TokenType["OP_NEGATE"] = 42] = "OP_NEGATE";
    TokenType[TokenType["OP_DECREMENT"] = 43] = "OP_DECREMENT";
    TokenType[TokenType["OP_INCREMENT"] = 44] = "OP_INCREMENT";
    TokenType[TokenType["OP_AMPERSAND"] = 45] = "OP_AMPERSAND";
    TokenType[TokenType["OP_REFERENCE"] = 46] = "OP_REFERENCE";
    TokenType[TokenType["OP_LOGICAL_PLUS"] = 47] = "OP_LOGICAL_PLUS";
    TokenType[TokenType["KWD_RETURN"] = 48] = "KWD_RETURN";
    TokenType[TokenType["KWD_CONST"] = 49] = "KWD_CONST";
    TokenType[TokenType["KWD_IF"] = 50] = "KWD_IF";
    TokenType[TokenType["KWD_ELSE"] = 51] = "KWD_ELSE";
    TokenType[TokenType["KWD_FOR"] = 52] = "KWD_FOR";
    TokenType[TokenType["KWD_WHILE"] = 53] = "KWD_WHILE";
    TokenType[TokenType["KWD_BREAK"] = 54] = "KWD_BREAK";
    TokenType[TokenType["KWD_CONTINUE"] = 55] = "KWD_CONTINUE";
    TokenType[TokenType["KWD_STRUCT"] = 56] = "KWD_STRUCT";
    TokenType[TokenType["DECL_TYPENAME"] = 57] = "DECL_TYPENAME";
})(TokenType || (exports.TokenType = TokenType = {}));
exports.OP_TOKENS = [
    TokenType.OP_PLUS,
    TokenType.OP_MINUS,
    TokenType.OP_DIVIDE,
    TokenType.OP_PERCENT,
    TokenType.OP_DOT,
    TokenType.OP_ARROW,
    TokenType.OP_QUESTION,
    TokenType.OP_COMP_EQ,
    TokenType.OP_COMP_LESS,
    TokenType.OP_COMP_GREATER,
    TokenType.OP_COMP_GREATER_EQ,
    TokenType.OP_COMP_LESS_EQ,
    TokenType.OP_AMPERSAND,
    TokenType.OP_ASSIGNMENT,
    TokenType.OP_AND,
    TokenType.OP_OR,
    TokenType.OP_NEGATE,
    TokenType.OP_ASTERISK,
    TokenType.OP_REFERENCE,
    TokenType.OP_DEREFERENCE,
    TokenType.OP_MULTIPLY,
];
exports.VALUE_TOKENS = [
    TokenType.NUM_INT,
    TokenType.NUM_FLOAT,
    TokenType.STRING_LITERAL,
    TokenType.CHAR_LITERAL,
    TokenType.STRING_LITERAL_SQUARE,
    TokenType.NAME,
];
exports.O_BRACES = [TokenType.O_PAREN, TokenType.O_CURL, TokenType.O_SQR];
exports.C_BRACES = [TokenType.C_PAREN, TokenType.C_CURL, TokenType.C_SQR];
function is_op_token_type(type) {
    return exports.OP_TOKENS.includes(type);
}
function is_value_or_name_type(type) {
    return exports.OP_TOKENS.includes(type);
}
exports.KEYWORDS = {
    'return': TokenType.KWD_RETURN,
    'if': TokenType.KWD_IF,
    'else': TokenType.KWD_ELSE,
    'for': TokenType.KWD_FOR,
    'while': TokenType.KWD_WHILE,
    'const': TokenType.KWD_CONST,
    'break': TokenType.KWD_BREAK,
    'continue': TokenType.KWD_CONTINUE,
    'struct': TokenType.KWD_STRUCT,
};
exports.STOP_SYMBOLS = [' ', '!', '\n', ',', '.', '+', '-', '*', '/', '(', ')', '{', '}', '[', ']', ';', '=', '==', '<', '>', '&', '%', '"'];
