
export enum TokenType {

    HASH,

    IN_TYPE,
    NAME,
    KEYWORD,

    O_PAREN,
    C_PAREN,

    O_CURL,
    C_CURL,

    NUM_INT,
    NUM_FLOAT,
    STRING_LITERAL,
    CHAR_LITERAL,
    STRING_LITERAL_SQUARE,

    COMMA,

    SEMICOLON,

    PREPROCESSOR,

    OP_PLUS,
    OP_MINUS,
    OP_DIVIDE,
    OP_PERCENT,
    OP_DOT,
    OP_ARROW,
    OP_QUESTION,
    OP_COMP_EQUAL,
    OP_COMP_NOT_EQUAL,
    OP_COMP_LESS,
    OP_COMP_GREATER,
    OP_COMP_GREATER_EQ,
    OP_COMP_LESS_EQ,
    OP_ASSIGNMENT,

    OP_ASTERISK,
    OP_DEREFERENCE,
    OP_MULTIPLY,

    OP_AND,
    OP_OR,
    OP_NEGATE,

    OP_DECREMENT,
    OP_INCREMENT,

    OP_AMPERSAND,
    OP_REFERENCE,
    OP_LOGICAL_PLUS,

    KWD_RETURN,
    KWD_CONST,
    KWD_IF,
    KWD_ELSE,
    KWD_FOR,
    KWD_WHILE,
    KWD_BREAK,
    KWD_CONTINUE,
}

export const OP_TOKENS = [
    TokenType.OP_PLUS,
    TokenType.OP_MINUS,
    TokenType.OP_DIVIDE,
    TokenType.OP_PERCENT,
    TokenType.OP_DOT,
    TokenType.OP_ARROW,
    TokenType.OP_QUESTION,
    TokenType.OP_COMP_EQUAL,
    TokenType.OP_COMP_LESS,
    TokenType.OP_COMP_GREATER,
    TokenType.OP_COMP_GREATER_EQ,
    TokenType.OP_COMP_LESS_EQ,
    TokenType.OP_AMPERSAND,
    TokenType.OP_ASSIGNMENT,


    TokenType.OP_ASTERISK,
    TokenType.OP_REFERENCE,
    TokenType.OP_DEREFERENCE,
    TokenType.OP_MULTIPLY,

];

export const VALUE_TOKENS = [
    TokenType.NUM_INT,
    TokenType.NUM_FLOAT,
    TokenType.STRING_LITERAL,
    TokenType.CHAR_LITERAL,
    TokenType.STRING_LITERAL_SQUARE,
    TokenType.NAME,
];

export function is_op_token_type(type: TokenType) {
    return OP_TOKENS.includes(type);
}

export function is_value_or_name_type(type: TokenType) {
    return OP_TOKENS.includes(type);
}


export type Keyword = {
    'return': TokenType,
    'if': TokenType,
    'else': TokenType,
    'for': TokenType,
    'while': TokenType,
    'const': TokenType,
    'break': TokenType,
    'continue': TokenType,
};

export const KEYWORDS: Keyword = {
    'return': TokenType.KWD_RETURN,
    'if': TokenType.KWD_IF,
    'else': TokenType.KWD_ELSE,
    'for': TokenType.KWD_FOR,
    'while': TokenType.KWD_WHILE,
    'const': TokenType.KWD_CONST,
    'break': TokenType.KWD_BREAK,
    'continue': TokenType.KWD_CONTINUE,
};

export const STOP_SYMBOLS = [' ', '!', '\n', ',', '.', '+', '-', '*', '/', '(', ')', '{', '}', ';', '=', '==', '<', '>', '&', '%', '"'];
