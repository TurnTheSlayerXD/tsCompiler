import { Context } from './context';
import { ParserError, throwError, TODO, TokenParserError, TypeError, UNREACHABLE } from './helper';
import { Position } from './lexer';

export interface ValueType {
    is_const: boolean;
    toString: () => string;
    isSameType(type: ValueType): boolean;
    size(): number;

    asm_from_literal(context: Context, name: string, literal: string | null, pos: Position): Value;
    asm_copy(context: Context, src: Value, dst_self: Value): void;

    asm_from_plus(context: Context, self: Value, rhs: Value): Value;
    asm_from_minus(context: Context, self: Value, rhs: Value): Value;
    asm_from_multiply(context: Context, self: Value, rhs: Value): Value;
    asm_from_divide(context: Context, self: Value, rhs: Value): Value;

    asm_cmp_less(context: Context, self: Value, rhs: Value): Value;
    asm_cmp_greater(context: Context, self: Value, rhs: Value): Value;
    asm_cmp_equal(context: Context, self: Value, rhs: Value): Value;
    asm_cmp_not_equal(context: Context, self: Value, rhs: Value): Value;

    asm_cmp_less_or_equal(context: Context, self: Value, rhs: Value): Value;
    asm_cmp_greater_or_equal(context: Context, self: Value, rhs: Value): Value;
}

enum MOV_I {
    movl,
    movr
}

enum BIN_I {
    addb,
    addl,
    addq,

    subb,
    subl,
    subq,

    imulb,
    imull,
    imulq,

    idivb,
    idivl,
    idivq,
}
enum REG {
    ax,
    al,
    eax,
    rax,

    dx,
    dh,
    edx,
    rdx,
}

function asm_div_action(context: Context, mov: MOV_I, div: BIN_I,
    eax: REG, edx: REG, ecx: REG, ebx: REG,
    lhs: Value, rhs: Value, size: number) {
    TODO('DIVISION');
}

function asm_bin_action(context: Context, mov: MOV_I, act: BIN_I, reg: REG, lhs: Value, rhs: Value, size: number) {
    if (lhs.addr_type === AddrType.Indirect && rhs.addr_type !== AddrType.Indirect) {
        context.addAssembly(`
                \rmovq ${lhs.address}(%rsp), %rax
                \r${MOV_I[mov]} (%rax), %${REG[reg]}
                \r${BIN_I[act]} ${rhs.address}(%rsp), %${REG[reg]}
                \r${MOV_I[mov]} %${REG[reg]}, ${context.pushStack(size)}(%rsp) 
            `);
    }
    else if (lhs.addr_type !== AddrType.Indirect && rhs.addr_type === AddrType.Indirect) {
        context.addAssembly(`
                \r${MOV_I[mov]} ${lhs.address}(%rsp), %${REG[reg]}
                \rmovq ${rhs.address}(%rsp), %rax
                \r${BIN_I[act]} (%rax), %${REG[reg]}
                \r${MOV_I[mov]} %${REG[reg]}, ${context.pushStack(size)}(%rsp) 
            `);
    }
    else if (lhs.addr_type === AddrType.Indirect && rhs.addr_type === AddrType.Indirect) {
        context.addAssembly(`
                \rmovq ${lhs.address}(%rsp), %rax
                \r${MOV_I[mov]} (%rax), %${REG[reg]}
                \rmovq ${rhs.address}(%rsp), %rax
                \r${BIN_I[act]} (%rax), %${REG[reg]}
                \r${MOV_I[mov]} %${REG[reg]}, ${context.pushStack(size)}(%rsp) 
            `);
    }
    else {
        context.addAssembly(`
                \r${MOV_I[mov]} ${lhs.address}(%rsp), %${REG[reg]}
                \r${BIN_I[act]} ${rhs.address}(%rsp), %${REG[reg]}
                \r${MOV_I[mov]} %${REG[reg]}, ${context.pushStack(size)}(%rsp) 
            `);
    }

}

enum CMP_I {
    jne,
    je,
    jge,
    jle,
    jg,
    jl
}

