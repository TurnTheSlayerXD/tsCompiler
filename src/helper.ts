import { Context } from "./context";
import { Lexer, Position, Token } from "./lexer";
import { is_op_token_type, O_BRACES, TokenType } from "./token_type";

export function throwError(error: any | undefined = undefined): never {
    if (error instanceof Error) {
        throw error;
    }
    else if (typeof error === 'string') {
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
        if (cbk(arr[i]!)) {
            arrs.push(arr.slice(prev_i, i));
            prev_i = i + 1;
        }
    }
    if (arr.length - prev_i > 0) {
        arrs.push(arr.slice(prev_i, arr.length));
    }
    else {
        arrs.push([]);
    }
    return arrs;
}

type Closing<T> = T extends TokenType.O_PAREN ? TokenType.C_PAREN :
    T extends TokenType.O_CURL ? TokenType.C_CURL : T extends TokenType.O_SQR ? TokenType.C_SQR : never;


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


export function convert_string_to_char_codes(str: string): number[] {
    const codes: number[] = [];
    for (let i = 0; i < str.length; ++i) {
        if (str[i]! === '\\') {
            i + 1 < str.length || UNREACHABLE();
            const c = str[i + 1]!;
            codes.push(c === 'n' ? 10 : c === 't' ? 9 : c === 'r' ? 13 : c === '0' ? 0 : UNREACHABLE());
            i += 1;
        }
        else {
            codes.push(str.charCodeAt(i));
        }
    }
    return codes;
}

export function findIndex<T>(arr: Array<T>, predicate: (arg: T) => boolean, start_pos: number = 0, end_pos: number | undefined = undefined): number {
    end_pos = end_pos ?? arr.length;
    for (let i = start_pos; i < end_pos; ++i) {
        if (predicate(arr[i]!)) {
            return i;
        }
    }
    return -1;
}

export function filterIndexes<T>(arr: Array<T>, predicate: (arg: T) => boolean, start_pos: number = 0, end_pos: number | undefined = undefined): number[] {
    end_pos = end_pos ?? arr.length;
    const indexes: number[] = [];
    for (let i = start_pos; i < end_pos; ++i) {
        if (predicate(arr[i]!)) {
            indexes.push(i);
        }
    }
    return indexes;
}

export type Category = { exec_order: 'left' | 'right', imp: number }
export function get_token_category(type: TokenType): Category | null {

    let _inc = -1;
    let inc = () => ++_inc;

    inc();
    if ([TokenType.COMMA].includes(type)) return { exec_order: 'left', imp: _inc };
    inc();
    if ([TokenType.OP_ASSIGNMENT, TokenType.OP_ASSIGNMENT_PLUS, TokenType.OP_ASSIGNMENT_MINUS, TokenType.OP_ASSIGNMENT_MULTIPLY, TokenType.OP_ASSIGNMENT_DIVIDE].includes(type)) return { exec_order: 'left', imp: _inc };
    inc();
    if ([TokenType.OP_OR].includes(type)) return { exec_order: 'right', imp: _inc };
    inc();
    if ([TokenType.OP_AND].includes(type)) return { exec_order: 'right', imp: _inc };
    inc();
    if ([TokenType.OP_COMP_GREATER, TokenType.OP_COMP_EQ, TokenType.OP_COMP_NOT_EQ, TokenType.OP_COMP_GREATER_EQ, TokenType.OP_COMP_LESS, TokenType.OP_COMP_LESS_EQ,].includes(type))
        return { exec_order: 'right', imp: _inc }
    inc();
    if ([TokenType.OP_PLUS, TokenType.OP_MINUS].includes(type)) { return { exec_order: 'right', imp: _inc }; }
    inc();
    if ([TokenType.OP_MULTIPLY, TokenType.OP_DIVIDE].includes(type)) return { exec_order: 'right', imp: _inc };
    inc();
    if ([TokenType.OP_PERCENT].includes(type)) return { exec_order: 'right', imp: _inc };
    inc();
    if ([TokenType.OP_REFERENCE, TokenType.OP_DEREFERENCE].includes(type)) return { exec_order: 'left', imp: _inc };
    inc();
    if ([TokenType.O_PAREN, TokenType.O_CURL, TokenType.O_SQR].includes(type)) return { exec_order: 'right', imp: _inc };
    inc();
    if ([TokenType.NAME, TokenType.NUM_INT, TokenType.NUM_FLOAT, TokenType.CHAR_LITERAL, TokenType.STRING_LITERAL, TokenType.DECL_PTR, TokenType.DECL_REF, TokenType.DECL_TYPENAME].includes(type)) return { exec_order: 'right', imp: _inc };
    return null;
}


export function replace_ambigous_token_types(context: Context, tokens: Token[]) {
    for (let i = 0; i < tokens.length; ++i) {
        let cur = tokens[i]!;
        let prev = tokens[i - 1];

        if (cur.type === TokenType.OP_ASTERISK) {
            if (prev && (prev.type === TokenType.NAME && !!context.hasTypename(prev.text)
                || prev.type === TokenType.DECL_PTR || prev.type === TokenType.DECL_TYPENAME)) {
                // then asterics is type modifier
                cur.type = TokenType.DECL_PTR;
            }
            else if ((prev && (is_op_token_type(prev.type) || O_BRACES.includes(prev.type)))
                || i - 1 < 0) {
                // then asterics is dereference
                cur.type = TokenType.OP_DEREFERENCE;
            }
            else {
                // then asterics is multiply
                cur.type = TokenType.OP_MULTIPLY;
            }
        }

        else if (cur.type === TokenType.OP_AMPERSAND) {
            if (prev && (prev.type === TokenType.NAME && !!context.hasTypename(prev.text)
                || prev.type === TokenType.DECL_REF || prev.type === TokenType.DECL_TYPENAME)) {
                // then ampersand is type modifier
                cur.type = TokenType.DECL_REF;
            }
            else if ((prev
                && (is_op_token_type(prev.type) || O_BRACES.includes(prev.type)))
                || i - 1 < 0) {
                // then ampersand is dereference
                cur.type = TokenType.OP_REFERENCE;
            }
            else {
                // then ampersand is logical "plus"
                cur.type = TokenType.OP_LOGICAL_PLUS;
            }
        }
        else if (cur.type === TokenType.NAME && context.hasTypename(cur.text)) {
            cur.type = TokenType.DECL_TYPENAME;
        }

        // if (i + 1 < tokens.length && tokens[i]!.type === TokenType.NAME && tokens[i + 1]!.type === TokenType.O_PAREN) {
        //     tokens[i]!.type = TokenType.FUNC_CALL;
        // }

        // if (i + 1 < tokens.length && tokens[i]!.type === TokenType.NAME && tokens[i + 1]!.type === TokenType.O_SQR) {
        //     tokens[i]!.type = TokenType.SQR_CALL;
        // }

    }
}

function syntaxHighlight(json: any): string {
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 10);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match: string) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

import * as fs from 'fs';
export function prettyHtml(json: any) {
    const str = syntaxHighlight(json);

    const style = `
    <style>
        .key{ color: green; }
        .number{ color: blue; }
        .string{ color: red; }
    </style>
    
    <pre>
${str}
    </pre
    `;

    fs.writeFileSync('./tree.html', style);
}