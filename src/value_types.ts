import { Context } from './context';
import { are_converible_types, convert_values } from './converter';
import { convert_string_to_char_codes, ParserError, RulesError, throwError, TODO, TokenParserError, TypeError, UNREACHABLE } from './helper';
import { Position } from './lexer';

export interface ValueType {
    is_const: boolean;
    toString: () => string;
    isSameType(type: ValueType): boolean;
    get size(): number;

    asm_from_literal(context: Context, name: string, literal: string | null, pos: Position): Value;
    asm_copy(context: Context, dst: Value, src: Value): void;

    asm_from_plus(context: Context, self: Value, rhs: Value): Value;
    asm_from_minus(context: Context, self: Value, rhs: Value): Value;
    asm_from_multiply(context: Context, self: Value, rhs: Value): Value;
    asm_from_divide(context: Context, self: Value, rhs: Value): Value;
    asm_from_percent(context: Context, self: Value, rhs: Value): Value;

    asm_cmp_less(context: Context, self: Value, rhs: Value): Value;
    asm_cmp_greater(context: Context, self: Value, rhs: Value): Value;
    asm_cmp_equal(context: Context, self: Value, rhs: Value): Value;
    asm_cmp_not_equal(context: Context, self: Value, rhs: Value): Value;

    asm_cmp_less_or_equal(context: Context, self: Value, rhs: Value): Value;
    asm_cmp_greater_or_equal(context: Context, self: Value, rhs: Value): Value;

    asm_to_boolean(context: Context, self: Value): Value;

    get reg_i(): REG_I;
    get mov_i(): MOV_I;
}

export enum MOV_I {
    movl,
    movr,
    movb,
    movq,
}

export enum BIN_I {
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
export enum REG_I {
    ax,
    al,
    eax,
    rax,

    dh,
    edx,
    rdx,

    cx,
    ch,
    ecx,
    rcx
}


export enum CMP_I {
    cmpl,
    cmpq,
    cmpb
}


function asm_div_action(context: Context, mov: MOV_I, div: BIN_I,
    eax: REG_I, edx: REG_I, ecx: REG_I, ebx: REG_I,
    lhs: Value, rhs: Value, size: number) {
    TODO('DIVISION');
}
function asm_to_boolean(context: Context, self: Value, cmp_i: CMP_I): Value {
    const self_addr = self.stack_addr(context);
    const result_addr = context.pushStack(CharType.getInstance().size);
    const mark_if_true = context.gen_mark();
    context.addAssembly(`
                \rmovb $1, ${result_addr}(%rsp)
                \r${CMP_I[cmp_i]} $0, ${self_addr}(%rsp)
                \rjne ${mark_if_true}
                \rmovb $0, ${result_addr}(%rsp)
                ${mark_if_true}:
            `);
    return new Value('_temp', CharType.getInstance(), self.pos, result_addr, AddrType.Stack);
}

function asm_bin_action(context: Context, mov: MOV_I, act: BIN_I, reg: REG_I, lhs: Value, rhs: Value, size: number): number {
    const lhs_addr = lhs.stack_addr(context);
    const rhs_addr = rhs.stack_addr(context);
    context.addAssembly(`
                \r${MOV_I[mov]} ${lhs_addr}(%rsp), %${REG_I[reg]}
                \r${BIN_I[act]} ${rhs_addr}(%rsp), %${REG_I[reg]}
                \r${MOV_I[mov]} %${REG_I[reg]}, ${context.pushStack(size)}(%rsp) 
            `);
    return context.stackPtr;
}

enum JN_I {
    jne,
    je,
    jge,
    jle,
    jg,
    jl,
}

function asm_comp_action_l(context: Context, self: Value, rhs: Value, jn: JN_I) {
    const mark = context.gen_mark();
    const bool_addr = context.pushStack(CharType.getInstance().size);
    const self_addr = self.stack_addr(context);
    const rhs_addr = rhs.stack_addr(context);
    context.addAssembly(`
                \rmovl ${self_addr}(%rsp), %eax
                \rmovl ${rhs_addr}(%rsp), %ebx
                \rmovb $1, ${bool_addr}(%rsp) 
                \rcmpl %eax, %ebx
                \r${JN_I[jn]} ${mark}
                \rmovb $0, ${bool_addr}(%rsp) 
                ${mark}:
            `);

    return new Value('_temp', CharType.getInstance(), self.pos, bool_addr, AddrType.Stack);
}
function asm_comp_action_b(context: Context, self: Value, rhs: Value, jn: JN_I) {
    const mark = context.gen_mark();
    const bool_addr = context.pushStack(CharType.getInstance().size);
    const self_addr = self.stack_addr(context);
    const rhs_addr = rhs.stack_addr(context);
    context.addAssembly(`
                \rmovb ${self_addr}(%rsp), %ah
                \rmovb ${rhs_addr}(%rsp), %al
                \rmovb $1, ${bool_addr}(%rsp) 
                \rcmpb %ah, %al
                \r${JN_I[jn]} ${mark}
                \rmovb $0, ${bool_addr}(%rsp) 
                ${mark}:
            `);

    return new Value('_temp', CharType.getInstance(), self.pos, bool_addr, AddrType.Stack);
}

function asm_comp_action_q(context: Context, self: Value, rhs: Value, jn: JN_I) {
    const mark = context.gen_mark();
    const bool_addr = context.pushStack(CharType.getInstance().size);
    const self_addr = self.stack_addr(context);
    const rhs_addr = rhs.stack_addr(context);
    context.addAssembly(`
                \rmovq ${self_addr}(%rsp), %rax
                \rmovq ${rhs_addr}(%rsp), %rbx
                \rmovb $1, ${bool_addr}(%rsp) 
                \rcmpq %rax, %rbx
                \r${JN_I[jn]} ${mark}
                \rmovb $0, ${bool_addr}(%rsp) 
                ${mark}:
            `);

    return new Value('_temp', CharType.getInstance(), self.pos, bool_addr, AddrType.Stack);
}




export class IntType implements ValueType {
    is_const: boolean = false;
    static instance: IntType | null = null;

