"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntType = void 0;
const converter_1 = require("../converter");
const helper_1 = require("../helper");
const value_1 = require("../value");
const value_type_1 = require("./value_type");
class IntType {
    is_const = false;
    static instance = null;
    constructor() {
    }
    asm_to_boolean(context, self) {
        self.valueType.isSameType(this) || (0, helper_1.UNREACHABLE)();
        return (0, value_type_1.asm_to_boolean)(context, self, value_type_1.CMP_I.cmpl);
    }
    get reg_i() {
        return value_type_1.REG_I.edx;
    }
    get size() {
        return 4;
    }
    get mov_i() {
        return value_type_1.MOV_I.movl;
    }
    asm_cmp_not_equal(context, self, rhs) {
        self.valueType.isSameType(this) || (0, helper_1.UNREACHABLE)();
        const { ok, left, right } = (0, converter_1.convert_values)(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_cmp_not_equal(context, left, right);
        }
        return (0, value_type_1.asm_comp_action_l)(context, self, rhs, value_type_1.JN_I.jne);
    }
    asm_cmp_equal(context, self, rhs) {
        self.valueType.isSameType(this) || (0, helper_1.UNREACHABLE)();
        const { ok, left, right } = (0, converter_1.convert_values)(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_cmp_equal(context, left, right);
        }
        return (0, value_type_1.asm_comp_action_l)(context, self, rhs, value_type_1.JN_I.je);
    }
    asm_cmp_less_or_equal(context, self, rhs) {
        self.valueType.isSameType(this) || (0, helper_1.UNREACHABLE)();
        const { ok, left, right } = (0, converter_1.convert_values)(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_cmp_less_or_equal(context, left, right);
        }
        return (0, value_type_1.asm_comp_action_l)(context, self, rhs, value_type_1.JN_I.jge);
    }
    asm_cmp_greater_or_equal(context, self, rhs) {
        self.valueType.isSameType(this) || (0, helper_1.UNREACHABLE)();
        const { ok, left, right } = (0, converter_1.convert_values)(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_cmp_greater_or_equal(context, left, right);
        }
        return (0, value_type_1.asm_comp_action_l)(context, self, rhs, value_type_1.JN_I.jle);
    }
    asm_cmp_greater(context, self, rhs) {
        self.valueType.isSameType(this) || (0, helper_1.UNREACHABLE)();
        const { ok, left, right } = (0, converter_1.convert_values)(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_cmp_greater(context, left, right);
        }
        return (0, value_type_1.asm_comp_action_l)(context, self, rhs, value_type_1.JN_I.jl);
    }
    asm_cmp_less(context, self, rhs) {
        self.valueType.isSameType(this) || (0, helper_1.UNREACHABLE)();
        const { ok, left, right } = (0, converter_1.convert_values)(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_cmp_less(context, left, right);
        }
        return (0, value_type_1.asm_comp_action_l)(context, self, rhs, value_type_1.JN_I.jg);
    }
    asm_from_plus(context, self, rhs) {
        self.valueType.isSameType(this) || (0, helper_1.UNREACHABLE)();
        const { ok, left, right } = (0, converter_1.convert_values)(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_from_plus(context, left, right);
        }
        const stack_addr = (0, value_type_1.asm_bin_action)(context, value_type_1.MOV_I.movl, value_type_1.BIN_I.addl, value_type_1.REG_I.edx, self, rhs, this.size);
        return new value_1.Value(value_1.temp_t.t, this, self.pos, stack_addr, value_type_1.AddrType.Stack);
    }
    asm_from_minus(context, self, rhs) {
        self.valueType.isSameType(this) || (0, helper_1.UNREACHABLE)();
        const { ok, left, right } = (0, converter_1.convert_values)(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_from_minus(context, left, right);
        }
        const stack_addr = (0, value_type_1.asm_bin_action)(context, value_type_1.MOV_I.movl, value_type_1.BIN_I.subl, value_type_1.REG_I.edx, self, rhs, this.size);
        return new value_1.Value(value_1.temp_t.t, this, self.pos, stack_addr, value_type_1.AddrType.Stack);
    }
    asm_from_multiply(context, self, rhs) {
        self.valueType.isSameType(this) || (0, helper_1.UNREACHABLE)();
        const { ok, left, right } = (0, converter_1.convert_values)(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_from_multiply(context, left, right);
        }
        context.addAssembly(`
                    \rmovl ${self.stack_addr(context)}(%rsp), %eax
                    \rimull ${rhs.stack_addr(context)}(%rsp)
                    \rmovl %eax, ${context.pushStack(this.size)}(%rsp)
                `);
        return new value_1.Value(value_1.temp_t.t, this, self.pos, context.stackPtr, value_type_1.AddrType.Stack);
    }
    asm_from_divide(context, self, rhs) {
        self.valueType.isSameType(this) || (0, helper_1.UNREACHABLE)();
        const { ok, left, right } = (0, converter_1.convert_values)(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_from_divide(context, left, right);
        }
        context.addAssembly(`
                \rmovl ${self.stack_addr(context)}(%rsp), %eax
                \rcdq
                \ridivl ${rhs.stack_addr(context)}(%rsp) 
                \rmovl %eax, ${context.pushStack(this.size)}(%rsp)
            `);
        return new value_1.Value(value_1.temp_t.t, this, self.pos, context.stackPtr, value_type_1.AddrType.Stack);
    }
    asm_from_percent(context, self, rhs) {
        self.valueType.isSameType(this) || (0, helper_1.UNREACHABLE)();
        const { ok, left, right } = (0, converter_1.convert_values)(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_from_percent(context, left, right);
        }
        context.addAssembly(`
                \rmovl ${self.stack_addr(context)}(%rsp), %eax
                \rcdq
                \ridivl ${rhs.stack_addr(context)}(%rsp) 
                \rmovl %edx, ${context.pushStack(this.size)}(%rsp)
            `);
        return new value_1.Value(value_1.temp_t.t, this, self.pos, context.stackPtr, value_type_1.AddrType.Stack);
    }
    isSameType(type) {
        return type instanceof IntType;
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new IntType();
        }
        return this.instance;
    }
    toString = () => {
        return this.is_const ? "const int" : "int";
    };
    asm_from_literal(context, name, literal, pos, should_alloc) {
        if (should_alloc) {
            context.pushStack(this.size);
            context.addAssembly(`
            \rmovl $${literal ?? 0}, ${context.stackPtr}(%rsp)
            `);
            return new value_1.Value(name, this, pos, context.stackPtr, value_type_1.AddrType.Stack);
        }
        return new value_1.Value(name, this, pos, null, value_type_1.AddrType.Stack);
    }
    asm_copy(context, dst, src) {
        dst.valueType.isSameType(this) || (0, helper_1.UNREACHABLE)();
        if (!(0, converter_1.are_converible_types)(src.valueType, dst.valueType)) {
            (0, helper_1.throwError)(new helper_1.TypeError(src.pos, `Can't convert ${src.valueType} to ${this.toString()}`));
        }
        src = (0, converter_1.convert_val_to_type)(context, src, this);
        const src_addr = src.stack_addr(context);
        const dst_addr = dst.real_addr;
        if (dst.addr_type === value_type_1.AddrType.Indirect) {
            context.addAssembly(`
                \rmovq ${dst_addr}(%rsp), %rax
                \rmovl ${src_addr}(%rsp), %edx
                \rmovl %edx, (%rax)
            `);
        }
        else {
            context.addAssembly(`
                \rmovl ${src_addr}(%rsp), %edx
                \rmovl %edx, ${dst_addr}(%rsp)
            `);
        }
    }
}
exports.IntType = IntType;
