import { LexerError, ParserError, throwError } from "./helper";
import { strict } from "assert";
import { error } from "console";
import { readFileSync } from "fs";
import { CursorPos } from "readline";
import { TokenType } from "./token_type";
import { Lexer, Token, toString } from "./lexer"


interface ValueType {
    is_const: boolean;
    canAdd(value: ValueType): string;
    canSubtract(value: ValueType): string;
    canAssignTo(value: ValueType): string;
    toString(): string;
}

class VarType implements ValueType {
    constructor() {
    }

    is_const: boolean = false;
    canAdd(value: ValueType): string {
        throw new Error("Method not implemented.");
    }
    canSubtract(value: ValueType): string {
        throw new Error("Method not implemented.");
    }
    canAssignTo(value: ValueType): string {
        throw new Error("Method not implemented.");
    }

    toString(): string {
        throw new Error("Method not implemented.");
    }
}

class IntType extends VarType {

    override toString(): string {
        return "int";
    }
}

class CharType extends VarType {

    override toString(): string {
        return "char";
    }
}

class PtrType implements ValueType {
    constructor(public ptrTo: ValueType) { }

    is_const: boolean = false;
    canAdd(value: ValueType): string {
        throw new Error("Method not implemented.");
    }
    canSubtract(value: ValueType): string {
        throw new Error("Method not implemented.");
    }
    canAssignTo(value: ValueType): string {
        throw new Error("Method not implemented.");
    }

    toString(): string {
        return `${this.ptrTo.toString()} *`;
    }
}

class FunctionType implements ValueType {
    constructor(public returnType: ValueType, public paramTypes: ValueType) { }

    is_const: boolean = false;
    canAdd(value: ValueType): string {
        throw new Error("Method not implemented.");
    }
    canSubtract(value: ValueType): string {
        throw new Error("Method not implemented.");
    }
    canAssignTo(value: ValueType): string {
        throw new Error("Method not implemented.");
    }
    toString(): string {
        throw new Error("Method not implemented.");
    }
}


class Value {
    constructor(public name: string, public valueType: ValueType) { }
}


class Context {

    BUILT_IN_TYPES = {
        int: IntType.constructor,
    };

    constructor(public lexer: Lexer) { }


    isFamiliarVarType(typename: string): VarType | null {
        if (typename in this.BUILT_IN_TYPES) {
            return (this.BUILT_IN_TYPES[typename as keyof typeof this.BUILT_IN_TYPES] as Function)();
        }
        return null
    }

    isFamiliarVarTypeOrThrow(typename: string): VarType {
        if (typename in this.BUILT_IN_TYPES) {
            return (this.BUILT_IN_TYPES[typename as keyof typeof this.BUILT_IN_TYPES] as Function)();
        }
        throw new ParserError(this.lexer, `Unknown type: [${typename}]`);
    }

    isFamiliarNameInScope(name: string) {
        return false;
    }

}



const main = (() => {


    const text = readFileSync("./example/main.c").toString();

    const lexer = new Lexer(text);

    let token: Token | null;
    let prev;
    let i = 0;

    const tokens = [];

    const context = new Context(lexer);

    while (token = lexer.next_token()) {
        console.log(`${i++}-th token: ${toString(token)}\n`);
        let cur = toString(token);
        tokens.push(token);
        if (cur === prev) {
            throw new LexerError(lexer, `REPETITION: cur=[${cur}] prev=[${prev}])`);
        }
        prev = cur;

        if (token.type === TokenType.PREPROCESSOR) {
            continue;
        }

        const parseDeclarationType = (token: Token): [Token, ValueType] => {
            let type: ValueType;
            let name: string;
            let isConst = false;
            let first = token, second = lexer.next_token_or_throw();
            if (first.text === 'const') {
                isConst = true;
                type = context.isFamiliarVarTypeOrThrow(second.text);
                token = lexer.next_token_or_throw();
            } else if (second.text === 'const') {
                isConst = true;
                type = context.isFamiliarVarTypeOrThrow(first.text);
                token = lexer.next_token_or_throw();
            } else {
                type = context.isFamiliarVarTypeOrThrow(first.text);
                token = second;
            }

            if (isConst) {
                type.is_const = true;
            }

            while (token.type === TokenType.OP_ASTERISK) {
                type = new PtrType(type);
                let next_token = lexer.next_token_or_throw();
                if (next_token.text === 'const') {
                    type.is_const = true;
                    next_token = lexer.next_token_or_throw();
                }
                token = next_token;
            }
            token = lexer.next_token_or_throw();
            return [token, type];
        };

        const parseDeclarationTypeWithName = (token: Token): [Token, Value] => {
            const [next_token, type] = parseDeclarationType(token);
            if (next_token.type !== TokenType.NAME || context.isFamiliarNameInScope(next_token.text)) {
                throwError(new ParserError(lexer, `Declared name ${next_token.text}`));
            }
            return [lexer.next_token_or_throw(), new Value(next_token.text, type)];
        }

        let type: ValueType;
        [token, type] = parseDeclarationType(token);

        let obj: Value;

        if (token.type === TokenType.NAME && !context.isFamiliarNameInScope(token.text)) {
            let name = token.text;

            token = lexer.next_token_or_throw();
            if (token.type === TokenType.O_PAREN) {
                token = lexer.next_token_or_throw();
                let val: Value;
                while (([token, val] = parseDeclarationTypeWithName(token)) && token.type === TokenType.COMMA) {
                    token = lexer.next_token_or_throw();
                    if(token.type === TokenType.C_PAREN){
                        break;
                    }
                }
                

            }

        }
    }
    // console.log(tokens.map((t) => t.text).join(' @\n\r'));

}

)();