    private constructor() {
    }


    asm_to_boolean(context: Context, self: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        return asm_to_boolean(context, self, CMP_I.cmpl);
    }
    get reg_i(): REG_I {
        return REG_I.edx;
    }
    get size(): number {
        return 4;
    }
    get mov_i(): MOV_I {
        return MOV_I.movl;
    }
    asm_cmp_not_equal(context: Context, self: Value, rhs: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        const { ok, left, right } = convert_values(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_cmp_not_equal(context, left, right);
        }
        return asm_comp_action_l(context, self, rhs, JN_I.jne);
    }
    asm_cmp_equal(context: Context, self: Value, rhs: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        const { ok, left, right } = convert_values(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_cmp_equal(context, left, right);
        }
        return asm_comp_action_l(context, self, rhs, JN_I.je);
    }
    asm_cmp_less_or_equal(context: Context, self: Value, rhs: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        const { ok, left, right } = convert_values(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_cmp_less_or_equal(context, left, right);
        }
        return asm_comp_action_l(context, self, rhs, JN_I.jge);
    }
    asm_cmp_greater_or_equal(context: Context, self: Value, rhs: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        const { ok, left, right } = convert_values(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_cmp_greater_or_equal(context, left, right);
        }
        return asm_comp_action_l(context, self, rhs, JN_I.jle);
    }
    asm_cmp_greater(context: Context, self: Value, rhs: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        const { ok, left, right } = convert_values(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_cmp_greater(context, left, right);
        }
        return asm_comp_action_l(context, self, rhs, JN_I.jl);
    }
    asm_cmp_less(context: Context, self: Value, rhs: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        const { ok, left, right } = convert_values(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_cmp_less(context, left, right);
        }
        return asm_comp_action_l(context, self, rhs, JN_I.jg);
    }

