import { ParserError, TODO } from "./helper";
import { Lexer } from "./lexer";
import { CharType, FunctionType, IntType, PtrType, Value, ValueType, VoidType } from "./value_types";

export class Context {

    BUILT_IN_TYPES = {
        int: IntType.constructor,
        char: CharType.constructor,
    };

    private scopeValues: (Value[])[] = [[],];
    private scopeTypes: (ValueType[])[] = [[],];
    private literals: string[] = [];

    public stackPtr: number = 100;

    constructor(public lexer: Lexer) { }


    isFamiliarTypename(typename: string): ValueType | null {
        switch (typename) {
            case 'int': return IntType.getInstance();
            case 'char': return CharType.getInstance();
            case 'void': return VoidType.getInstance();
            default: return null;
        }
    }

    isFamiliarTypenameOrThrow(typename: string): ValueType {
        if (typename in this.BUILT_IN_TYPES) {
            return (this.BUILT_IN_TYPES[typename as keyof typeof this.BUILT_IN_TYPES] as Function)();
        }
        throw new ParserError(this.lexer, `Unknown type: [${typename}]`);
    }

    pushScope() {
        this.scopeValues.push([]);
        this.scopeTypes.push([]);
    }

    popScope() {
        this.scopeValues.pop();
        this.scopeTypes.pop();
    }

    addScopeType() {
        TODO();
    }

    addScopeValue(value: Value) {
        this.scopeValues.at(-1)!.push(value);
    }


    addStringLiteral(literal: string) {
        if (!this.literals.includes(literal)) {
            this.literals.push(literal);
        }
    }

    isFamiliarValueName(name: string): Value | null {
        if (name === 'GetStdHandle') {
            return new Value('*__imp_GetStdHandle', FunctionType.getInstance(PtrType.getInstance(VoidType.getInstance()),
                []));
        }
        else if (name === 'WriteConsole') {
            return new Value('*__imp_WriteConsoleA', FunctionType.getInstance(
                IntType.getInstance(),
                [
                    PtrType.getInstance(VoidType.getInstance()),
                    PtrType.getInstance(VoidType.getInstance()),
                    IntType.getInstance(),
                    PtrType.getInstance(IntType.getInstance()),
                    PtrType.getInstance(VoidType.getInstance()),
                ]));
        }
        return null;
    }

}