function asm_comp_action(context: Context, self: Value, rhs: Value, cmp: CMP_I) {
    const mark = context.gen_mark();
    context.pushStack(CharType.getInstance().size());
    context.addAssembly(`
                \rmovl ${self.address}(%rsp), %eax
                \rmovl ${rhs.address}(%rsp), %ebx
                \rmovb $1, ${context.stackPtr}(%rsp) 
                \rcmpl %eax, %ebx
                \r${CMP_I[cmp]} ${mark}
                \rmovb $0, ${context.stackPtr}(%rsp) 
                ${mark}:
            `);
    return new Value('_temp', CharType.getInstance(), self.pos, context.stackPtr, AddrType.Stack);
}


export class IntType implements ValueType {

    static instance: IntType | null = null;
    private constructor() {
    }
    asm_cmp_not_equal(context: Context, self: Value, rhs: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        return asm_comp_action(context, self, rhs, CMP_I.jne);
    }
    asm_cmp_equal(context: Context, self: Value, rhs: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        return asm_comp_action(context, self, rhs, CMP_I.je);
    }
    asm_cmp_less_or_equal(context: Context, self: Value, rhs: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        return asm_comp_action(context, self, rhs, CMP_I.jge);
    }
    asm_cmp_greater_or_equal(context: Context, self: Value, rhs: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        return asm_comp_action(context, self, rhs, CMP_I.jle);
    }
    asm_cmp_greater(context: Context, self: Value, rhs: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        return asm_comp_action(context, self, rhs, CMP_I.jl);
    }
    asm_cmp_less(context: Context, self: Value, rhs: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        return asm_comp_action(context, self, rhs, CMP_I.jg);
    }

    asm_from_plus(context: Context, self: Value, rhs: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        asm_bin_action(context, MOV_I.movl, BIN_I.addl, REG.edx, self, rhs, this.size());
        return new Value('_temp', this, self.pos, context.stackPtr, AddrType.Stack);
    }
    asm_from_minus(context: Context, self: Value, rhs: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        asm_bin_action(context, MOV_I.movl, BIN_I.subl, REG.edx, self, rhs, this.size());
        return new Value('_temp', this, self.pos, context.stackPtr, AddrType.Stack);
    }
    asm_from_multiply(context: Context, self: Value, rhs: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        asm_bin_action(context, MOV_I.movl, BIN_I.imull, REG.edx, self, rhs, this.size());
        return new Value('_temp', this, self.pos, context.stackPtr, AddrType.Stack);
    }
    asm_from_divide(context: Context, self: Value, rhs: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        asm_bin_action(context, MOV_I.movl, BIN_I.idivl, REG.edx, self, rhs, this.size());
        return new Value('_temp', this, self.pos, context.stackPtr, AddrType.Stack);
    }

    isSameType(type: ValueType): boolean {
        return type instanceof IntType;
    }

    static getInstance(): IntType {
        if (!this.instance) {
            this.instance = new IntType();
        }
        return this.instance;
    }

    is_const: boolean = false;
    public toString = (): string => {
        return this.is_const ? "const int" : "int";
    }
    size(): number { return 4; }

    asm_from_literal(context: Context, name: string, literal: string | null, pos: Position): Value {
        const val = new Value(name, this, pos, null, AddrType.Stack);
        context.pushStack(this.size());
        context.addAssembly(`
            \rmovl $${literal ?? 0}, ${context.stackPtr}(%rsp)
            `);
        val.address = context.stackPtr;
        return val;
    }
    asm_create_from_variable(context: Context, name: string, assigned_value: Value, pos: Position): Value {
        const val = new Value(name, this, pos, null, AddrType.Stack);
        if (!this.isSameType(assigned_value.valueType)) {
            throwError(new TypeError(assigned_value.pos, `Can't convert ${assigned_value.valueType} to ${this.toString()}`));
        }
        context.addAssembly(`
            \rmovl ${assigned_value.address}(%rsp), %edx
            \rmovl %edx, ${context.pushStack(this.size())}(%rsp)
            `);
        assigned_value.address = context.stackPtr;
        return val;
    }