    asm_from_plus(context: Context, self: Value, rhs: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        const { ok, left, right } = convert_values(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_from_plus(context, left, right);
        }
        const stack_addr = asm_bin_action(context, MOV_I.movl, BIN_I.addl, REG_I.edx, self, rhs, this.size);
        return new Value('_temp', this, self.pos, stack_addr, AddrType.Stack);
    }
    asm_from_minus(context: Context, self: Value, rhs: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        const { ok, left, right } = convert_values(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_from_minus(context, left, right);
        }
        const stack_addr = asm_bin_action(context, MOV_I.movl, BIN_I.subl, REG_I.edx, self, rhs, this.size);
        return new Value('_temp', this, self.pos, stack_addr, AddrType.Stack);
    }
    asm_from_multiply(context: Context, self: Value, rhs: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        const { ok, left, right } = convert_values(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_from_multiply(context, left, right);
        }
        context.addAssembly(`
                    \rmovl ${self.stack_addr(context)}(%rsp), %eax
                    \rimull ${rhs.stack_addr(context)}(%rsp)
                    \rmovl %eax, ${context.pushStack(this.size)}(%rsp)
                `);
        return new Value('_temp', this, self.pos, context.stackPtr, AddrType.Stack);
    }
    asm_from_divide(context: Context, self: Value, rhs: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        const { ok, left, right } = convert_values(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_from_divide(context, left, right);
        }
        context.addAssembly(`
                \rmovl ${self.stack_addr(context)}(%rsp), %eax
                \rcdq
                \ridivl ${rhs.stack_addr(context)}(%rsp) 
                \rmovl %eax, ${context.pushStack(this.size)}(%rsp)
            `);
        return new Value('_temp', this, self.pos, context.stackPtr, AddrType.Stack);
    }
    asm_from_percent(context: Context, self: Value, rhs: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        const { ok, left, right } = convert_values(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_from_percent(context, left, right);
        }
        context.addAssembly(`
                \rmovl ${self.stack_addr(context)}(%rsp), %eax
                \rcdq
                \ridivl ${rhs.stack_addr(context)}(%rsp) 
                \rmovl %edx, ${context.pushStack(this.size)}(%rsp)
            `);
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

    public toString = (): string => {
        return this.is_const ? "const int" : "int";
    }

    asm_from_literal(context: Context, name: string, literal: string | null, pos: Position): Value {
        context.pushStack(this.size);
        context.addAssembly(`
            \rmovl $${literal ?? 0}, ${context.stackPtr}(%rsp)
            `);
        return new Value(name, this, pos, context.stackPtr, AddrType.Stack);
    }
    asm_copy(context: Context, dst: Value, src: Value): void {
        dst.valueType.isSameType(this) || UNREACHABLE();
        if (!are_converible_types(src.valueType, dst.valueType)) {
            throwError(new TypeError(src.pos, `Can't convert ${src.valueType} to ${this.toString()}`));
        }
        const src_addr = src.stack_addr(context);
        const dst_addr = dst.real_addr;
        if (dst.addr_type === AddrType.Indirect) {
            context.addAssembly(`
                \rmovq ${dst_addr}(%rsp), %rax
                \rmovl ${src_addr}(%rsp), %edx
                \rmovl %edx, (%rax)
            `);
        } else {
            context.addAssembly(`
                \rmovl ${src_addr}(%rsp), %edx
                \rmovl %edx, ${dst_addr}(%rsp)
            `);
        }
    }

}

export class CharType implements ValueType {

    static instance: CharType | null = null;
    get mov_i(): MOV_I {
        return MOV_I.movb;
    }
    private constructor() {
    }

    get reg_i(): REG_I {
        return REG_I.dh;
    }
    asm_to_boolean(context: Context, self: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        return asm_to_boolean(context, self, CMP_I.cmpb);
    }
    asm_cmp_not_equal(context: Context, self: Value, rhs: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        const { ok, left, right } = convert_values(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_cmp_not_equal(context, left, right);
        }
        return asm_comp_action_b(context, self, rhs, JN_I.jne);
    }
    asm_cmp_equal(context: Context, self: Value, rhs: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        const { ok, left, right } = convert_values(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_cmp_equal(context, left, right);
        }
        return asm_comp_action_b(context, self, rhs, JN_I.je);
    }
    asm_cmp_less_or_equal(context: Context, self: Value, rhs: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        const { ok, left, right } = convert_values(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_cmp_less_or_equal(context, left, right);
        }
        return asm_comp_action_b(context, self, rhs, JN_I.jge);
    }
    asm_cmp_greater_or_equal(context: Context, self: Value, rhs: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        const { ok, left, right } = convert_values(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_cmp_greater_or_equal(context, left, right);
        }
        return asm_comp_action_b(context, self, rhs, JN_I.jle);
    }
    asm_cmp_greater(context: Context, self: Value, rhs: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        const { ok, left, right } = convert_values(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_cmp_greater(context, left, right);
        }
        return asm_comp_action_b(context, self, rhs, JN_I.jl);
    }
    asm_cmp_less(context: Context, self: Value, rhs: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        const { ok, left, right } = convert_values(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_cmp_less(context, left, right);
        }
        return asm_comp_action_b(context, self, rhs, JN_I.jg);
    }

