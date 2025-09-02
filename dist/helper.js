"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.RulesError = exports.TypeError = exports.TokenParserError = exports.ParserError = exports.LexerError = exports.TEMP_NAME = void 0;
exports.throwError = throwError;
exports.TODO = TODO;
exports.UNREACHABLE = UNREACHABLE;
exports.splitBy = splitBy;
exports.getMatchingBracket = getMatchingBracket;
exports.iterUntilMatchingBracket = iterUntilMatchingBracket;
exports.convert_string_to_char_codes = convert_string_to_char_codes;
exports.findIndex = findIndex;
exports.filterIndexes = filterIndexes;
exports.toReversed = toReversed;
exports.prettyHtml = prettyHtml;
const token_type_1 = require("./token_type");
function throwError(error = undefined) {
    if (error instanceof Error) {
        throw error;
    }
    else if (typeof error === 'string') {
        throw new Error(error);
    }
    else {
        throw new Error();
    }
}
exports.TEMP_NAME = "_temp";
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
class TypeError extends Error {
    constructor(pos, msg) {
        super(`Type Error at ${pos}\n${msg}\n`);
    }
}
exports.TypeError = TypeError;
class RulesError extends Error {
    constructor(pos, msg) {
        super(`Rule Error at ${pos}\n${msg}\n`);
    }
}
exports.RulesError = RulesError;
function TODO(arg = '') {
    throw new Error(`NOT IMPLEMENTED\n\r${arg}`);
}
function UNREACHABLE(arg = '') {
    throw new Error(`UNREACHABLE ${arg}`);
}
function splitBy(arr, cbk) {
    const arrs = [];
    let prev_i = 0;
    for (let i = 0; i < arr.length; ++i) {
        if (cbk(arr[i])) {
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
function getMatchingBracket(tokens, l_bracket_pos, o_br, c_br) {
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
    throwError(new TokenParserError(tokens[l_bracket_pos], `Unclosed O_PAREN`));
}
function iterUntilMatchingBracket(lexer, initial, o_br, c_br) {
    let counter = 0;
    let tokens = [];
    let token;
    const error = new TokenParserError(initial, `Unclosed BRACKET [${token_type_1.TokenType[o_br]}]`);
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
function convert_string_to_char_codes(str) {
    const codes = [];
    for (let i = 0; i < str.length; ++i) {
        if (str[i] === '\\') {
            i + 1 < str.length || UNREACHABLE();
            const c = str[i + 1];
            codes.push(c === 'n' ? 10 : c === 't' ? 9 : c === 'r' ? 13 : c === '0' ? 0 : UNREACHABLE());
            i += 1;
        }
        else {
            codes.push(str.charCodeAt(i));
        }
    }
    return codes;
}
function findIndex(arr, predicate, start_pos = 0, end_pos = undefined) {
    end_pos = end_pos ?? arr.length;
    for (let i = start_pos; i < end_pos; ++i) {
        if (predicate(arr[i])) {
            return i;
        }
    }
    return -1;
}
function filterIndexes(arr, predicate, start_pos = 0, end_pos = undefined) {
    end_pos = end_pos ?? arr.length;
    const indexes = [];
    for (let i = start_pos; i < end_pos; ++i) {
        if (predicate(arr[i])) {
            indexes.push(i);
        }
    }
    return indexes;
}
function syntaxHighlight(json) {
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 10);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            }
            else {
                cls = 'string';
            }
        }
        else if (/true|false/.test(match)) {
            cls = 'boolean';
        }
        else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}
function* toReversed(arr) {
    for (let i = arr.length - 1; i > -1; --i) {
        yield arr[i];
    }
}
const fs = __importStar(require("fs"));
function prettyHtml(json) {
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
