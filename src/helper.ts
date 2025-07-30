import { Lexer, Token } from "./lexer";

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
        super(`Lexer Error at ${lexer.prev_cursor}\n${msg}\n`);
    }
}
export class ParserError extends Error {
    constructor(lexer: Lexer, msg: string) {
        super(`Parser Error at ${lexer.prev_cursor}\n${msg}\n`);
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


export function splitBy<T, U extends (arg0: T) => boolean>(arr: T[], cbk: U): T[][] {
    const arrs: T[][] = [];
    let prev_i = 0;
    for (let i = 0; i < arr.length; ++i) {
        if (cbk(arr[i]!) && i - prev_i > 0) {
            arrs.push(arr.slice(prev_i, i));
            prev_i = i + 1;
        }
    }
    if (arr.length - prev_i > 0) {
        arrs.push(arr.slice(prev_i, arr.length));
    }
    return arrs;
}
