import { LexerError, ParserError, throwError, TODO } from "./helper";
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

    private mark_num = 0;
    private scope_id: number = 0;

    public subq_expr_stack_positions: number[] = [];
    public init_stack_offset = this.stackPtr;

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
                \rsubq $${this.init_stack_offset}, % rsp
            `);
    }


    popScope() {
        this.addAssembly(`
            \r#__end_${this.scopes.at(-1)!.scopeName}
            \raddq $${this.init_stack_offset}, % rsp
        `);
        this.scopes.pop();
        if (this.scopes.length > 0) {
            this.addAssembly(`
                \r#__begin_${this.scopes.at(-1)!.scopeName}
            `);
        }
    }

    optimize_stack_space() {
        const lines = this.asm.split('\n');


        while (true) {
            let s = lines.findLastIndex(l => l.includes('subq'));
            let e = lines.slice(s,).findIndex(l => l.includes('addq'));


            let repl = lines.slice(s, e + 1);

            const min_offset = repl.filter(l => l.includes('(%rsp)')).reduce((s: number, l: string) => {
                let i = l.indexOf('(%rsp)');
                let j = l.lastIndexOf(' ', i);
                const offset = parseInt(l.substring(j + 1, i));
                return offset < s ? offset : s;
            }, 1000);
            const used_stack_space = String(this.init_stack_offset - min_offset);
            repl[0] = `\rsubq $${used_stack_space}, % rsp`;
            repl[repl.length - 1] = `\raddq $${used_stack_space}, % rsp`;


            for (let c = 1; c < repl.length - 1; ++c) {
                const cur_line: string = repl[c]!;
                let i;
                if ((i = cur_line.indexOf('(%rsp)')) !== -1) {
                    let j = cur_line.lastIndexOf(' ', i);
                    j !== -1 && j < i || throwError(new Error(cur_line));
                    j += 1;
                    console.log(`OFFSET: [${cur_line.substring(j, i)}]`);
                    prev = c;
                }
            }
            let c = 0;
            while ((c = lines.slice(prev + 1).findIndex(l => l.includes('(%rsp)'))) !== -1) {
            }

            break;
        }
        lines.findIndex(l)


        let c = lines.findLastIndex(l => l.includes('subq'));
        c !== -1 || throwError(new Error('WTF'));
        lines[c] = `\rsubq $${used_stack_space}, % rsp`;
        let prev = c;
        this.asm = lines.join('\n');

    }


    addScopeType() {
        TODO();
    }

    addAssembly(asm: string) {
        this.asm += asm;
    }

    addScopeValue(value: Value) {
        if (this.scopeValues.at(-1)!.find(v => v.name === value.name)) {
            throwError(new Error(`Pushing scope with existing name[${value.name}]`));
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


