import { Lexer, Token, toString } from "./lexer";

export function throwError(error: any | undefined = undefined): never {
    if (error instanceof Error) {
        throw error;
    }
    else if (error instanceof String) {
        throw new Error(error as string);
    }
    else {
        throw new Error();
    }
}


export class LexerError extends Error {
    constructor(lexer: Lexer, msg: string) {
        super(`Lexer Error at ${toString(lexer.prev_cursor)}\n${msg}\n`);
    }
}
export class ParserError extends Error {
    constructor(lexer: Lexer, msg: string) {
        super(`Parser Error at ${toString(lexer.prev_cursor)}\n${msg}\n`);
    }
}

export class TokenParserError extends Error {
    constructor(token: Token, msg: string) {
        super(`Token Parser Error at ${token.pos}\n${msg}\n`);
    }
}

export function TODO(): never {
    throw new Error("NOT IMPLEMENTED");
}