    asm_from_literal(context: Context, name: string, literal: string | null, pos: Position): Value {
        context.pushStack(this.size);
        const code: number[] = !!literal ? convert_string_to_char_codes(literal) : [0];
        if (code.length > 1) {
            throwError(new RulesError(pos, `Char type Literal [${literal}] cannot be multichracter`));
        }
        context.addAssembly(`
            \rmovb $${code[0]!}, %ah
            \rmovb %ah, ${context.stackPtr}(%rsp)
            `);
        return new Value(name, this, pos, context.stackPtr, AddrType.Stack);
    }

    asm_copy(context: Context, dst: Value, src: Value): void {
        dst.valueType.isSameType(this) || UNREACHABLE();
        if (!are_converible_types(src.valueType, dst.valueType)) {
            throwError(new TypeError(src.pos, `Can't convert ${src.valueType} to ${this.toString()}`));
        }
        const src_addr = src.stack_addr(context);
        const dst_addr = dst.real_addr;
        if (dst.addr_type === AddrType.Indirect) {
            context.addAssembly(`
                \rmovq ${dst_addr}(%rsp), %rax
                \rmovb ${src_addr}(%rsp), %dh
                \rmovb %dh, (%rax)
            `);
        } else {
            context.addAssembly(`
                \rmovb ${src_addr}(%rsp), %dh
                \rmovb %dh, ${dst_addr}(%rsp)
            `);
        }
    }

