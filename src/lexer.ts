import { LexerError, ParserError, throwError } from './helper';
import { TokenType } from './token_type';

export class Position {
    constructor(public row: number, public col: number, public count: number) {
    }

    toString = (): string => {
        return `${this.row}:${this.col}:${this.count}`;
    }

    clone() {
        return new Position(this.row, this.col, this.count);
    }
}

function equal(lhs: Position, rhs: Position): boolean {
    return lhs.count === rhs.count && lhs.row === rhs.row && lhs.col === rhs.col;
}

function not_equal(lhs: Position, rhs: Position): boolean {
    return lhs.count !== rhs.count;
}


export class TokenAccessException extends Error {
    constructor(tok: Token) {
        super(`Cannot access text property of token with type ${TokenType[tok.type]}`);
    }
}

export class Token {
    instance_type?: string;
    pos: Position;
    type: TokenType;
    private _text: string;
    constructor(pos: Position, text: string, type: TokenType) {
        this.pos = pos;
        this._text = text;
        this.type = type;
        this.instance_type = 'token';
    }

    get text(): string {
        if (this.type !== TokenType.NAME
            && this.type !== TokenType.STRING_LITERAL
            && this.type !== TokenType.NUM_INT
            && this.type !== TokenType.NUM_FLOAT) {
            throw new TokenAccessException(this);
        }
        return this._text;
    }

    set text(text: string) {
        this._text = text;
    }

    toString = (): string => {
        return `[${TokenType[this.type]}]  [${this.type === TokenType.NAME || this.type === TokenType.NUM_FLOAT || this.type === TokenType.STRING_LITERAL || this.type === TokenType.NUM_INT ? this.text : ''}]  [${this.pos}]\n`;
    }
}

function TODO(msg: string) {
    throw new Error(`TODO: ${msg}`);
}

function isspace(str: string): boolean {
    return str === ' ' || str === '\n';
}

