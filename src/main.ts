
import { strict } from "assert";
import { error } from "console";
import { readFileSync } from "fs";
import { CursorPos } from "readline";


class Position {
    instance_type?: string = 'position';
    constructor(public row: number, public col: number, public count: number,) { }
}

function toString(obj: Position | Token): string {
    if (obj.instance_type === 'position') {
        return `${(obj as Position).row}:${(obj as Position).col}:${(obj as Position).count}`;
    }
    else if (obj.instance_type === 'token') {
        return `type: [${TokenType[(obj as Token).type]}] text: [${(obj as Token).text}] pos: [${toString((obj as Token).pos)}]`;
    }
    const type = obj.instance_type;
    throw new Error(`Can't convert object of type [${type}] to string`);
}

function equal(lhs: Position, rhs: Position): boolean {
    return lhs.count === rhs.count && lhs.row === rhs.row && lhs.col === rhs.col;
}

function not_equal(lhs: Position, rhs: Position): boolean {
    return lhs.count !== rhs.count;
}

enum TokenType {

    HASH,

    BUILTIN_TYPE,
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
    OP_ASTERISK,
    OP_DIVIDE,
    OP_PERCENT,

    OP_DOT,
    OP_ARROW,


    OP_COMP_EQUAL,
    OP_COMP_LESS,
    OP_COMP_GREATER,
    OP_COMP_GREATER_EQ,
    OP_COMP_LESS_EQ,


    OP_ASSIGNMENT,


    KWD_RETURN,
    KWD_CONST,

    KWD_IF,
    KWD_ELSE,
}


class Token {
    instance_type?: string;
    pos: Position;
    type: TokenType;
    text: string;
    constructor(pos: Position, text: string, type: TokenType) {
        this.pos = pos;
        this.text = text;
        this.type = type;
        this.instance_type = 'token';
    }
}

function TODO(msg: string) {
    throw new Error(`TODO: ${msg}`);
}

function isspace(str: string): boolean {
    return str === ' ' || str === '\n';
}

class LexerError extends Error {
    constructor(lexer: Lexer, msg: string) {
        super(`Lexer Error at ${toString(lexer.prev_cursor)}:\n${msg}\n`);
    }
}

function throwError(error: Error): never {
    throw error;
}


class Lexer {
    type?: string = 'lexer';
    cursor: Position = { row: 1, col: 0, count: 0 };
    prev_cursor: Position = { row: 1, col: 0, count: 0 };
    last_token: Token | null = null;

    constructor(public text: string) {
        this.clear_from_tabulations();
    }

    iseof(cursor: Position): boolean {
        return cursor.count >= this.text.length;
    }

    iter_cursor(cursor: Position, count: number): void {
        for (let i = 0; i < count; ++i) {
            if (this.iseof(cursor)) {
                break;
            }
            if (this.text[this.cursor.count] === '\n') {
                cursor.row++;
                cursor.col = 0;
            } else {
                cursor.col++;
            }
            cursor.count++;
        }
    }
    backward_iter_cursor(cursor: Position): void {
        if (this.cursor.count - 1 < 0) {
            throw new LexerError(this, 'Trying to backwar before ZEROR');
        }
        if (this.text[this.cursor.count - 1] === '\n') {
            const index = this.text.substring(0, this.cursor.count - 1).lastIndexOf('\n');
            cursor.row--;
            cursor.col = cursor.count - index;
        } else {
            cursor.col--;
        }
        cursor.count--;
    }


    clear_from_tabulations() {
        this.text = this.text.replaceAll('\r', ' ');
        this.text = this.text.replaceAll('\t', ' ');
    }

    ltrim(cursor: Position): void {
        while (!this.iseof(cursor) && isspace(this.at(cursor))) {
            this.iter_cursor(cursor, 1);
        }
    }

    is_equal_to_expr(cursor: Position, expr: string) {
        return cursor.count + expr.length < this.text.length &&
            this.text.substring(this.cursor.count, this.cursor.count + expr.length) === expr;
    }

    at(cursor: Position): string {
        return this.iseof(this.cursor) ?
            throwError(new LexerError(this, "UNCHECKED BOUNDARIES")) :
            this.text[cursor.count] as string;
    }

    iter_while_not_equal(cursor: Position, symbols: string | string[]) {
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


    is_correct_preprocessor(directive: string): Token {
        if (!["#include", "#define", "#if", "#else"].includes(directive)) {
            throw new LexerError(this, `No such preprocessor directive: [${directive}]`);
        }
        return { pos: { ...this.prev_cursor }, type: TokenType.PREPROCESSOR, text: directive };
    }


    substr(prev_cursor: Position, cursor: Position): string {
        return this.text.substring(prev_cursor.count, cursor.count);
    }

    next_token(): Token | undefined {
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

        type Keyword = {
            'return': TokenType,
            'const': TokenType,
            'if': TokenType,
            'else': TokenType,
        };

        const KEYWORDS: Keyword = {
            'return': TokenType.KWD_RETURN, 'const': TokenType.KWD_CONST,
            'if': TokenType.KWD_IF,
            'else': TokenType.KWD_ELSE,
        };

        if (text in KEYWORDS) {
            return {
                pos: { ...this.prev_cursor },
                text,
                type: KEYWORDS[text as keyof Keyword]
            };
        }

        return { pos: { ...this.prev_cursor }, text, type: TokenType.NAME, };
    }

}

const main = (() => {


    const text = readFileSync("./example/main.c").toString();

    const lexer = new Lexer(text);

    let token: Token | undefined;
    let prev;
    let i = 0;

    const tokens = [];

    while (1) {
        token = lexer.next_token();
        if (token === undefined) {
            break;
        }
        token.instance_type = 'token';
        token.pos.instance_type = 'position';

        console.log(`${i++}-th token: ${toString(token)}\n`);
        let cur = toString(token);
        tokens.push(token);


        if (cur === prev) {
            throw new LexerError(lexer, `REPETITION: cur=[${cur}] prev=[${prev}])`);
        }

        prev = cur;
    }

    // console.log(tokens.map((t) => t.text).join(' @\n\r'));

})();


