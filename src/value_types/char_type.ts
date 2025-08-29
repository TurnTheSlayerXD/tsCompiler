import { Context } from "../context";
import { convert_values, are_converible_types, convert_val_to_type } from "../converter";
import { UNREACHABLE, convert_string_to_char_codes, throwError, RulesError } from "../helper";
import { Position } from "../lexer";
import { Value, temp_t } from "../value";
import { ValueType, MOV_I, REG_I, asm_to_boolean, CMP_I, asm_comp_action_b, JN_I, AddrType, asm_bin_action, BIN_I } from "./value_type";

import { TypeError } from "../helper"
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

    asm_from_literal(context: Context, name: string | temp_t.t, literal: string | null, pos: Position, should_alloc: boolean): Value {
        if (should_alloc) {
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
        return new Value(name, this, pos, null, AddrType.Stack);
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
        return new Value(temp_t.t, this, self.pos, stack_addr, AddrType.Stack);
    }
    asm_from_minus(context: Context, self: Value, rhs: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        const { ok, left, right } = convert_values(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_from_minus(context, left, right);
        }
        const stack_addr = asm_bin_action(context, MOV_I.movb, BIN_I.subb, REG_I.dh, self, rhs, this.size);
        return new Value(temp_t.t, this, self.pos, stack_addr, AddrType.Stack);
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
        return new Value(temp_t.t, this, self.pos, context.stackPtr, AddrType.Stack);
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