export class Lexer {
    type?: string = 'lexer';
    cursor: Position = new Position(1, 0, 0);
    prev_cursor: Position = new Position(1, 0, 0);
    text: string;
    constructor(text: string) {
        this.text = text;
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
    slice(cursor: Position, len: number): string {
        if (len === 1) {
            return this.at(cursor);
        }
        return this.text.slice(cursor.count, cursor.count + len < this.text.length ? cursor.count + len : this.text.length);
    }

    iter_while_not_equal_one(cursor: Position, str: string) {
        while (!this.iseof(cursor) && this.slice(cursor, str.length) !== str) {
            this.iter_cursor(cursor, 1);
        }
    }
    iter_while_not_equal_arr(cursor: Position, strs: string[]) {
        while (!this.iseof(cursor) && !strs.some((s) => this.slice(this.cursor, s.length) === s)) {
            this.iter_cursor(cursor, 1);
        }
    }



    is_correct_preprocessor(directive: string): Token {
        if (!["#include", "#define", "#if", "#else"].includes(directive)) {
            throw new LexerError(this, `No such preprocessor directive: [${directive}]`);
        }
        return new Token(this.prev_cursor.clone(), directive, TokenType.PREPROCESSOR);
    }


    substr(prev_cursor: Position, cursor: Position): string {
        return this.text.substring(prev_cursor.count, cursor.count);
    }

    next_token_or_throw(): Token {
        return this.next_token() ?? throwError(new ParserError(this, "Cannot parse"));
    }

    next_token(): Token | null {
        this.ltrim(this.cursor);
        if (this.cursor.count === this.prev_cursor.count && this.cursor.count !== 0) {
            console.warn(`WARNING: spotted unknown sequnce: ${this.substr(this.prev_cursor, this.cursor)}\n`);
            this.iter_cursor(this.cursor, 1);
        }
        this.prev_cursor = this.cursor.clone();

        if (this.iseof(this.cursor)) {
            return null;
        }
        if (this.is_equal_to_expr(this.cursor, '//')) {
            this.iter_while_not_equal_one(this.cursor, '\n');
            return new Token(this.prev_cursor.clone(), '//', TokenType.PREPROCESSOR);
        }
        if (this.is_equal_to_expr(this.cursor, '/*')) {
            this.iter_while_not_equal_one(this.cursor, '*/');
            this.iter_cursor(this.cursor, 2);
            return new Token(this.prev_cursor.clone(), '/**/', TokenType.PREPROCESSOR);
        }
        if (this.at(this.cursor) === '#') {
            this.iter_while_not_equal_one(this.cursor, '\n');
            return new Token(this.prev_cursor.clone(), this.substr(this.prev_cursor, this.cursor), TokenType.PREPROCESSOR);
        }
        if (this.at(this.cursor) === '(') {
            this.iter_cursor(this.cursor, 1);
            return new Token(this.prev_cursor.clone(), '(', TokenType.O_PAREN);
        }
        if (this.at(this.cursor) === ')') {
            this.iter_cursor(this.cursor, 1);
            return new Token(this.prev_cursor.clone(), ')', TokenType.C_PAREN);
        }
        if (this.at(this.cursor) === '{') {
            this.iter_cursor(this.cursor, 1);
            return new Token(this.prev_cursor.clone(), '{', TokenType.O_CURL);
        }
        if (this.at(this.cursor) === '}') {
            this.iter_cursor(this.cursor, 1);
            return new Token(this.prev_cursor.clone(), '}', TokenType.C_CURL);
        }
        if (this.at(this.cursor) === '"') {
            this.iter_cursor(this.cursor, 1);
            this.iter_while_not_equal_one(this.cursor, '"');
            if (this.iseof(this.cursor)) {
                throw new LexerError(this, `Unmatched quota ["]`);
            }
            this.iter_cursor(this.cursor, 1);
            return new Token(this.prev_cursor.clone(), this.text.substring(this.prev_cursor.count + 1, this.cursor.count - 1), TokenType.STRING_LITERAL);
        }
        if (this.at(this.cursor) === '\'') {
            this.iter_cursor(this.cursor, 1);
            this.iter_while_not_equal_one(this.cursor, '"');
            if (this.iseof(this.cursor)) {
                throw new LexerError(this, `Unmatched quota [']`);
            }
            if (this.cursor.count - this.prev_cursor.count < 2) {
                throw new LexerError(this, `Char Quotas cannot contain underline string length less than 1 [${this.text.substring(this.prev_cursor.count, this.cursor.count + 1)}]`);
            }
            this.iter_cursor(this.cursor, 1);
            return new Token(this.prev_cursor.clone(), this.text.substring(this.prev_cursor.count, this.cursor.count), TokenType.CHAR_LITERAL);
        }

        if (this.is_equal_to_expr(this.cursor, '->')) {
            this.iter_cursor(this.cursor, 2);
            return new Token(this.prev_cursor.clone(), '->', TokenType.OP_ARROW);
        }
        if (this.is_equal_to_expr(this.cursor, '==')) {
            this.iter_cursor(this.cursor, 2);
            return new Token(this.prev_cursor.clone(), '.', TokenType.OP_COMP_EQUAL);
        }
        if (this.is_equal_to_expr(this.cursor, '<=')) {
            this.iter_cursor(this.cursor, 2);
            return new Token(this.prev_cursor.clone(), '.', TokenType.OP_COMP_LESS_EQ);
        }
        if (this.is_equal_to_expr(this.cursor, '>=')) {
            this.iter_cursor(this.cursor, 2);
            return new Token(this.prev_cursor.clone(), '>=', TokenType.OP_COMP_GREATER_EQ);
        }
        if (this.is_equal_to_expr(this.cursor, '&&')) {
            this.iter_cursor(this.cursor, 2);
            return new Token(this.prev_cursor.clone(), '&&', TokenType.OP_AND);
        }
        if (this.is_equal_to_expr(this.cursor, '||')) {
            this.iter_cursor(this.cursor, 2);
            return new Token(this.prev_cursor.clone(), '||', TokenType.OP_OR);
        }
        if (this.is_equal_to_expr(this.cursor, '++')) {
            this.iter_cursor(this.cursor, 2);
            return new Token(this.prev_cursor.clone(), '++', TokenType.OP_INCREMENT);
        }
        if (this.is_equal_to_expr(this.cursor, '--')) {
            this.iter_cursor(this.cursor, 2);
            return new Token(this.prev_cursor.clone(), '||', TokenType.OP_DECREMENT);
        }

        if (this.at(this.cursor) === '+') {
            this.iter_cursor(this.cursor, 1);
            return new Token(this.prev_cursor.clone(), '+', TokenType.OP_PLUS);
        }
        if (this.at(this.cursor) === '-') {
            this.iter_cursor(this.cursor, 1);
            return new Token(this.prev_cursor.clone(), '-', TokenType.OP_MINUS);
        }
        if (this.at(this.cursor) === ';') {
            this.iter_cursor(this.cursor, 1);
            return new Token(this.prev_cursor.clone(), ';', TokenType.SEMICOLON);
        }
        if (this.at(this.cursor) === '*') {
            this.iter_cursor(this.cursor, 1);
            return new Token(this.prev_cursor.clone(), '*', TokenType.OP_ASTERISK);
        }
        if (this.at(this.cursor) === '/') {
            this.iter_cursor(this.cursor, 1);
            return new Token(this.prev_cursor.clone(), '/', TokenType.OP_DIVIDE);
        }
        if (this.at(this.cursor) === '.') {
            this.iter_cursor(this.cursor, 1);
            return new Token(this.prev_cursor.clone(), '.', TokenType.OP_DOT);
        }
        if (this.at(this.cursor) === ',') {
            this.iter_cursor(this.cursor, 1);
            return new Token(this.prev_cursor.clone(), ',', TokenType.COMMA);
        }

        if (this.at(this.cursor) === '<') {
            this.iter_cursor(this.cursor, 1);
            return new Token(this.prev_cursor.clone(), '<', TokenType.OP_COMP_LESS);
        }
        if (this.at(this.cursor) === '>') {
            this.iter_cursor(this.cursor, 1);
            return new Token(this.prev_cursor.clone(), '>', TokenType.OP_COMP_GREATER);
        }
        if (this.at(this.cursor) === '=') {
            this.iter_cursor(this.cursor, 1);
            return new Token(this.prev_cursor.clone(), '=', TokenType.OP_ASSIGNMENT);
        }
        if (this.at(this.cursor) === '&') {
            this.iter_cursor(this.cursor, 1);
            return new Token(this.prev_cursor.clone(), '&', TokenType.OP_AMPERSAND);
        }

        const STOP_SYMBOLS = [' ', '\n', ',', '.', '+', '-', '*', '/', '(', ')', '{', '}', ';', '=', '==', '<', '>', '&', '%', '"'];

        this.iter_while_not_equal_arr(this.cursor, STOP_SYMBOLS);

        const text = this.text.substring(this.prev_cursor.count, this.cursor.count);
        if (text.match(/^[+-]?\d+$/g) && !this.iseof(this.cursor) && this.at(this.cursor) === '.') {
            this.iter_cursor(this.cursor, 1);
            this.iter_while_not_equal_arr(this.cursor, STOP_SYMBOLS);

            const float_text = this.substr(this.prev_cursor, this.cursor);
            if (/^[+-]?\d+(\.\d+)?$/g.test(float_text)) {
                return new Token(this.prev_cursor.clone(), float_text, TokenType.NUM_FLOAT);
            }
        }

        if (/^[+-]?\d+$/.test(text)) {
            return new Token(this.prev_cursor.clone(), text, TokenType.NUM_INT);
        }

        type Keyword = {
            'return': TokenType,
            'if': TokenType,
            'else': TokenType,
            'for': TokenType,
            'while': TokenType,
            'const': TokenType,
        };

        const KEYWORDS: Keyword = {
            'return': TokenType.KWD_RETURN,
            'if': TokenType.KWD_IF,
            'else': TokenType.KWD_ELSE,
            'for': TokenType.KWD_FOR,
            'while': TokenType.KWD_WHILE,
            'const': TokenType.KWD_CONST,
        };

        if (text in KEYWORDS) {
            return new Token(this.prev_cursor.clone(), text, KEYWORDS[text as keyof Keyword]);
        }

        if (!(/^[a-zA-Z]+[0-9]*$/.test(text))) {
            throwError(new LexerError(this, `[${text}] - Incorrect variable name`));
        }

        return new Token(this.prev_cursor.clone(), text, TokenType.NAME,);
    }

}


class ArrayLexer extends Lexer {
    iter: number = 0;
    constructor(private tokens: Token[]) {
        super('');
    }

    override next_token_or_throw(): Token {
        return this.tokens[this.iter++] ?? throwError(new LexerError(this, 'Out of tokens'));
    }

    override next_token(): Token | null {
        return this.tokens[this.iter++] ?? null;
    }
}