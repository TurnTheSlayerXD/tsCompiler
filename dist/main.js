"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
class Position {
    row;
    col;
    count;
    constructor(row, col, count) {
        this.row = row;
        this.col = col;
        this.count = count;
    }
}
function toString(obj) {
    if (obj instanceof Position) {
        return `${obj.row}:${obj.col}:${obj.count}`;
    }
    else if (obj instanceof Token) {
        return `type: [${TokenType[obj.type]}] text: [${obj.text}] pos: [${toString(obj.pos)}]`;
    }
    const type = '';
    console.log(`Can't convert object of type [${type}] to string`);
    throw new Error(`Can't convert object of type [${type}] to string`);
}
function equal(lhs, rhs) {
    return lhs.count === rhs.count && lhs.row === rhs.row && lhs.col === rhs.col;
}
function not_equal(lhs, rhs) {
    return lhs.count !== rhs.count;
}
var TokenType;
(function (TokenType) {
    TokenType[TokenType["HASH"] = 0] = "HASH";
    TokenType[TokenType["BUILTIN_TYPE"] = 1] = "BUILTIN_TYPE";
    TokenType[TokenType["NAME"] = 2] = "NAME";
    TokenType[TokenType["KEYWORD"] = 3] = "KEYWORD";
    TokenType[TokenType["O_PAREN"] = 4] = "O_PAREN";
    TokenType[TokenType["C_PAREN"] = 5] = "C_PAREN";
    TokenType[TokenType["O_CURL"] = 6] = "O_CURL";
    TokenType[TokenType["C_CURL"] = 7] = "C_CURL";
    TokenType[TokenType["NUM_INT"] = 8] = "NUM_INT";
    TokenType[TokenType["NUM_FLOAT"] = 9] = "NUM_FLOAT";
    TokenType[TokenType["STRING_LITERAL"] = 10] = "STRING_LITERAL";
    TokenType[TokenType["CHAR_LITERAL"] = 11] = "CHAR_LITERAL";
    TokenType[TokenType["STRING_LITERAL_SQUARE"] = 12] = "STRING_LITERAL_SQUARE";
    TokenType[TokenType["COMMA"] = 13] = "COMMA";
    TokenType[TokenType["SEMICOLON"] = 14] = "SEMICOLON";
    TokenType[TokenType["PREPROCESSOR"] = 15] = "PREPROCESSOR";
    TokenType[TokenType["OP_PLUS"] = 16] = "OP_PLUS";
    TokenType[TokenType["OP_MINUS"] = 17] = "OP_MINUS";
    TokenType[TokenType["OP_ASTERISK"] = 18] = "OP_ASTERISK";
    TokenType[TokenType["OP_DIVIDE"] = 19] = "OP_DIVIDE";
    TokenType[TokenType["OP_PERCENT"] = 20] = "OP_PERCENT";
    TokenType[TokenType["OP_DOT"] = 21] = "OP_DOT";
    TokenType[TokenType["OP_ARROW"] = 22] = "OP_ARROW";
    TokenType[TokenType["OP_COMP_EQUAL"] = 23] = "OP_COMP_EQUAL";
    TokenType[TokenType["OP_COMP_LESS"] = 24] = "OP_COMP_LESS";
    TokenType[TokenType["OP_COMP_GREATER"] = 25] = "OP_COMP_GREATER";
    TokenType[TokenType["OP_COMP_GREATER_EQ"] = 26] = "OP_COMP_GREATER_EQ";
    TokenType[TokenType["OP_COMP_LESS_EQ"] = 27] = "OP_COMP_LESS_EQ";
    TokenType[TokenType["OP_ASSIGNMENT"] = 28] = "OP_ASSIGNMENT";
    TokenType[TokenType["KWD_RETURN"] = 29] = "KWD_RETURN";
    TokenType[TokenType["KWD_CONST"] = 30] = "KWD_CONST";
    TokenType[TokenType["KWD_IF"] = 31] = "KWD_IF";
    TokenType[TokenType["KWD_ELSE"] = 32] = "KWD_ELSE";
})(TokenType || (TokenType = {}));
class Token {
    pos;
    type;
    text;
    constructor(pos, text, type) {
        this.pos = pos;
        this.text = text;
        this.type = type;
    }
}
function TODO(msg) {
    throw new Error(`TODO: ${msg}`);
}
function isspace(str) {
    return str === ' ' || str === '\n';
}
class LexerError extends Error {
    constructor(lexer, msg) {
        super(`Lexer Error at ${toString(lexer.prev_cursor)}:\n${msg}\n`);
    }
}
function throwError(error) {
    throw error;
}
class Lexer {
    text;
    cursor = { row: 1, col: 0, count: 0 };
    prev_cursor = { row: 1, col: 0, count: 0 };
    last_token = null;
    constructor(text) {
        this.text = text;
        this.clear_from_tabulations();
    }
    iseof(cursor) {
        return cursor.count >= this.text.length;
    }
    iter_cursor(cursor, count) {
        for (let i = 0; i < count; ++i) {
            if (this.iseof(cursor)) {
                break;
            }
            if (this.text[this.cursor.count] === '\n') {
                cursor.row++;
                cursor.col = 0;
            }
            else {
                cursor.col++;
            }
            cursor.count++;
        }
    }
    backward_iter_cursor(cursor) {
        if (this.cursor.count - 1 < 0) {
            throw new LexerError(this, 'Trying to backwar before ZEROR');
        }
        if (this.text[this.cursor.count - 1] === '\n') {
            const index = this.text.substring(0, this.cursor.count - 1).lastIndexOf('\n');
            cursor.row--;
            cursor.col = cursor.count - index;
        }
        else {
            cursor.col--;
        }
        cursor.count--;
    }
    clear_from_tabulations() {
        this.text = this.text.replaceAll('\r', ' ');
        this.text = this.text.replaceAll('\t', ' ');
    }
    ltrim(cursor) {
        while (!this.iseof(cursor) && isspace(this.at(cursor))) {
            this.iter_cursor(cursor, 1);
        }
    }
    is_equal_to_expr(cursor, expr) {
        return cursor.count + expr.length < this.text.length &&
            this.text.substring(this.cursor.count, this.cursor.count + expr.length) === expr;
    }
    at(cursor) {
        return this.iseof(this.cursor) ?
            throwError(new LexerError(this, "UNCHECKED BOUNDARIES")) :
            this.text[cursor.count];
    }
    iter_while_not_equal(cursor, symbols) {
        if (typeof symbols === "string") {
            while (!this.iseof(cursor) && this.at(cursor) !== symbols) {
                this.iter_cursor(cursor, 1);
            }
        }
        else if (Array.isArray(symbols)) {
            while (!this.iseof(cursor) && !symbols.includes(this.at(cursor))) {
                this.iter_cursor(cursor, 1);
            }
        }
    }
    is_correct_preprocessor(directive) {
        if (!["#include", "#define", "#if", "#else"].includes(directive)) {
            throw new LexerError(this, `No such preprocessor directive: [${directive}]`);
        }
        return { pos: { ...this.cursor }, type: TokenType.PREPROCESSOR, text: directive };
    }
    substr(prev_cursor, cursor) {
        return this.text.substring(prev_cursor.count, cursor.count);
    }
    next_token() {
        this.ltrim(this.cursor);
        if (this.cursor.count === this.prev_cursor.count && this.cursor.count !== 0) {
            console.warn(`WARNING: spotted unknown sequnce: ${this.substr(this.prev_cursor, this.cursor)}\n`);
            this.iter_cursor(this.cursor, 1);
        }
        this.prev_cursor = { ...this.cursor };
        if (this.iseof(this.cursor)) {
            return undefined;
        }
        if (this.at(this.cursor) === '#') {
            this.iter_while_not_equal(this.cursor, ['\n', ' ']);
            if (this.iseof(this.cursor)) {
                throw new LexerError(this, `No such preprocessor directive: 
                    ${this.text.substring(this.prev_cursor.count)}`);
            }
            const directive = this.text.substring(this.prev_cursor.count, this.cursor.count).trimEnd();
            const token = this.is_correct_preprocessor(directive);
            return token;
        }
        if (this.at(this.cursor) === '(') {
            this.iter_cursor(this.cursor, 1);
            return ({ pos: { ...this.prev_cursor }, text: '(', type: TokenType.O_PAREN });
        }
        if (this.at(this.cursor) === ')') {
            this.iter_cursor(this.cursor, 1);
            return ({ pos: { ...this.prev_cursor }, text: ')', type: TokenType.C_PAREN });
        }
        if (this.at(this.cursor) === '{') {
            this.iter_cursor(this.cursor, 1);
            return ({ pos: { ...this.prev_cursor }, text: '{', type: TokenType.O_CURL });
        }
        if (this.at(this.cursor) === '}') {
            this.iter_cursor(this.cursor, 1);
            return ({ pos: { ...this.prev_cursor }, text: '}', type: TokenType.C_CURL });
        }
        if (this.at(this.cursor) === '"') {
            this.iter_cursor(this.cursor, 1);
            this.iter_while_not_equal(this.cursor, '"');
            if (this.iseof(this.cursor)) {
                throw new LexerError(this, `Unmatched quota ["]`);
            }
            this.iter_cursor(this.cursor, 1);
            return { pos: { ...this.prev_cursor }, text: this.text.substring(this.prev_cursor.count, this.cursor.count), type: TokenType.STRING_LITERAL };
        }
        if (this.at(this.cursor) === '\'') {
            this.iter_cursor(this.cursor, 1);
            this.iter_while_not_equal(this.cursor, '"');
            if (this.iseof(this.cursor)) {
                throw new LexerError(this, `Unmatched quota [']`);
            }
            if (this.cursor.count - this.prev_cursor.count < 2) {
                throw new LexerError(this, `Char Quotas cannot contain underline string length less than 1 [${this.text.substring(this.prev_cursor.count, this.cursor.count + 1)}]`);
            }
            this.iter_cursor(this.cursor, 1);
            return { pos: { ...this.prev_cursor }, text: this.text.substring(this.prev_cursor.count, this.cursor.count), type: TokenType.CHAR_LITERAL };
        }
        if (this.is_equal_to_expr(this.cursor, '->')) {
            this.iter_cursor(this.cursor, 2);
            return { pos: { ...this.prev_cursor }, text: '->', type: TokenType.OP_ARROW };
        }
        if (this.is_equal_to_expr(this.cursor, '==')) {
            this.iter_cursor(this.cursor, 2);
            return { pos: { ...this.prev_cursor }, text: '.', type: TokenType.OP_COMP_EQUAL };
        }
        if (this.is_equal_to_expr(this.cursor, '<=')) {
            this.iter_cursor(this.cursor, 2);
            return { pos: { ...this.prev_cursor }, text: '.', type: TokenType.OP_COMP_LESS_EQ };
        }
        if (this.is_equal_to_expr(this.cursor, '>=')) {
            this.iter_cursor(this.cursor, 2);
            return { pos: { ...this.prev_cursor }, text: '>=', type: TokenType.OP_COMP_GREATER_EQ };
        }
        if (this.at(this.cursor) === '+') {
            this.iter_cursor(this.cursor, 1);
            return { pos: { ...this.prev_cursor }, text: '+', type: TokenType.OP_PLUS };
        }
        if (this.at(this.cursor) === '-') {
            this.iter_cursor(this.cursor, 1);
            return { pos: { ...this.prev_cursor }, text: '-', type: TokenType.OP_MINUS };
        }
        if (this.at(this.cursor) === ';') {
            this.iter_cursor(this.cursor, 1);
            return { pos: { ...this.prev_cursor }, text: ';', type: TokenType.SEMICOLON };
        }
        if (this.at(this.cursor) === '*') {
            this.iter_cursor(this.cursor, 1);
            return { pos: { ...this.prev_cursor }, text: '*', type: TokenType.OP_ASTERISK };
        }
        if (this.at(this.cursor) === '/') {
            this.iter_cursor(this.cursor, 1);
            return { pos: { ...this.prev_cursor }, text: '/', type: TokenType.OP_DIVIDE };
        }
        if (this.at(this.cursor) === '.') {
            this.iter_cursor(this.cursor, 1);
            return { pos: { ...this.prev_cursor }, text: '.', type: TokenType.OP_DOT };
        }
        if (this.at(this.cursor) === ',') {
            this.iter_cursor(this.cursor, 1);
            return { pos: { ...this.prev_cursor }, text: ',', type: TokenType.COMMA };
        }
        if (this.at(this.cursor) === '<') {
            this.iter_cursor(this.cursor, 1);
            return { pos: { ...this.prev_cursor }, text: '<', type: TokenType.OP_COMP_LESS };
        }
        if (this.at(this.cursor) === '>') {
            this.iter_cursor(this.cursor, 1);
            return { pos: { ...this.prev_cursor }, text: '>', type: TokenType.OP_COMP_GREATER };
        }
        if (this.at(this.cursor) === '=') {
            this.iter_cursor(this.cursor, 1);
            return { pos: { ...this.prev_cursor }, text: '=', type: TokenType.OP_ASSIGNMENT };
        }
        const STOP_SYMBOLS = [' ', '\n', ',', '.', '+', '-', '(', ')', '{', '}', ';', '"', '\'', '=', '==', '<', '>', '->'];
        const KEYWORDS = {
            'return': TokenType.KWD_RETURN, 'const': TokenType.KWD_CONST,
            'if': TokenType.KWD_IF,
            'else': TokenType.KWD_ELSE,
        };
        this.iter_while_not_equal(this.cursor, STOP_SYMBOLS);
        const text = this.text.substring(this.prev_cursor.count, this.cursor.count);
        if (text.match(/[+-]?\d+/g) && !this.iseof(this.cursor) && this.at(this.cursor) === '.') {
            this.iter_cursor(this.cursor, 1);
            this.iter_while_not_equal(this.cursor, STOP_SYMBOLS);
            const float_text = this.substr(this.prev_cursor, this.cursor);
            if (/[+-]?\d+(\.\d+)?/g.test(float_text)) {
                return { pos: { ...this.prev_cursor }, text: float_text, type: TokenType.NUM_FLOAT };
            }
        }
        if (text.match(/[+-]?\d+/g)) {
            return { pos: { ...this.prev_cursor }, text, type: TokenType.NUM_INT };
        }
        if (text in KEYWORDS) {
            return {
                pos: { ...this.prev_cursor },
                text,
                type: KEYWORDS[text]
            };
        }
        return { pos: { ...this.prev_cursor }, text, type: TokenType.NAME, };
    }
}
const main = (() => {
    const text = (0, fs_1.readFileSync)("./example/main.c").toString();
    const lexer = new Lexer(text);
    let token;
    let prev;
    let cur;
    let i = 0;
    const tokens = [];
    while ((token = lexer.next_token()) !== undefined) {
        if (token === undefined) {
            break;
        }
        console.log(`${i++}-th line: ${toString(token)}\n`);
        let cur = toString(token);
        tokens.push(token);
        if (cur === prev) {
            // console.log(`cur = ${typeof cur}, prev = ${typeof prev}`);
            throw new Error(String(`REPETITION: cur=[${cur}] prev=[${prev}])`));
        }
        prev = cur;
    }
    console.log(tokens.map((t) => t.text).join(' @\n\r'));
})();
