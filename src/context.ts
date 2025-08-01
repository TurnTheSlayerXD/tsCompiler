import { LexerError, ParserError, throwError, TODO } from "./helper";
import { Lexer, Position } from "./lexer";
import { CharType, FunctionType, IntType, PtrType, Value, ValueType, VoidType } from "./value_types";
import * as fs from 'fs';
export class Context {

    BUILT_IN_TYPES = {
        int: IntType.constructor,
        char: CharType.constructor,
    };

    private scopeValues: (Value[])[] = [[],];
    private scopeTypes: (ValueType[])[] = [[],];
    private literals: string[] = [];
    private asm: string = '';


    public stackPtr: number = 100;

    public init_stack_offset = this.stackPtr;

    constructor(public lexer: Lexer) { }


    pushStack(size: number): number {
        this.stackPtr -= size;
        return this.stackPtr;
    }

    getLiteralsAsm() {
        return this.literals.map((l, index) => `"_${index}_literal":
                                            .asciz: "${l}"\n`).join('\n');
    }

    getAsm(): string {
        return this.asm;
    }

    asmToFile(filename: string) {
        this.asm = this.asm.replaceAll(/\s*\n\s*/g, '\n');
        fs.writeFileSync(filename, this.asm);
    }

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

    addAssembly(asm: string) {
        this.asm += asm;
    }

    addScopeValue(value: Value) {
        this.scopeValues.at(-1)!.push(value);
    }

    addStringLiteral(literal: string): string {
        if (!this.literals.includes(literal)) {
            this.literals.push(literal);
        }
        return `"_${this.literals.indexOf(literal)}_literal"`;
    }

    isFamiliarValueName(name: string): Value | null {
        if (name === 'print') {
            return new Value('print', FunctionType.getInstance(VoidType.getInstance(),
                [PtrType.getInstance(CharType.getInstance()), IntType.getInstance()]), new Position(0, 0, 0));
        }
        return null;
    }

    isFamiliarValueNameOrThrow(name: string): Value {
        return this.isFamiliarValueName(name) || throwError(new ParserError(this.lexer, `No such value name ${name}`));
    }

    getValueWithTypeOrThrow(name: string, type: ValueType): Value {
        const value = this.isFamiliarValueNameOrThrow(name);
        const expected = value.valueType;
        const found = type;
        return expected.isSameType(type) ? value : throwError(new ParserError(this.lexer, `Unmatched type: expected ${expected}, found ${found}`));
    }

    getValueByName(name: string): Value | null {
        return this.scopeValues.at(-1)!.find(val => val.name === name) ?? null;
    }
}


