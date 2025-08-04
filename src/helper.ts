import { Lexer, Position, Token } from "./lexer";
import { TokenType } from "./token_type";

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


export class TypeError extends Error {
    constructor(pos: Position, msg: string) {
        super(`Type Error at ${pos}\n${msg}\n`);
    }
}

export class RulesError extends Error {
    constructor(pos: Position, msg: string) {
        super(`Rule Error at ${pos}\n${msg}\n`);
    }
}



export function TODO(arg: string = ''): never {
    throw new Error(`NOT IMPLEMENTED\n\r${arg}`);
}

export function UNREACHABLE(arg: string = ''): never {
    throw new Error(`UNREACHABLE ${arg}`);
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

type Closing<T> = T extends TokenType.O_PAREN ? TokenType.C_PAREN :
    T extends TokenType.O_CURL ? TokenType.C_CURL : never;


export function getMatchingBracket<T extends TokenType>(tokens: Token[], l_bracket_pos: number, o_br: T, c_br: Closing<T>): number {
    let help = 0;
    const types = tokens.map(t => t.type);
    for (let i = l_bracket_pos + 1; i < types.length; ++i) {
        if (types[i] === o_br) {
            help += 1;
        }
        else if (types[i] === c_br) {
            if (help === 0) {
                return i;
            }
            help -= 1;
        }
    }
    throwError(new TokenParserError(tokens[l_bracket_pos]!, `Unclosed O_PAREN`));
}

export function iterUntilMatchingBracket<T extends TokenType>(lexer: Lexer, initial: Token, o_br: T, c_br: Closing<T>): Token[] {
    let counter = 0;
    let tokens: Token[] = [];
    let token;
    const error = new TokenParserError(initial, `Unclosed BRACKET [${TokenType[o_br]}]`);
    while ((token = lexer.next_token())) {
        if (token.type === o_br) {
            counter += 1;
        }
        else if (token.type === c_br) {
            if (counter === 0) {
                return tokens;
            }
            counter -= 1;
        }
        tokens.push(token);
    }
    throwError(error);
}


