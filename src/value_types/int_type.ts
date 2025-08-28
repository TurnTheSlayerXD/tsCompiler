
import { Context } from "../context";
import { convert_values, are_converible_types, convert_val_to_type } from "../converter";
import { UNREACHABLE, throwError, TypeError } from "../helper";
import { Position } from "../lexer";
import { Value, temp_t } from "../value";
import { AddrType, asm_bin_action, asm_comp_action_l, asm_to_boolean, BIN_I, CMP_I, JN_I, MOV_I, REG_I, ValueType } from "./value_type";


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
        return new Value(temp_t.t, this, self.pos, stack_addr, AddrType.Stack);
    }
    asm_from_minus(context: Context, self: Value, rhs: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        const { ok, left, right } = convert_values(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_from_minus(context, left, right);
        }
        const stack_addr = asm_bin_action(context, MOV_I.movl, BIN_I.subl, REG_I.edx, self, rhs, this.size);
        return new Value(temp_t.t, this, self.pos, stack_addr, AddrType.Stack);
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
        return new Value(temp_t.t, this, self.pos, context.stackPtr, AddrType.Stack);
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
        return new Value(temp_t.t, this, self.pos, context.stackPtr, AddrType.Stack);
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
        return new Value(temp_t.t, this, self.pos, context.stackPtr, AddrType.Stack);
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

    asm_from_literal(context: Context, name: string | temp_t, literal: string | null, pos: Position, should_alloc: boolean): Value {
        if (should_alloc) {
            context.pushStack(this.size);
            context.addAssembly(`
            \rmovl $${literal ?? 0}, ${context.stackPtr}(%rsp)
            `);
            return new Value(name, this, pos, context.stackPtr, AddrType.Stack);
        }
        return new Value(name, this, pos, null, AddrType.Stack);
    }
    asm_copy(context: Context, dst: Value, src: Value): void {
        dst.valueType.isSameType(this) || UNREACHABLE();
        if (!are_converible_types(src.valueType, dst.valueType)) {
            throwError(new TypeError(src.pos, `Can't convert ${src.valueType} to ${this.toString()}`));
        }
        src = convert_val_to_type(context, src, this);
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
