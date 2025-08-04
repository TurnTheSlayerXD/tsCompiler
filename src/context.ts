import { LexerError, ParserError, throwError, TODO } from "./helper";
import { Lexer, Position } from "./lexer";
import { CharType, FunctionType, IntType, PtrType, Value, ValueType, VoidType } from "./value_types";
import * as fs from 'fs';
import { AddrType } from "./value_types"
export class Context {

    BUILT_IN_TYPES = {
        int: IntType.constructor,
        char: CharType.constructor,
    };

    public scopeValues: (Value[])[] = [[],];
    private scopeTypes: (ValueType[])[] = [[],];
    private literals: string[] = [];
    private asm: string = '';

    private mark_num = 0;

    public stackPtr: number = 1000;

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

    hasTypename(typename: string): ValueType | null {
        switch (typename) {
            case 'int': return IntType.getInstance();
            case 'char': return CharType.getInstance();
            case 'void': return VoidType.getInstance();
            default: return null;
        }
    }

    hasTypenameOrThrow(typename: string): ValueType {
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
        if (this.scopeValues.at(-1)!.find(v => v.name === value.name)) {
            throwError(new Error(`Pushing scope with existing name [${value.name}]`));
        }
        this.scopeValues.at(-1)!.push(value);
    }

    addStringLiteral(literal: string): string {
        if (!this.literals.includes(literal)) {
            this.literals.push(literal);
        }
        return `"_${this.literals.indexOf(literal)}_literal"`;
    }

    hasValue(name: string): Value | null {
        if (name === 'print') {
            return new Value('print', FunctionType.getInstance(VoidType.getInstance(),
                [PtrType.getInstance(CharType.getInstance()), IntType.getInstance()]), new Position(0, 0, 0), null, AddrType.Stack);
        }
        if (name === 'print_int') {
            return new Value('print_int', FunctionType.getInstance(VoidType.getInstance(),
                [PtrType.getInstance(CharType.getInstance()), IntType.getInstance()]), new Position(0, 0, 0), null, AddrType.Stack);
        }
        const { scopeValues } = this;
        for (let i = scopeValues.length - 1; i > -1; --i) {
            const val = scopeValues[i]!.find(val => val.name === name);
            if (!!val) {
                return val;
            }
        }
        return null;
    }

    hasValueOrThrow(name: string): Value {
        return this.hasValue(name) || throwError(new ParserError(this.lexer, `No such value name ${name}`));
    }

    getValueWithTypeOrThrow(name: string, type: ValueType): Value {
        const value = this.hasValueOrThrow(name);
        const expected = value.valueType;
        const found = type;
        return value;
        // return expected.isSameType(type) ? value : throwError(new ParserError(this.lexer, `Unmatched type: expected ${expected}, found ${found}`));
    }

    get mark() {
        return `mark_${this.mark_num}`;
    }

    gen_mark() {
        return `mark_${this.mark_num++}`;
    }

}


