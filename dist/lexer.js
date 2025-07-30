"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lexer = exports.Token = exports.TokenAccessException = exports.Position = void 0;
const helper_1 = require("./helper");
const token_type_1 = require("./token_type");
class Position {
    row;
    col;
    count;
    instance_type;
    constructor(row, col, count) {
        this.row = row;
        this.col = col;
        this.count = count;
        this.instance_type = 'position';
    }
    toString = () => {
        return `${this.row}:${this.col}:${this.count}`;
    };
}
exports.Position = Position;
function equal(lhs, rhs) {
    return lhs.count === rhs.count && lhs.row === rhs.row && lhs.col === rhs.col;
}
function not_equal(lhs, rhs) {
    return lhs.count !== rhs.count;
}
class TokenAccessException extends Error {
    constructor(tok) {
        super(`Cannot access text property of token with type ${token_type_1.TokenType[tok.type]}`);
    }
}
exports.TokenAccessException = TokenAccessException;
class Token {
    instance_type;
    pos;
    type;
    _text;
    constructor(pos, text, type) {
        this.pos = pos;
        this._text = text;
        this.type = type;
        this.instance_type = 'token';
    }
    get text() {
        if (this.type !== token_type_1.TokenType.NAME
            && this.type !== token_type_1.TokenType.STRING_LITERAL
            && this.type !== token_type_1.TokenType.NUM_INT
            && this.type !== token_type_1.TokenType.NUM_FLOAT) {
            throw new TokenAccessException(this);
        }
        return this._text;
    }
    set text(text) {
        this._text = text;
    }
    toString = () => {
        return `[${token_type_1.TokenType[this.type]}]  [${this.type === token_type_1.TokenType.NAME ? this.text : ''}]  [${this.pos}]\n`;
    };
}
exports.Token = Token;
function TODO(msg) {
    throw new Error(`TODO: ${msg}`);
}
function isspace(str) {
    return str === ' ' || str === '\n';
}
class Lexer {
    type = 'lexer';
    cursor = new Position(1, 0, 0);
    prev_cursor = new Position(1, 0, 0);
    text;
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
            throw new helper_1.LexerError(this, 'Trying to backwar before ZEROR');
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
            (0, helper_1.throwError)(new helper_1.LexerError(this, "UNCHECKED BOUNDARIES")) :
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
            throw new helper_1.LexerError(this, `No such preprocessor directive: [${directive}]`);
        }
        return new Token({ ...this.prev_cursor }, directive, token_type_1.TokenType.PREPROCESSOR);
    }
    substr(prev_cursor, cursor) {
        return this.text.substring(prev_cursor.count, cursor.count);
    }
    next_token_or_throw() {
        return this.next_token() ?? (0, helper_1.throwError)(new helper_1.ParserError(this, "Cannot parse"));
    }
    next_token() {
        this.ltrim(this.cursor);
        if (this.cursor.count === this.prev_cursor.count && this.cursor.count !== 0) {
            console.warn(`WARNING: spotted unknown sequnce: ${this.substr(this.prev_cursor, this.cursor)}\n`);
            this.iter_cursor(this.cursor, 1);
        }
        this.prev_cursor = { ...this.cursor };
        if (this.iseof(this.cursor)) {
            return null;
        }
        if (this.at(this.cursor) === '#') {
            this.iter_while_not_equal(this.cursor, ['\n']);
            return new Token({ ...this.cursor }, this.substr(this.prev_cursor, this.cursor), token_type_1.TokenType.PREPROCESSOR);
        }
        if (this.at(this.cursor) === '(') {
            this.iter_cursor(this.cursor, 1);
            return new Token({ ...this.prev_cursor }, '(', token_type_1.TokenType.O_PAREN);
        }
        if (this.at(this.cursor) === ')') {
            this.iter_cursor(this.cursor, 1);
            return new Token({ ...this.prev_cursor }, ')', token_type_1.TokenType.C_PAREN);
        }
        if (this.at(this.cursor) === '{') {
            this.iter_cursor(this.cursor, 1);
            return new Token({ ...this.prev_cursor }, '{', token_type_1.TokenType.O_CURL);
        }
        if (this.at(this.cursor) === '}') {
            this.iter_cursor(this.cursor, 1);
            return new Token({ ...this.prev_cursor }, '}', token_type_1.TokenType.C_CURL);
        }
        if (this.at(this.cursor) === '"') {
            this.iter_cursor(this.cursor, 1);
            this.iter_while_not_equal(this.cursor, '"');
            if (this.iseof(this.cursor)) {
                throw new helper_1.LexerError(this, `Unmatched quota ["]`);
            }
            this.iter_cursor(this.cursor, 1);
            return new Token({ ...this.prev_cursor }, this.text.substring(this.prev_cursor.count + 1, this.cursor.count - 1), token_type_1.TokenType.STRING_LITERAL);
        }
        if (this.at(this.cursor) === '\'') {
            this.iter_cursor(this.cursor, 1);
            this.iter_while_not_equal(this.cursor, '"');
            if (this.iseof(this.cursor)) {
                throw new helper_1.LexerError(this, `Unmatched quota [']`);
            }
            if (this.cursor.count - this.prev_cursor.count < 2) {
                throw new helper_1.LexerError(this, `Char Quotas cannot contain underline string length less than 1 [${this.text.substring(this.prev_cursor.count, this.cursor.count + 1)}]`);
            }
            this.iter_cursor(this.cursor, 1);
            return new Token({ ...this.prev_cursor }, this.text.substring(this.prev_cursor.count, this.cursor.count), token_type_1.TokenType.CHAR_LITERAL);
        }
        if (this.is_equal_to_expr(this.cursor, '->')) {
            this.iter_cursor(this.cursor, 2);
            return new Token({ ...this.prev_cursor }, '->', token_type_1.TokenType.OP_ARROW);
        }
        if (this.is_equal_to_expr(this.cursor, '==')) {
            this.iter_cursor(this.cursor, 2);
            return new Token({ ...this.prev_cursor }, '.', token_type_1.TokenType.OP_COMP_EQUAL);
        }
        if (this.is_equal_to_expr(this.cursor, '<=')) {
            this.iter_cursor(this.cursor, 2);
            return new Token({ ...this.prev_cursor }, '.', token_type_1.TokenType.OP_COMP_LESS_EQ);
        }
        if (this.is_equal_to_expr(this.cursor, '>=')) {
            this.iter_cursor(this.cursor, 2);
            return new Token({ ...this.prev_cursor }, '>=', token_type_1.TokenType.OP_COMP_GREATER_EQ);
        }
        if (this.at(this.cursor) === '+') {
            this.iter_cursor(this.cursor, 1);
            return new Token({ ...this.prev_cursor }, '+', token_type_1.TokenType.OP_PLUS);
        }
        if (this.at(this.cursor) === '-') {
            this.iter_cursor(this.cursor, 1);
            return new Token({ ...this.prev_cursor }, '-', token_type_1.TokenType.OP_MINUS);
        }
        if (this.at(this.cursor) === ';') {
            this.iter_cursor(this.cursor, 1);
            return new Token({ ...this.prev_cursor }, ';', token_type_1.TokenType.SEMICOLON);
        }
        if (this.at(this.cursor) === '*') {
            this.iter_cursor(this.cursor, 1);
            return new Token({ ...this.prev_cursor }, '*', token_type_1.TokenType.OP_ASTERISK);
        }
        if (this.at(this.cursor) === '/') {
            this.iter_cursor(this.cursor, 1);
            return new Token({ ...this.prev_cursor }, '/', token_type_1.TokenType.OP_DIVIDE);
        }
        if (this.at(this.cursor) === '.') {
            this.iter_cursor(this.cursor, 1);
            return new Token({ ...this.prev_cursor }, '.', token_type_1.TokenType.OP_DOT);
        }
        if (this.at(this.cursor) === ',') {
            this.iter_cursor(this.cursor, 1);
            return new Token({ ...this.prev_cursor }, ',', token_type_1.TokenType.COMMA);
        }
        if (this.at(this.cursor) === '<') {
            this.iter_cursor(this.cursor, 1);
            return new Token({ ...this.prev_cursor }, '<', token_type_1.TokenType.OP_COMP_LESS);
        }
        if (this.at(this.cursor) === '>') {
            this.iter_cursor(this.cursor, 1);
            return new Token({ ...this.prev_cursor }, '>', token_type_1.TokenType.OP_COMP_GREATER);
        }
        if (this.at(this.cursor) === '=') {
            this.iter_cursor(this.cursor, 1);
            return new Token({ ...this.prev_cursor }, '=', token_type_1.TokenType.OP_ASSIGNMENT);
        }
        const STOP_SYMBOLS = [' ', '\n', ',', '.', '+', '-', '*', '/', '(', ')', '{', '}', ';', '=', '==', '<', '>', '->'];
        this.iter_while_not_equal(this.cursor, STOP_SYMBOLS);
        const text = this.text.substring(this.prev_cursor.count, this.cursor.count);
        if (text.match(/^[+-]?\d+$/g) && !this.iseof(this.cursor) && this.at(this.cursor) === '.') {
            this.iter_cursor(this.cursor, 1);
            this.iter_while_not_equal(this.cursor, STOP_SYMBOLS);
            const float_text = this.substr(this.prev_cursor, this.cursor);
            if (/^[+-]?\d+(\.\d+)?$/g.test(float_text)) {
                return new Token({ ...this.prev_cursor }, float_text, token_type_1.TokenType.NUM_FLOAT);
            }
        }
        if (/^[+-]?\d+$/.test(text)) {
            return new Token({ ...this.prev_cursor }, text, token_type_1.TokenType.NUM_INT);
        }
        const KEYWORDS = {
            'return': token_type_1.TokenType.KWD_RETURN,
            'if': token_type_1.TokenType.KWD_IF,
            'else': token_type_1.TokenType.KWD_ELSE,
            'for': token_type_1.TokenType.KWD_FOR,
            'while': token_type_1.TokenType.KWD_WHILE,
            'const': token_type_1.TokenType.KWD_CONST,
        };
        if (text in KEYWORDS) {
            return new Token({ ...this.prev_cursor }, text, KEYWORDS[text]);
        }
        if (!(/^[a-zA-Z]+[0-9]*$/.test(text))) {
            (0, helper_1.throwError)(new helper_1.LexerError(this, `[${text}] - Incorrect variabler name`));
        }
        return new Token({ ...this.prev_cursor }, text, token_type_1.TokenType.NAME);
    }
}
exports.Lexer = Lexer;
class ArrayLexer extends Lexer {
    tokens;
    iter = 0;
    constructor(tokens) {
        super('');
        this.tokens = tokens;
    }
    next_token_or_throw() {
        return this.tokens[this.iter++] ?? (0, helper_1.throwError)(new helper_1.LexerError(this, 'Out of tokens'));
    }
    next_token() {
        return this.tokens[this.iter++] ?? null;
    }
}
