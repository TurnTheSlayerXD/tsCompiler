"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenParserError = exports.ParserError = exports.LexerError = void 0;
exports.throwError = throwError;
exports.TODO = TODO;
exports.splitBy = splitBy;
function throwError(error = undefined) {
    if (error instanceof Error) {
        throw error;
    }
    else if (error instanceof String) {
        throw new Error(error);
    }
    else {
        throw new Error();
    }
}
class LexerError extends Error {
    constructor(lexer, msg) {
        super(`Lexer Error at ${lexer.prev_cursor}\n${msg}\n`);
    }
}
exports.LexerError = LexerError;
class ParserError extends Error {
    constructor(lexer, msg) {
        super(`Parser Error at ${lexer.prev_cursor}\n${msg}\n`);
    }
}
exports.ParserError = ParserError;
class TokenParserError extends Error {
    constructor(token, msg) {
        super(`Token Parser Error at ${token.pos}\n${msg}\n`);
    }
}
exports.TokenParserError = TokenParserError;
function TODO() {
    throw new Error("NOT IMPLEMENTED");
}
function splitBy(arr, cbk) {
    const arrs = [];
    let prev_i = 0;
    for (let i = 0; i < arr.length; ++i) {
        if (cbk(arr[i]) && i - prev_i > 0) {
            arrs.push(arr.slice(prev_i, i));
            prev_i = i + 1;
        }
    }
    if (arr.length - prev_i > 0) {
        arrs.push(arr.slice(prev_i, arr.length));
    }
    return arrs;
}
