import { Context } from "../context";
import { convert_values, are_converible_types } from "../converter";
import { UNREACHABLE, convert_string_to_char_codes, TODO, throwError, RulesError } from "../helper";
import { Position } from "../lexer";
import { Value, temp_t } from "../value";
import { CharType } from "./char_type";
import { IntType } from "./int_type";
import { ValueType, REG_I, MOV_I, CMP_I, AddrType, asm_comp_action_q, asm_to_boolean, JN_I } from "./value_type";
import { TypeError } from "../helper";
export class PtrType implements ValueType {
    private static instances: PtrType[] = [];

    protected constructor(public ptrTo: ValueType) { }
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

    asm_take_reference_from(context: Context, name: string | temp_t, arg: Value): Value {
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

    asm_dereference(context: Context, name: string | temp_t, self: Value, is_l_value: boolean): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        if (is_l_value) {
            return new Value(temp_t.t, this.ptrTo, self.pos, self.real_addr, AddrType.Indirect);
        }
        context.addAssembly(`
            \rmovq ${self.real_addr}(%rsp), %rax
            \r${MOV_I[this.ptrTo.mov_i]} (%rax), %${REG_I[this.ptrTo.reg_i]} 
            \r${MOV_I[this.ptrTo.mov_i]} %${REG_I[this.ptrTo.reg_i]}, ${context.pushStack(this.ptrTo.size)}(%rsp)
        `)
        return new Value(temp_t.t, this.ptrTo, self.pos, context.stackPtr, AddrType.Stack);
    }

    asm_from_literal(context: Context, name: string, literal: string | null, pos: Position, should_alloc: boolean): Value {
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
        return new Value(temp_t.t, this, self.pos, context.stackPtr, AddrType.Stack);
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
            return new Value(temp_t.t, this, self.pos, context.stackPtr, AddrType.Stack);
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
            return new Value(temp_t.t, IntType.getInstance(), self.pos, context.stackPtr, AddrType.Stack);
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
