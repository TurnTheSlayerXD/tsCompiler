import { LexerError, ParserError, throwError } from "./helper";
import { strict } from "assert";
import { error } from "console";
import { readFileSync } from "fs";
import { CursorPos } from "readline";
import { TokenType } from "./token_type";
import { Lexer, Token, toString } from "./lexer"
import { IntType, CharType, VarType, PtrType, Value, FunctionType, ValueType } from "./value_types";




class Context {

    BUILT_IN_TYPES = {
        int: IntType.constructor,
        char: CharType.constructor,
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



const main = () => {


    const text = readFileSync("./example/main.c").toString();

    const lexer = new Lexer(text);

    let token: Token | null;
    let prev;
    let i = 0;

    const tokens = [];

    const context = new Context(lexer);


    const parseDeclarationType = (token: Token): [Token, ValueType] => {
        let type: ValueType;
        let isConst = false;
        let first = token, second = lexer.next_token_or_throw();
        if (first.type === TokenType.KWD_CONST) {
            isConst = true;
            type = context.isFamiliarVarTypeOrThrow(second.text);
            token = lexer.next_token_or_throw();
        } else if (second.type === TokenType.KWD_CONST) {
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
            if (next_token.type === TokenType.KWD_CONST) {
                type.is_const = true;
                next_token = lexer.next_token_or_throw();
            }
            token = next_token;
        }

        return [token, type];
    };
    const parseDeclarationTypeWithName = (token: Token): [Token, Value] => {
        const [next_token, type] = parseDeclarationType(token);
        if (next_token.type !== TokenType.NAME || context.isFamiliarNameInScope(next_token.text)) {
            throwError(new ParserError(lexer, `Token type ${TokenType[next_token.type]}`));
        }
        return [lexer.next_token_or_throw(), new Value(next_token.text, type)];
    }

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

        let decl_type: ValueType;
        [token, decl_type] = parseDeclarationType(token);

        let obj: Value;

        if (token.type === TokenType.O_CURL) {


        }


        if (token.type === TokenType.NAME && !context.isFamiliarNameInScope(token.text)) {
            const name = token.text;
            token = lexer.next_token_or_throw();
            if (token.type === TokenType.O_PAREN) {
                token = lexer.next_token_or_throw();
                let val: Value;
                const fun_params: Value[] = [];
                while (([token, val] = parseDeclarationTypeWithName(token)) && token.type === TokenType.COMMA) {
                    console.log(token, val);
                    fun_params.push(val);
                    token = lexer.next_token_or_throw();
                    if (token.type === TokenType.C_PAREN) {
                        break;
                    }
                }
                const decl_function = new FunctionType(decl_type, fun_params.map(v => v.valueType));
                const new_val = new Value(name, decl_function);
            }
        }



    }
    // console.log(tokens.map((t) => t.text).join(' @\n\r'));

};


try {
    main();
} catch (err: any) {
    console.error(err);
}