    asm_copy(context: Context, src: Value, dst_self: Value): void {
        dst_self.valueType.isSameType(this) || UNREACHABLE();
        if (!this.isSameType(src.valueType)) {
            throwError(new TypeError(src.pos, `Can't convert ${src.valueType} to ${this.toString()}`));
        }
        if (src.addr_type === AddrType.Indirect && dst_self.addr_type !== AddrType.Indirect) {
            context.addAssembly(`
                \rmovq ${src.address}(%rsp), %rax
                \rmovl (%rax), %edx
                \rmovl %edx, ${dst_self.address}(%rsp)
            `);
        }
        else if (src.addr_type !== AddrType.Indirect && dst_self.addr_type === AddrType.Indirect) {
            context.addAssembly(`
                \rmovl ${src.address}(%rsp), %edx
                \rmovq ${dst_self.address}(%rsp), %rax
                \rmovl %edx, (%rax)
            `);
        }
        else if (src.addr_type === AddrType.Indirect && dst_self.addr_type === AddrType.Indirect) {
            context.addAssembly(`
                \rmovq ${src.address}(%rsp), %rax
                \rmovl (%rax), %edx

                \rmovq ${dst_self.address}(%rsp), %rax
                \rmovl %edx, (%rax)
            `);
        }
        else {
            context.addAssembly(`
                \rmovl ${src.address}(%rsp), %edx
                \rmovl %edx, ${dst_self.address}(%rsp)
            `);
        }
    }

}

export class CharType implements ValueType {

