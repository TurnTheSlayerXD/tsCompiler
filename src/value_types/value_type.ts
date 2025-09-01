import { Context } from "../context";
import { TODO } from "../helper";
import { Position } from "../lexer";
import { temp_t, Value } from "../value";
import { CharType } from "./char_type";

export interface ValueType {
    is_const: boolean;
    toString: () => string;
    isSameType(type: ValueType): boolean;
    get size(): number;

    asm_from_literal(context: Context, name: string | temp_t, literal: string | null, pos: Position, should_alloc: boolean): Value;
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

export enum AddrType {
    Stack,
    Indirect,
}


export function asm_div_action(context: Context, mov: MOV_I, div: BIN_I,
    eax: REG_I, edx: REG_I, ecx: REG_I, ebx: REG_I,
    lhs: Value, rhs: Value, size: number) {
    TODO('DIVISION');
}
export function asm_to_boolean(context: Context, self: Value, cmp_i: CMP_I): Value {
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
    return new Value(temp_t.t, CharType.getInstance(), self.pos, result_addr, AddrType.Stack);
}

export function asm_bin_action(context: Context, mov: MOV_I, act: BIN_I, reg: REG_I, lhs: Value, rhs: Value, size: number): number {
    const lhs_addr = lhs.stack_addr(context);
    const rhs_addr = rhs.stack_addr(context);
    context.addAssembly(`
                \r${MOV_I[mov]} ${lhs_addr}(%rsp), %${REG_I[reg]}
                \r${BIN_I[act]} ${rhs_addr}(%rsp), %${REG_I[reg]}
                \r${MOV_I[mov]} %${REG_I[reg]}, ${context.pushStack(size)}(%rsp) 
            `);
    return context.stackPtr;
}

export enum JN_I {
    jne,
    je,
    jge,
    jle,
    jg,
    jl,
}

export function asm_comp_action_l(context: Context, self: Value, rhs: Value, jn: JN_I) {
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

    return new Value(temp_t.t, CharType.getInstance(), self.pos, bool_addr, AddrType.Stack);
}
export function asm_comp_action_b(context: Context, self: Value, rhs: Value, jn: JN_I) {
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

    return new Value(temp_t.t, CharType.getInstance(), self.pos, bool_addr, AddrType.Stack);
}

export function asm_comp_action_q(context: Context, self: Value, rhs: Value, jn: JN_I) {
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

    return new Value(temp_t.t, CharType.getInstance(), self.pos, bool_addr, AddrType.Stack);
}


