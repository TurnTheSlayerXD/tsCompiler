import { findIndex, LexerError, ParserError, throwError, TODO, UNREACHABLE } from "./helper";
import { Lexer, Position } from "./lexer";
import { CharType, FunctionType, IntType, PtrType, Value, ValueType, VoidType } from "./value_types";
import * as fs from 'fs';
import { AddrType } from "./value_types"
import { Scope } from "./scope";



/**
 * 
 * begin_scope1
 * 
 * 990
 * 800
 * 
 * end_scope1
 * 
 * begin_scope2
 * 
 * 1990
 * 1800
 * 
 * 950
 * 900
 * 
 * end_scope2
 * 
 * 
 * begin_scope1 - size = 200
 * 
 * 190
 * 0
 * 
 * end_scope1
 * 
 * begin_scope2 - size = 100
 * 
 * 1990
 * 1800
 * 
 * 50
 * 0
 * 
 * end_scope2
 * 
 */



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

    private _stackPtr: number = this.init_stack_offset;

    get stackPtr(): number {
        return this._stackPtr;
    }

    gen_scope_id(): number {
        return this.scope_id++;
    }

    pushStack(size: number): number {
        const scope = this.scopes.at(-1)!;
        scope.used_space += size;
        this._stackPtr -= size;
        return this._stackPtr;
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
        fs.writeFileSync('./v1.asm', this.asm);

        this.optimize_stack_space();
        fs.writeFileSync('./v2.asm', this.asm);
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
        if (this.scopes.length > 0) {
            this.scopes.push(new Scope(`scope_${this.gen_scope_id()}`, this.scopes.at(-1)!));
        }
        else {
            this.scopes.push(new Scope(`scope_${this.gen_scope_id()}`, null));
        }
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

    *iter_scopes(lines: string[]): Generator<{ scope: Scope, begin: number, end: number }> {
        let begin, prev = 0;
        while ((begin = findIndex(lines, l => l.startsWith('#__begin_'), prev)) !== -1) {
            let end = findIndex(lines, l => l.startsWith('#__end_'), begin);
            prev = end + 1;
            const scope_id = lines[begin]!.split('#__begin_', 2)[1]!;
            const cur_scope = this.dead_scopes.get(scope_id) ?? UNREACHABLE();
            yield { scope: cur_scope, begin, end };
        }
    }

    static parse_rsp_ptr_from_line(cur_line: string): number {
        let i = cur_line.indexOf('(%rsp)');
        i !== -1 || UNREACHABLE();
        let j = cur_line.lastIndexOf(',', i);
        j = j === -1 ? cur_line.lastIndexOf(' ', i) : j;
        j !== -1 && j < i || throwError(new Error(`j=${j}, i=${i} ${cur_line}`));
        j += 1;
        const offset = parseInt(cur_line.substring(j, i).trim());
        !Number.isNaN(offset) || throwError(new Error(`parseInt, line: [${cur_line}]`));
        return offset;
    }
    static replace_rsp_ptr_in_line(lines: string[], c: number, ptr: number): void {
        const cur_line = lines[c]!;
        let i = cur_line.indexOf('(%rsp)');
        i !== -1 || UNREACHABLE();
        let j = cur_line.lastIndexOf(',', i);
        j = j === -1 ? cur_line.lastIndexOf(' ', i) : j;
        j !== -1 && j < i || throwError(new Error(`j=${j}, i=${i} ${cur_line}`));
        j += 1;
        lines[c] = `\r${cur_line.substring(0, j)} ${ptr}${cur_line.substring(i)}`;
    }

    optimize_stack_space() {
        const lines = this.asm.split('\n');
        const mapped_rsp_scope = new Map<number, Scope>();
        const mapped_rsp_loc = new Map<number, { own_offset?: number, size: number }>();
        for (const { scope, begin, end } of this.iter_scopes(lines)) {
            lines.slice(begin, end)
                .filter(l => l.includes('(%rsp)'))
                .map(cur_line => Context.parse_rsp_ptr_from_line(cur_line))
                .forEach(rsp => {
                    if (!mapped_rsp_scope.has(rsp)) {
                        mapped_rsp_scope.set(rsp, scope)
                    }
                });
        }

        let lowest_ptr: number = 1000;
        let ptr: number;
        for (let i = 0; i < lines.length; ++i) {
            const l = lines[i]!;
            if (l.includes('(%rsp)')) {
                ptr = Context.parse_rsp_ptr_from_line(l);
                if (ptr < lowest_ptr) {
                    mapped_rsp_loc.set(ptr, { size: lowest_ptr - ptr });
                    lowest_ptr = ptr;
                }
            }
        }

        for (const { scope, begin, end } of this.iter_scopes(lines)) {
            let i;
            if ((i = findIndex(lines, (l) => l.startsWith('#__init'), begin, end)) !== -1) {
                lines[i + 1] = `\rsubq $${scope.used_space}, %rsp`;
            }
            if ((i = findIndex(lines, (l) => l.startsWith('#__clear'), begin, end)) !== -1) {
                lines[i + 1] = `\raddq $${scope.used_space}, %rsp`;
            }

            for (let l = begin; l < end; ++l) {
                if (lines[l]!.includes('(%rsp)')) {
                    const ptr = Context.parse_rsp_ptr_from_line(lines[l]!);
                    const ptr_scope = mapped_rsp_scope.get(ptr) ?? UNREACHABLE();
                    const loc = mapped_rsp_loc.get(ptr) ?? UNREACHABLE();
                    if (ptr_scope == scope) {
                        if (!loc.own_offset) {
                            scope.cur_offset -= loc.size;
                            loc.own_offset = scope.cur_offset;
                        }
                        [1, 4, 8].includes(loc.size) || UNREACHABLE();
                        Context.replace_rsp_ptr_in_line(lines, l, loc.own_offset);
                    }
                    else {
                        const dist = scope.get_distance_to(ptr_scope);
                        (!!loc.own_offset && loc.own_offset >= 0) || UNREACHABLE();
                        Context.replace_rsp_ptr_in_line(lines, l, dist + (loc.own_offset ?? UNREACHABLE()))
                    }
                }
            }

        }

        this.asm = lines.join('\n');
    }
    // let prev = 0;
    // let begin;
    // while ((begin = findIndex(lines, l => l.startsWith('#__begin_'), prev)) !== -1) {
    //     let end = findIndex(lines, l => l.startsWith('#__end_'), begin);
    //     prev = end + 1;

    //     scope_id === lines[end]!.split('#__end_', 2)[1]! || throwError(`Unmatched scopes: ${begin}, ${end}`);
    //     const cur_scope = this.dead_scopes.get(scope_id) ?? throwError(`No scope with id: ${scope_id}`);

    //     const used_stack_space = String(this.init_stack_offset - cur_scope.stackPtr);

    //     let i;
    //     if ((i = findIndex(lines, (l) => l.startsWith('#__init'), begin, end)) !== -1) {
    //         lines[i + 1] = `\rsubq $${used_stack_space}, %rsp`;
    //     }
    //     if ((i = findIndex(lines, (l) => l.startsWith('#__clear'), begin, end)) !== -1) {
    //         lines[i + 1] = `\raddq $${used_stack_space}, %rsp`;
    //     }

    //     for (let c = begin + 2; c < end; ++c) {
    //         const cur_line: string = lines[c]!;
    //         let i;
    //         console.log(c, cur_line);

    //         if (c === 28) {
    //         }
    //         if ((i = cur_line.indexOf('(%rsp)')) !== -1) {

    //             let j = cur_line.lastIndexOf(',', i);
    //             j = j === -1 ? cur_line.lastIndexOf(' ', i) : j;
    //             j !== -1 && j < i || throwError(new Error(`j=${j}, i=${i} ${cur_line}`));
    //             j += 1;
    //             const offset = parseInt(cur_line.substring(j, i));
    //             !Number.isNaN(offset) || throwError(new Error(`parseInt, line: [${cur_line}]`));
    //             const new_offset = offset - cur_scope.stackPtr;
    //             lines[c] = `${cur_line.substring(0, j)} ${new_offset}${cur_line.substring(i)}`;
    //             prev = c;
    //         }
    //     }
    // }

    // this.asm = lines.join('\n');



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


