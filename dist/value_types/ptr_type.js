"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PtrType = void 0;
const converter_1 = require("../converter");
const helper_1 = require("../helper");
const value_1 = require("../value");
const char_type_1 = require("./char_type");
const int_type_1 = require("./int_type");
const value_type_1 = require("./value_type");
const helper_2 = require("../helper");
class PtrType {
    ptrTo;
    static instances = [];
    constructor(ptrTo) {
        this.ptrTo = ptrTo;
    }
    asm_from_percent(context, self, rhs) {
        throw new Error('Method not implemented.');
    }
    get reg_i() {
        return value_type_1.REG_I.rdx;
    }
    get mov_i() {
        return value_type_1.MOV_I.movq;
    }
    asm_to_boolean(context, self) {
        self.valueType.isSameType(this) || (0, helper_1.UNREACHABLE)();
        return (0, value_type_1.asm_to_boolean)(context, self, value_type_1.CMP_I.cmpq);
    }
    asm_cmp_not_equal(context, self, rhs) {
        self.valueType.isSameType(this) || (0, helper_1.UNREACHABLE)();
        const { ok, left, right } = (0, converter_1.convert_values)(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_cmp_not_equal(context, left, right);
        }
        return (0, value_type_1.asm_comp_action_q)(context, self, rhs, value_type_1.JN_I.jne);
    }
    asm_cmp_equal(context, self, rhs) {
        self.valueType.isSameType(this) || (0, helper_1.UNREACHABLE)();
        const { ok, left, right } = (0, converter_1.convert_values)(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_cmp_equal(context, left, right);
        }
        return (0, value_type_1.asm_comp_action_q)(context, self, rhs, value_type_1.JN_I.je);
    }
    asm_cmp_less_or_equal(context, self, rhs) {
        self.valueType.isSameType(this) || (0, helper_1.UNREACHABLE)();
        const { ok, left, right } = (0, converter_1.convert_values)(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_cmp_less_or_equal(context, left, right);
        }
        return (0, value_type_1.asm_comp_action_q)(context, self, rhs, value_type_1.JN_I.jge);
    }
    asm_cmp_greater_or_equal(context, self, rhs) {
        self.valueType.isSameType(this) || (0, helper_1.UNREACHABLE)();
        const { ok, left, right } = (0, converter_1.convert_values)(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_cmp_greater_or_equal(context, left, right);
        }
        return (0, value_type_1.asm_comp_action_q)(context, self, rhs, value_type_1.JN_I.jle);
    }
    asm_cmp_greater(context, self, rhs) {
        self.valueType.isSameType(this) || (0, helper_1.UNREACHABLE)();
        const { ok, left, right } = (0, converter_1.convert_values)(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_cmp_greater(context, left, right);
        }
        return (0, value_type_1.asm_comp_action_q)(context, self, rhs, value_type_1.JN_I.jl);
    }
    asm_cmp_less(context, self, rhs) {
        self.valueType.isSameType(this) || (0, helper_1.UNREACHABLE)();
        const { ok, left, right } = (0, converter_1.convert_values)(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_cmp_less(context, left, right);
        }
        return (0, value_type_1.asm_comp_action_q)(context, self, rhs, value_type_1.JN_I.jg);
    }
    asm_take_reference_from(context, name, arg) {
        arg.valueType.isSameType(this.ptrTo) || (0, helper_1.UNREACHABLE)();
        if (arg.addr_type === value_type_1.AddrType.Indirect) {
            context.addAssembly(`
                \rmovq ${arg.real_addr}(%rsp), %rax
                \rleaq (%rax), %rdx
                \rmovq %rdx, ${context.pushStack(this.size)}(%rsp)
            `);
        }
        else {
            context.addAssembly(`
                    \rleaq ${arg.real_addr}(%rsp), %rdx
                    \rmovq %rdx, ${context.pushStack(this.size)}(%rsp)
                `);
        }
        const val = new value_1.Value(name, this, arg.pos, context.stackPtr, value_type_1.AddrType.TempStack);
        return val;
    }
    asm_dereference(context, name, self, is_l_value) {
        self.valueType.isSameType(this) || (0, helper_1.UNREACHABLE)();
        if (is_l_value) {
            return new value_1.Value(value_1.temp_t.t, this.ptrTo, self.pos, self.real_addr, value_type_1.AddrType.Indirect);
        }
        context.addAssembly(`
            \rmovq ${self.real_addr}(%rsp), %rax
            \r${value_type_1.MOV_I[this.ptrTo.mov_i]} (%rax), %${value_type_1.REG_I[this.ptrTo.reg_i]} 
            \r${value_type_1.MOV_I[this.ptrTo.mov_i]} %${value_type_1.REG_I[this.ptrTo.reg_i]}, ${context.pushStack(this.ptrTo.size)}(%rsp)
        `);
        return new value_1.Value(value_1.temp_t.t, this.ptrTo, self.pos, context.stackPtr, value_type_1.AddrType.Stack);
    }
    asm_from_literal(context, name, literal, pos, should_alloc) {
        if (this.ptrTo.isSameType(char_type_1.CharType.getInstance()) && !!literal) {
            context.addAssembly(`
                    \rmovb $0, ${context.pushStack(char_type_1.CharType.getInstance().size)}(%rsp)
                `);
            for (const c of (0, helper_1.convert_string_to_char_codes)(literal).reverse()) {
                context.addAssembly(`
                    \rmovb $${c}, ${context.pushStack(char_type_1.CharType.getInstance().size)}(%rsp)
                `);
            }
            context.addAssembly(`
                    \rleaq ${context.stackPtr}(%rsp), %rdx
                `);
            context.addAssembly(`
                    \rmovq %rdx, ${context.pushStack(this.size)}(%rsp) 
                `);
            return new value_1.Value(name, this, pos, context.stackPtr, value_type_1.AddrType.Stack);
        }
        if (literal === null) {
            context.addAssembly(`
                    \rmovq $0, ${context.pushStack(this.size)}(%rsp)
                `);
            return new value_1.Value(name, this, pos, context.stackPtr, value_type_1.AddrType.Stack);
        }
        (0, helper_1.TODO)();
    }
    asm_copy(context, dst, src) {
        dst.valueType.isSameType(this) || (0, helper_1.UNREACHABLE)();
        if (!(0, converter_1.are_converible_types)(src.valueType, dst.valueType)) {
            (0, helper_1.throwError)(new helper_2.TypeError(src.pos, `Can't convert ${src.valueType} to ${this.toString()}`));
        }
        const src_addr = src.stack_addr(context);
        const dst_addr = dst.real_addr;
        if (dst.addr_type === value_type_1.AddrType.Indirect) {
            context.addAssembly(`
                \rmovq ${dst_addr}(%rsp), %rax
                \rmovq ${src_addr}(%rsp), %rdx
                \rmovq %rdx, (%rax)
            `);
        }
        else {
            context.addAssembly(`
                \rmovq ${src_addr}(%rsp), %rdx
                \rmovq %rdx, ${dst_addr}(%rsp)
            `);
        }
    }
    asm_from_plus(context, self, rhs) {
        if (!(rhs.valueType instanceof int_type_1.IntType)) {
            (0, helper_1.throwError)(new helper_2.TypeError(self.pos, `Cannot sum variables of types {${this}} and {${rhs.valueType}}`));
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
        return new value_1.Value(value_1.temp_t.t, this, self.pos, context.stackPtr, value_type_1.AddrType.Stack);
    }
    asm_from_minus(context, self, rhs) {
        if (rhs.valueType instanceof int_type_1.IntType) {
            const lhs_addr = self.stack_addr(context);
            const rhs_addr = rhs.stack_addr(context);
            context.addAssembly(`
                \rmovslq ${rhs_addr}(%rsp), %rdx
                \rimulq $${this.ptrTo.size}, %rdx 
                \rmovq ${lhs_addr}(%rsp), %rax
                \rsubq %rdx, %rax
                \rmovq %rax, ${context.pushStack(this.size)}(%rsp)
            `);
            return new value_1.Value(value_1.temp_t.t, this, self.pos, context.stackPtr, value_type_1.AddrType.Stack);
        }
        if (rhs.valueType instanceof PtrType) {
            this.isSameType(rhs.valueType) || (0, helper_1.throwError)(new helper_1.RulesError(self.pos, `Cannot subtract pointers of different type:\n\rlhs - ${self}\n\rrhs - ${rhs}`));
            const lhs_addr = self.stack_addr(context);
            const rhs_addr = rhs.stack_addr(context);
            context.addAssembly(`
                \rmovslq ${rhs_addr}(%rsp), %rdx
                \rmovq ${lhs_addr}(%rsp), %rax
                \rsubq %rdx, %rax
                \rmovl %eax, ${context.pushStack(int_type_1.IntType.getInstance().size)}(%rsp)
            `);
            return new value_1.Value(value_1.temp_t.t, int_type_1.IntType.getInstance(), self.pos, context.stackPtr, value_type_1.AddrType.Stack);
        }
        (0, helper_1.TODO)(`Unhandeled subtract ${self}, ${rhs}`);
    }
    asm_from_multiply(context, self, rhs) {
        throw new Error('Method not implemented.');
    }
    asm_from_divide(context, self, rhs) {
        throw new Error('Method not implemented.');
    }
    static getInstance(ptrTo) {
        const new_inst = new PtrType(ptrTo);
        const ret = this.instances.find(tp => tp.isSameType(new_inst));
        if (!ret) {
            this.instances.push(new_inst);
        }
        return new_inst;
    }
    isSameType(type) {
        if (!(type instanceof PtrType)) {
            return false;
        }
        return this.ptrTo.isSameType(type.ptrTo);
    }
    is_const = false;
    toString = () => {
        return this.is_const ? `${this.ptrTo.toString()} * const` : `${this.ptrTo.toString()} *`;
    };
    get size() { return 8; }
    ;
}
exports.PtrType = PtrType;
