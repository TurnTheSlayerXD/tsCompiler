import { findIndex, LexerError, ParserError, throwError, TODO } from "./helper";
import { Lexer, Position } from "./lexer";
import { CharType, FunctionType, IntType, PtrType, Value, ValueType, VoidType } from "./value_types";
import * as fs from 'fs';
import { AddrType } from "./value_types"
import { Scope } from "./scope";
export class Context {

    BUILT_IN_TYPES = {
        int: IntType.constructor,
        char: CharType.constructor,
    };

    private literals: string[] = [];
    private asm: string = '';
    private dead_scopes = new Map<string, Scope>();
    private mark_num = 0;
    private scope_id: number = 0;

    public subq_expr_stack_positions: number[] = [];
    public init_stack_offset = 1000;

    scopes: Scope[] = [];

    constructor(public lexer: Lexer) { }


    get stackPtr(): number {
        return this.scopes.at(-1)!.stackPtr;
    }

    gen_scope_id(): number {
        return this.scope_id++;
    }

    pushStack(size: number): number {
        this.scopes.at(-1)!.stackPtr -= size;
        return this.scopes.at(-1)!.stackPtr;
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
        this.optimize_stack_space();

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
        if (this.scopes.length > 0) {
            this.addAssembly(`
                \r#__end_${this.scopes.at(-1)!.scopeName}
            `);
        }
        this.scopes.push(new Scope(`scope_${this.gen_scope_id()}`, this.init_stack_offset));
        this.addAssembly(`
                \r#__begin_${this.scopes.at(-1)!.scopeName}
                \r#__init
                \rsubq $${this.init_stack_offset}, %rsp
            `);
    }


    popScope() {
        this.addAssembly(`
            \r#__clear
            \raddq $${this.init_stack_offset}, %rsp
            \r#__end_${this.scopes.at(-1)!.scopeName}
        `);
        const popped = this.scopes.pop()!;
        this.dead_scopes.set(popped.scopeName, popped);
        if (this.scopes.length > 0) {
            this.addAssembly(`
                \r#__begin_${this.scopes.at(-1)!.scopeName}
            `);
        }
    }

    optimize_stack_space() {
        const lines = this.asm.split('\n');

        let prev = 0;
        let begin;
        while ((begin = findIndex(lines, l => l.startsWith('#__begin_'), prev)) !== -1) {
            let end = findIndex(lines, l => l.startsWith('#__end_'), begin);
            prev = end + 1;

            const scope_id = lines[begin]!.split('#__begin_', 2)[1]!;


            scope_id === lines[end]!.split('#__end_', 2)[1]! || throwError(`Unmatched scopes: ${begin}, ${end}`);
            const cur_scope = this.dead_scopes.get(scope_id) ?? throwError(`No scope with id: ${scope_id}`);

            const used_stack_space = String(this.init_stack_offset - cur_scope.stackPtr);

            let i;
            if ((i = findIndex(lines, (l) => l.startsWith('#__init'), begin, end)) !== -1) {
                lines[i + 1] = `\rsubq $${used_stack_space}, %rsp`;
            }
            if ((i = findIndex(lines, (l) => l.startsWith('#__clear'), begin, end)) !== -1) {
                lines[i + 1] = `\raddq $${used_stack_space}, %rsp`;
            }

            for (let c = begin + 2; c < end; ++c) {
                const cur_line: string = lines[c]!;
                let i;
                console.log(c, cur_line);

                if (c === 28) {
                }
                if ((i = cur_line.indexOf('(%rsp)')) !== -1) {

                    let j = cur_line.lastIndexOf(',', i);
                    j = j === -1 ? cur_line.lastIndexOf(' ', i) : j;
                    j !== -1 && j < i || throwError(new Error(`j=${j}, i=${i} ${cur_line}`));
                    j += 1;
                    const offset = parseInt(cur_line.substring(j, i));
                    !Number.isNaN(offset) || throwError(new Error(`parseInt, line: [${cur_line}]`));
                    const new_offset = offset - cur_scope.stackPtr;
                    lines[c] = `${cur_line.substring(0, j)} ${new_offset}${cur_line.substring(i)}`;
                    prev = c;
                }
            }
        }

        this.asm = lines.join('\n');
    }


    addScopeType() {
        TODO();
    }

    addAssembly(asm: string) {
        this.asm += asm;
    }

    addScopeValue(value: Value) {
        const scope = this.scopes.at(-1)!;
        if (scope.scopeValues.find(v => v.name === value.name)) {
            throwError(new Error(`Pushing scope with existing name[${value.name}]`));
        }
        scope.scopeValues.push(value);
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
        const scopeValues = this.scopes.map(s => s.scopeValues);
        for (let i = scopeValues.length - 1; i > -1; --i) {
            const val = scopeValues[i]!.find(val => val.name === name);
            if (!!val) {
                return val;
            }
        }
        return null;
    }

    hasValueOrThrow(name: string): Value {
        return this.hasValue(name) || throwError(new ParserError(this.lexer, `No such value name ${name} `));
    }

    getValueWithTypeOrThrow(name: string, type: ValueType): Value {
        const value = this.hasValueOrThrow(name);
        const expected = value.valueType;
        const found = type;
        return value;
        // return expected.isSameType(type) ? value : throwError(new ParserError(this.lexer, `Unmatched type: expected ${ expected }, found ${ found } `));
    }

    get mark() {
        return `mark_${this.mark_num} `;
    }

    gen_mark() {
        return `mark_${this.mark_num++} `;
    }

}


