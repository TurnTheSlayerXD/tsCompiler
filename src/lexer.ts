import { LexerError, ParserError, throwError } from './helper';
import { TokenType } from './token_type';

export class Position {
    instance_type?: string;
    constructor(public row: number, public col: number, public count: number) {
        this.instance_type = 'position';
    }

    toString = (): string => {
        return `${this.row}:${this.col}:${this.count}`;
    }
}

export function toString(obj: Position | Token): string {
    if (obj.instance_type === 'position') {
        return `${(obj as Position).row}:${(obj as Position).col}:${(obj as Position).count}`;
    }
    else if (obj.instance_type === 'token') {
        const tok = (obj as Token);
        return ` [${TokenType[(obj as Token).type]}]  [${tok.type === TokenType.NAME ? tok.text : ''}]  [${toString((obj as Token).pos)}]`;
    }
    const type = obj.instance_type;
    console.log(JSON.stringify(obj));
    throw new Error(`Can't convert object of type [${type}] to string`);
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
    _text: string;
    constructor(pos: Position, text: string, type: TokenType) {
        this.pos = pos;
        this._text = text;
        this.type = type;
        this.instance_type = 'token';
    }

    get text(): string {
        if (this.type !== TokenType.NAME) {
            throw new TokenAccessException(this);
        }
        return this._text;
    }

    set text(text: string) {
        this._text = text;
    }

    toString = (): string => {
        return ` [${TokenType[this.type]}]  [${this.type === TokenType.NAME ? this.text : ''}]  [${this.pos}]`;
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
        return new Token({ ...this.prev_cursor }, directive, TokenType.PREPROCESSOR);
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
        this.prev_cursor = { ...this.cursor };

        if (this.iseof(this.cursor)) {
            return null;
        }

        if (this.at(this.cursor) === '#') {
            this.iter_while_not_equal(this.cursor, ['\n']);
            return new Token({ ...this.cursor }, this.substr(this.prev_cursor, this.cursor), TokenType.PREPROCESSOR);
        }
        if (this.at(this.cursor) === '(') {
            this.iter_cursor(this.cursor, 1);
            return new Token({ ...this.prev_cursor }, '(', TokenType.O_PAREN);
        }
        if (this.at(this.cursor) === ')') {
            this.iter_cursor(this.cursor, 1);
            return new Token({ ...this.prev_cursor }, ')', TokenType.C_PAREN);
        }
        if (this.at(this.cursor) === '{') {
            this.iter_cursor(this.cursor, 1);
            return new Token({ ...this.prev_cursor }, '{', TokenType.O_CURL);
        }
        if (this.at(this.cursor) === '}') {
            this.iter_cursor(this.cursor, 1);
            return new Token({ ...this.prev_cursor }, '}', TokenType.C_CURL);
        }
        if (this.at(this.cursor) === '"') {
            this.iter_cursor(this.cursor, 1);
            this.iter_while_not_equal(this.cursor, '"');
            if (this.iseof(this.cursor)) {
                throw new LexerError(this, `Unmatched quota ["]`);
            }
            this.iter_cursor(this.cursor, 1);
            return new Token({ ...this.prev_cursor }, this.text.substring(this.prev_cursor.count, this.cursor.count), TokenType.STRING_LITERAL);
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
            return new Token({ ...this.prev_cursor }, this.text.substring(this.prev_cursor.count, this.cursor.count), TokenType.CHAR_LITERAL);
        }

        if (this.is_equal_to_expr(this.cursor, '->')) {
            this.iter_cursor(this.cursor, 2);
            return new Token({ ...this.prev_cursor }, '->', TokenType.OP_ARROW);
        }
        if (this.is_equal_to_expr(this.cursor, '==')) {
            this.iter_cursor(this.cursor, 2);
            return new Token({ ...this.prev_cursor }, '.', TokenType.OP_COMP_EQUAL);
        }
        if (this.is_equal_to_expr(this.cursor, '<=')) {
            this.iter_cursor(this.cursor, 2);
            return new Token({ ...this.prev_cursor }, '.', TokenType.OP_COMP_LESS_EQ);
        }
        if (this.is_equal_to_expr(this.cursor, '>=')) {
            this.iter_cursor(this.cursor, 2);
            return new Token({ ...this.prev_cursor }, '>=', TokenType.OP_COMP_GREATER_EQ);
        }


        if (this.at(this.cursor) === '+') {
            this.iter_cursor(this.cursor, 1);
            return new Token({ ...this.prev_cursor }, '+', TokenType.OP_PLUS);
        }
        if (this.at(this.cursor) === '-') {
            this.iter_cursor(this.cursor, 1);
            return new Token({ ...this.prev_cursor }, '-', TokenType.OP_MINUS);
        }
        if (this.at(this.cursor) === ';') {
            this.iter_cursor(this.cursor, 1);
            return new Token({ ...this.prev_cursor }, ';', TokenType.SEMICOLON);
        }
        if (this.at(this.cursor) === '*') {
            this.iter_cursor(this.cursor, 1);
            return new Token({ ...this.prev_cursor }, '*', TokenType.OP_ASTERISK);
        }
        if (this.at(this.cursor) === '/') {
            this.iter_cursor(this.cursor, 1);
            return new Token({ ...this.prev_cursor }, '/', TokenType.OP_DIVIDE);
        }
        if (this.at(this.cursor) === '.') {
            this.iter_cursor(this.cursor, 1);
            return new Token({ ...this.prev_cursor }, '.', TokenType.OP_DOT);
        }
        if (this.at(this.cursor) === ',') {
            this.iter_cursor(this.cursor, 1);
            return new Token({ ...this.prev_cursor }, ',', TokenType.COMMA);
        }

        if (this.at(this.cursor) === '<') {
            this.iter_cursor(this.cursor, 1);
            return new Token({ ...this.prev_cursor }, '<', TokenType.OP_COMP_LESS);
        }
        if (this.at(this.cursor) === '>') {
            this.iter_cursor(this.cursor, 1);
            return new Token({ ...this.prev_cursor }, '>', TokenType.OP_COMP_GREATER);
        }
        if (this.at(this.cursor) === '=') {
            this.iter_cursor(this.cursor, 1);
            return new Token({ ...this.prev_cursor }, '=', TokenType.OP_ASSIGNMENT);
        }

        const STOP_SYMBOLS = [' ', '\n', ',', '.', '+', '-', '*', '/', '(', ')', '{', '}', ';', '=', '==', '<', '>', '->'];

        this.iter_while_not_equal(this.cursor, STOP_SYMBOLS);

        const text = this.text.substring(this.prev_cursor.count, this.cursor.count);
        if (text.match(/^[+-]?\d+$/g) && !this.iseof(this.cursor) && this.at(this.cursor) === '.') {
            this.iter_cursor(this.cursor, 1);
            this.iter_while_not_equal(this.cursor, STOP_SYMBOLS);

            const float_text = this.substr(this.prev_cursor, this.cursor);
            if (/^[+-]?\d+(\.\d+)?$/g.test(float_text)) {
                return new Token({ ...this.prev_cursor }, float_text, TokenType.NUM_FLOAT);
            }
        }

        if (/^[+-]?\d+$/.test(text)) {
            return new Token({ ...this.prev_cursor }, text, TokenType.NUM_INT);
        }

        type Keyword = {
            'return': TokenType,
            // 'const': TokenType,
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
            return new Token({ ...this.prev_cursor }, text, KEYWORDS[text as keyof Keyword]);
        }

        if (!(/^[a-zA-Z]+[0-9]*$/.test(text))) {
            throwError(new LexerError(this, `[${text}] - Incorrect variabler name`));
        }

        return new Token({ ...this.prev_cursor }, text, TokenType.NAME,);
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