    asm_from_plus(context: Context, self: Value, rhs: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        const { ok, left, right } = convert_values(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_from_plus(context, left, right);
        }
        const stack_addr = asm_bin_action(context, MOV_I.movb, BIN_I.addb, REG_I.dh, self, rhs, this.size);
        return new Value('_temp', this, self.pos, stack_addr, AddrType.Stack);
    }
    asm_from_minus(context: Context, self: Value, rhs: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        const { ok, left, right } = convert_values(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_from_minus(context, left, right);
        }
        const stack_addr = asm_bin_action(context, MOV_I.movb, BIN_I.subb, REG_I.dh, self, rhs, this.size);
        return new Value('_temp', this, self.pos, stack_addr, AddrType.Stack);
    }
    asm_from_multiply(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_from_divide(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_from_percent(context: Context, self: Value, rhs: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        context.addAssembly(`
                \rmovb ${self.stack_addr(context)}(%rsp), %ax
                \rcbw
                \ridivb ${rhs.stack_addr(context)}(%rsp) 
                \rmovb %dx, ${context.pushStack(this.size)}
            `);
        return new Value('_temp', this, self.pos, context.stackPtr, AddrType.Stack);
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
    get size(): number {
        return 1;
    }
    public toString = (): string => {
        return this.is_const ? "const char" : "char";
    }

}


export class VoidType implements ValueType {
    static instance: VoidType | null = null;
    private constructor() {
    }
    asm_from_percent(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_to_boolean(context: Context, self: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        TODO();
    }
    get reg_i(): REG_I {
        throw new Error('Method not implemented.');
    }
    get mov_i(): MOV_I {
        throw new Error('Method not implemented.');
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


    get size(): number { return 1; }
}

export class PtrType implements ValueType {
    private static instances: PtrType[] = [];

    private constructor(public ptrTo: ValueType) { }
    asm_from_percent(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    get reg_i(): REG_I {
        return REG_I.rdx;
    }
    get mov_i(): MOV_I {
        return MOV_I.movq;
    }
    asm_to_boolean(context: Context, self: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        return asm_to_boolean(context, self, CMP_I.cmpq);
    }
    asm_cmp_not_equal(context: Context, self: Value, rhs: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        const { ok, left, right } = convert_values(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_cmp_not_equal(context, left, right);
        }
        return asm_comp_action_q(context, self, rhs, JN_I.jne);
    }
    asm_cmp_equal(context: Context, self: Value, rhs: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        const { ok, left, right } = convert_values(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_cmp_equal(context, left, right);
        }
        return asm_comp_action_q(context, self, rhs, JN_I.je);
    }
    asm_cmp_less_or_equal(context: Context, self: Value, rhs: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        const { ok, left, right } = convert_values(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_cmp_less_or_equal(context, left, right);
        }
        return asm_comp_action_q(context, self, rhs, JN_I.jge);
    }
    asm_cmp_greater_or_equal(context: Context, self: Value, rhs: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        const { ok, left, right } = convert_values(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_cmp_greater_or_equal(context, left, right);
        }
        return asm_comp_action_q(context, self, rhs, JN_I.jle);
    }
    asm_cmp_greater(context: Context, self: Value, rhs: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        const { ok, left, right } = convert_values(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_cmp_greater(context, left, right);
        }
        return asm_comp_action_q(context, self, rhs, JN_I.jl);
    }
    asm_cmp_less(context: Context, self: Value, rhs: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        const { ok, left, right } = convert_values(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_cmp_less(context, left, right);
        }
        return asm_comp_action_q(context, self, rhs, JN_I.jg);
    }

    asm_take_reference_from(context: Context, name: string, arg: Value): Value {
        arg.valueType.isSameType(this.ptrTo) || UNREACHABLE();

        if (arg.addr_type === AddrType.Indirect) {
            context.addAssembly(`
                \rmovq ${arg.real_addr}(%rsp), %rax
                \rleaq (%rax), %rdx
                \rmovq %rdx, ${context.pushStack(this.size)}(%rsp)
            `);
        } else {
            context.addAssembly(`
                    \rleaq ${arg.real_addr}(%rsp), %rdx
                    \rmovq %rdx, ${context.pushStack(this.size)}(%rsp)
                `);
        }
        const val = new Value(name, this, arg.pos, context.stackPtr, AddrType.TempStack);
        return val;
    }

    asm_dereference(context: Context, name: string, self: Value, is_l_value: boolean): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        if (is_l_value) {
            return new Value('_temp', this.ptrTo, self.pos, self.real_addr, AddrType.Indirect);
        }
        context.addAssembly(`
            \rmovq ${self.real_addr}(%rsp), %rax
            \r${MOV_I[this.ptrTo.mov_i]} (%rax), %${REG_I[this.ptrTo.reg_i]} 
            \r${MOV_I[this.ptrTo.mov_i]} %${REG_I[this.ptrTo.reg_i]}, ${context.pushStack(this.ptrTo.size)}(%rsp)
        `)
        return new Value('_temp', this.ptrTo, self.pos, context.stackPtr, AddrType.Stack);
    }

    asm_from_literal(context: Context, name: string, literal: string | null, pos: Position): Value {
        if (this.ptrTo.isSameType(CharType.getInstance()) && !!literal) {
            context.addAssembly(`
                    \rmovb $0, ${context.pushStack(CharType.getInstance().size)}(%rsp)
                `);
            for (const c of convert_string_to_char_codes(literal).reverse()) {
                context.addAssembly(`
                    \rmovb $${c}, ${context.pushStack(CharType.getInstance().size)}(%rsp)
                `);
            }
            context.addAssembly(`
                    \rleaq ${context.stackPtr}(%rsp), %rdx
                `);
            context.addAssembly(`
                    \rmovq %rdx, ${context.pushStack(this.size)}(%rsp) 
                `);
            return new Value(name, this, pos, context.stackPtr, AddrType.Stack);
        }
        if (literal === null) {
            context.addAssembly(`
                    \rmovq $0, ${context.pushStack(this.size)}(%rsp)
                `);
            return new Value(name, this, pos, context.stackPtr, AddrType.Stack);
        }
        TODO();
    }
    asm_copy(context: Context, dst: Value, src: Value): void {
        dst.valueType.isSameType(this) || UNREACHABLE();
        if (!are_converible_types(src.valueType, dst.valueType)) {
            throwError(new TypeError(src.pos, `Can't convert ${src.valueType} to ${this.toString()}`));
        }
        const src_addr = src.stack_addr(context);
        const dst_addr = dst.real_addr;
        if (dst.addr_type === AddrType.Indirect) {
            context.addAssembly(`
                \rmovq ${dst_addr}(%rsp), %rax
                \rmovq ${src_addr}(%rsp), %rdx
                \rmovq %rdx, (%rax)
            `);
        } else {
            context.addAssembly(`
                \rmovq ${src_addr}(%rsp), %rdx
                \rmovq %rdx, ${dst_addr}(%rsp)
            `);
        }

    }

    asm_from_plus(context: Context, self: Value, rhs: Value): Value {
        if (!(rhs.valueType instanceof IntType)) {
            throwError(new TypeError(self.pos, `Cannot sum variables of types {${this}} and {${rhs.valueType}}`));
        }
        const lhs_addr = self.stack_addr(context);
        const rhs_addr = rhs.stack_addr(context);
        context.addAssembly(`
                \rmovslq ${rhs_addr}(%rsp), %rdx
                \rimulq $${this.ptrTo.size}, %rdx 
                \rmovq ${lhs_addr}(%rsp), %rax
                \raddq %rdx, %rax
                \rmovq %rax, ${context.pushStack(this.size)}(%rsp)
            `);
        return new Value('_temp', this, self.pos, context.stackPtr, AddrType.Stack);
    }
    asm_from_minus(context: Context, self: Value, rhs: Value): Value {
        if (rhs.valueType instanceof IntType) {
            const lhs_addr = self.stack_addr(context);
            const rhs_addr = rhs.stack_addr(context);
            context.addAssembly(`
                \rmovslq ${rhs_addr}(%rsp), %rdx
                \rimulq $${this.ptrTo.size}, %rdx 
                \rmovq ${lhs_addr}(%rsp), %rax
                \rsubq %rdx, %rax
                \rmovq %rax, ${context.pushStack(this.size)}(%rsp)
            `);
            return new Value('_temp', this, self.pos, context.stackPtr, AddrType.Stack);
        }
        if (rhs.valueType instanceof PtrType) {
            this.isSameType(rhs.valueType) || throwError(new RulesError(self.pos, `Cannot subtract pointers of different type:\n\rlhs - ${self}\n\rrhs - ${rhs}`));
            const lhs_addr = self.stack_addr(context);
            const rhs_addr = rhs.stack_addr(context);
            context.addAssembly(`
                \rmovslq ${rhs_addr}(%rsp), %rdx
                \rmovq ${lhs_addr}(%rsp), %rax
                \rsubq %rdx, %rax
                \rmovl %eax, ${context.pushStack(IntType.getInstance().size)}(%rsp)
            `);
            return new Value('_temp', IntType.getInstance(), self.pos, context.stackPtr, AddrType.Stack);
        }
        TODO(`Unhandeled subtract ${self}, ${rhs}`);
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

    get size(): number { return 8 };
}

export class FunctionType implements ValueType {
    get mov_i(): MOV_I { return MOV_I.movq }
    private static instances: FunctionType[] = [];

    private constructor(public returnType: ValueType, public paramTypes: ValueType[]) { }
    asm_from_percent(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_to_boolean(context: Context, self: Value): Value {
        throw new Error('Method not implemented.');
    }
    get reg_i(): REG_I {
        throw new Error('Method not implemented.');
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
    get size(): number { return 8; }
}


export enum AddrType {
    TempStack,
    Stack,
    Indirect,
    Register,
}


export class Value {
    private _address: number | null = null;

    constructor(public name: string, public valueType: ValueType, public pos: Position, address: number | null = null, public addr_type: AddrType) {
        this._address = address;
    }

    public toString = (): string => {
        return `Value {\n\rName: [${this.name}]\n\rType: [${this.valueType.toString()}]\n\rAddress: ${this.real_addr}(%rsp)\n\raddr_type: ${AddrType[this.addr_type]}\n\r}`
    }
    stack_addr(context: Context): number {
        if (this.addr_type === AddrType.Indirect) {
            context.addAssembly(`
                \rmovq ${this._address}(%rsp), %rax
                \rmovl (%rax), %${REG_I[this.valueType.reg_i]}
                \rmovl %${REG_I[this.valueType.reg_i]}, ${context.pushStack(this.valueType.size)}(%rsp)
            `);
            return context.stackPtr;
        } else {
            return this.real_addr;
        }
    }

    get real_addr(): number {
        return this._address ?? throwError(new Error('Accessed before assigned'));
    }
}