    static instance: CharType | null = null;
    private constructor() {
    }
    asm_cmp_less(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_cmp_greater(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_cmp_equal(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_cmp_not_equal(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_cmp_less_or_equal(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_cmp_greater_or_equal(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_from_literal(context: Context, name: string, literal: string | null, pos: Position): Value {
        context.pushStack(this.size());
        context.addAssembly(`
            \rmovb $${literal ?? 0} ${context.stackPtr}(%rsp)
            `);
        return new Value(name, this, pos, context.stackPtr, AddrType.Stack);
    }
    asm_create_from_variable(context: Context, name: string, value: Value, pos: Position): Value {
        if (!this.isSameType(value.valueType)) {
            throwError(new TypeError(value.pos, `Can't convert ${value.valueType} to ${this.toString()}`));
        }
        context.addAssembly(`
            \rmovb ${value.address}(%rsp), %dh
            \rmovb %dh, ${context.pushStack(this.size())}(%rsp)
            `);
        return new Value(name, this, pos, context.stackPtr, AddrType.Stack);
    }
    asm_copy(context: Context, src: Value, dst_self: Value): void {
        dst_self.valueType.isSameType(this) || UNREACHABLE();
        if (!this.isSameType(src.valueType)) {
            throwError(new TypeError(src.pos, `Can't convert ${src.valueType} to ${this.toString()}`));
        }
        context.addAssembly(`
            \rmovb ${src.address}(%rsp), %dh
            \rmovb %dh, ${dst_self.address}(%rsp)
            `);
    }

    asm_from_plus(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_from_minus(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_from_multiply(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_from_divide(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }

    static getInstance(): CharType {
        if (!this.instance) {
            this.instance = new CharType();
        }
        return this.instance;
    }
    isSameType(type: ValueType): boolean {
        return type instanceof CharType;
    }


    is_const: boolean = false;

    public toString = (): string => {
        return this.is_const ? "const char" : "char";
    }

    size(): number { return 1; }
}


export class VoidType implements ValueType {
    static instance: VoidType | null = null;
    private constructor() {
    }
    asm_cmp_less(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_cmp_greater(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_cmp_equal(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_cmp_not_equal(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_cmp_less_or_equal(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_cmp_greater_or_equal(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_copy(context: Context, src: Value, dst_self: Value): void {
        throw new Error('Method not implemented.');
    }
    asm_from_literal(context: Context, name: string, literal: string | null, pos: Position): Value {
        throw new Error('Method not implemented.');
    }
    asm_create_from_variable(context: Context, name: string, value: Value, pos: Position): Value {
        throw new Error('Method not implemented.');
    }
    asm_from_plus(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_from_minus(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_from_multiply(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_from_divide(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_load_to_address_in_rax(context: Context, self: Value, l_value: ValueType): Value {
        throw new Error('Method not implemented.');
    }

    static getInstance(): VoidType {
        if (!this.instance) {
            this.instance = new VoidType();
        }
        return this.instance;
    }

    isSameType(type: ValueType): boolean {
        return type instanceof VoidType;
    }
    is_const: boolean = false;

    public toString = (): string => {
        return "void";
    }

    size(): number { return 1; }
}

export class PtrType implements ValueType {
    private static instances: PtrType[] = [];

    private constructor(public ptrTo: ValueType) { }
    asm_cmp_less(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_cmp_greater(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_cmp_equal(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_cmp_not_equal(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_cmp_less_or_equal(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_cmp_greater_or_equal(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }

    asm_take_reference_from(context: Context, name: string, arg: Value): Value {
        arg.valueType.isSameType(this.ptrTo) || UNREACHABLE();

        if (arg.addr_type === AddrType.Indirect) {
            context.addAssembly(`
                \rmovq ${arg.address}(%rsp), %rax
                \rleaq (%rax), %rdx
                \rmovq %rdx, ${context.pushStack(this.size())}(%rsp)
                `);
        }
        else {
            context.addAssembly(`
                    \rleaq ${arg.address}(%rsp), %rdx
                    \rmovq %rdx, ${context.pushStack(this.size())}(%rsp)
                    `);
        }
        const val = new Value(name, this, arg.pos, context.stackPtr, AddrType.TempStack);
        val.indirect_count -= 1;
        return val;
    }

    asm_dereference(context: Context, name: string, self: Value, is_l_value: boolean): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        if (!is_l_value) {
            context.addAssembly(`
            \rmovq ${self.address}(%rsp), %rax
            \rmovq (%rax), %rdx
            \rmovq %rdx, ${context.pushStack(this.size())}(%rsp)
            `);
            return new Value(name, this.ptrTo, self.pos, context.stackPtr, AddrType.Stack);
        }
        return new Value(name, this.ptrTo, self.pos, self.address, AddrType.Indirect);
    }

    asm_from_literal(context: Context, name: string, literal: string | null, pos: Position): Value {
        if (this.ptrTo.isSameType(CharType.getInstance()) && !!literal) {
            context.addAssembly(`
                    \rmovb $${'\0'.charCodeAt(0)}, ${context.pushStack(CharType.getInstance().size())}(%rsp)
                `);
            for (let i = literal.length - 1; i > -1; --i) {
                context.addAssembly(`
                    \rmovb $${literal.charCodeAt(i)}, ${context.pushStack(CharType.getInstance().size())}(%rsp)
                `);
            }
            context.addAssembly(`
                    \rleaq ${context.stackPtr}(%rsp), %rdx
                `);
            context.addAssembly(`
                    \rmovq %rdx, ${context.pushStack(this.size())}(%rsp) 
                `);
            return new Value(name, this, pos, context.stackPtr, AddrType.Stack);
        }
        if (literal === null) {
            context.addAssembly(`
                    \rmovq $0, ${context.pushStack(this.size())}(%rsp)
                `);
            return new Value(name, this, pos, context.stackPtr, AddrType.Stack);
        }
        TODO();
    }
    asm_create_from_variable(context: Context, name: string, value: Value, pos: Position): Value {
        if (!this.isSameType(value.valueType)) {
            throwError(new TypeError(value.pos, "Cannot assign int from nonint"));
        }
        context.addAssembly(`
            \rmovq ${value.address}(%rsp), %rdx
            \rmovq %rdx, ${context.pushStack(this.size())}(%rsp)
            `);
        return new Value(name, this, pos, context.stackPtr, AddrType.Stack);
    }

    asm_copy(context: Context, src: Value, dst_self: Value): void {
        dst_self.valueType.isSameType(this) || UNREACHABLE();
        this.isSameType(src.valueType) || throwError(new TypeError(src.pos, `Can't convert ${src.valueType} to ${this.toString()}`));
        if (dst_self.addr_type === AddrType.Indirect) {
            context.addAssembly(`
                \rmovq ${dst_self.address}(%rsp), %rax
                \rmovq ${src.address}(%rsp), %rdx
                \rmovq %rdx, (%rax)
                `);
        }
        else {
            context.addAssembly(`
            \rmovq ${src.address}(%rsp), %rdx
            \rmovq %rdx, ${dst_self.address}(%rsp)
            `);
        }
    }

    asm_from_plus(context: Context, self: Value, rhs: Value): Value {
        if (!(rhs.valueType instanceof IntType)) {
            throwError(new TypeError(self.pos, `Cannot sum variables of types {${this}} and {${rhs.valueType}}`));
        }
        context.addAssembly(`
            movq ${self.address}(%rsp), %rdx
            addq ${rhs.address}(%rsp), %rdx
            movq %rdx, ${context.pushStack(this.size())}(%rsp)
        `);
        return new Value('_temp', this, self.pos, context.stackPtr, AddrType.Stack);
    }
    asm_from_minus(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_from_multiply(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_from_divide(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }

    static getInstance(ptrTo: ValueType): PtrType {
        const new_inst = new PtrType(ptrTo);
        const ret = this.instances.find(tp => tp.isSameType(new_inst));
        if (!ret) {
            this.instances.push(new_inst);
        }
        return new_inst;
    }
    isSameType(type: ValueType): boolean {
        if (!(type instanceof PtrType)) {
            return false;
        }
        return this.ptrTo.isSameType(type.ptrTo);
    }

    is_const: boolean = false;

    public toString = (): string => {
        return this.is_const ? `${this.ptrTo.toString()} * const` : `${this.ptrTo.toString()} *`;
    }

    size(): number { return 8; }
}

export class FunctionType implements ValueType {

    private static instances: FunctionType[] = [];

    private constructor(public returnType: ValueType, public paramTypes: ValueType[]) { }
    asm_cmp_less(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_cmp_greater(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_cmp_equal(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_cmp_not_equal(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_cmp_less_or_equal(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_cmp_greater_or_equal(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }

    asm_copy(context: Context, src: Value, dst_self: Value): void {
        throw new Error('Method not implemented.');
    }
    asm_from_literal(context: Context, name: string, literal: string | null, pos: Position): Value {
        throw new Error('Method not implemented.');
    }
    asm_create_from_variable(context: Context, name: string, value: Value, pos: Position): Value {
        throw new Error('Method not implemented.');
    }
    asm_from_plus(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_from_minus(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_from_multiply(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_from_divide(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    static getInstance(returnType: ValueType, paramTypes: ValueType[]): FunctionType {
        const new_inst = new FunctionType(returnType, paramTypes);
        const ret = this.instances.find(tp => tp.isSameType(new_inst));
        if (!ret) {
            this.instances.push(new_inst);
        }
        return this.instances.find(tp => tp.isSameType(new_inst)) ?? throwError(new Error('wtf'));
    }
    isSameType(rhs: ValueType): boolean {
        if (!(rhs instanceof FunctionType)) {
            return false;
        }
        if (!this.returnType.isSameType(rhs.returnType)) {
            return false;
        }
        if (this.paramTypes.length !== rhs.paramTypes.length) {
            return false;
        }
        for (let i = 0; i < this.paramTypes.length; ++i) {
            if (!(this.paramTypes[i]!.isSameType(rhs.paramTypes[i]!))) {
                return false;
            }
        }
        return true;
    }


    is_const: boolean = false;
    public toString = (): string => {
        return `${this.returnType.toString()} (${this.paramTypes.map((p) => p.toString()).join(', ')})`;
    }
    size(): number { return 8; }
}


export enum AddrType {
    TempStack,
    Stack,
    Indirect,
    Register,
}


export class Value {
    private _address: number | null = null;
    public indirect_count: number;

    constructor(public name: string, public valueType: ValueType, public pos: Position, address: number | null = null, public addr_type: AddrType) {
        this._address = address;
        this.indirect_count = 0;
    }

    public toString = (): string => {
        return `Value {\n\rName: [${this.name}]\n\rType: [${this.valueType.toString()}]\n\rAddress: ${this.address}(%rsp)\n\raddr_type: ${AddrType[this.addr_type]}\n\r}`
    }

    get address(): number {
        return this._address || throwError(new Error("Accessed before assigned"));
    }

    set address(address: number) {
        this._address = address;
    }
}
