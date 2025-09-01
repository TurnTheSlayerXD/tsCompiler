"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharType = void 0;
const converter_1 = require("../converter");
const helper_1 = require("../helper");
const value_1 = require("../value");
const value_type_1 = require("./value_type");
const helper_2 = require("../helper");
class CharType {
    static instance = null;
    get mov_i() {
        return value_type_1.MOV_I.movb;
    }
    constructor() {
    }
    get reg_i() {
        return value_type_1.REG_I.dh;
    }
    asm_to_boolean(context, self) {
        self.valueType.isSameType(this) || (0, helper_1.UNREACHABLE)();
        return (0, value_type_1.asm_to_boolean)(context, self, value_type_1.CMP_I.cmpb);
    }
    asm_cmp_not_equal(context, self, rhs) {
        self.valueType.isSameType(this) || (0, helper_1.UNREACHABLE)();
        const { ok, left, right } = (0, converter_1.convert_values)(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_cmp_not_equal(context, left, right);
        }
        return (0, value_type_1.asm_comp_action_b)(context, self, rhs, value_type_1.JN_I.jne);
    }
    asm_cmp_equal(context, self, rhs) {
        self.valueType.isSameType(this) || (0, helper_1.UNREACHABLE)();
        const { ok, left, right } = (0, converter_1.convert_values)(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_cmp_equal(context, left, right);
        }
        return (0, value_type_1.asm_comp_action_b)(context, self, rhs, value_type_1.JN_I.je);
    }
    asm_cmp_less_or_equal(context, self, rhs) {
        self.valueType.isSameType(this) || (0, helper_1.UNREACHABLE)();
        const { ok, left, right } = (0, converter_1.convert_values)(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_cmp_less_or_equal(context, left, right);
        }
        return (0, value_type_1.asm_comp_action_b)(context, self, rhs, value_type_1.JN_I.jge);
    }
    asm_cmp_greater_or_equal(context, self, rhs) {
        self.valueType.isSameType(this) || (0, helper_1.UNREACHABLE)();
        const { ok, left, right } = (0, converter_1.convert_values)(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_cmp_greater_or_equal(context, left, right);
        }
        return (0, value_type_1.asm_comp_action_b)(context, self, rhs, value_type_1.JN_I.jle);
    }
    asm_cmp_greater(context, self, rhs) {
        self.valueType.isSameType(this) || (0, helper_1.UNREACHABLE)();
        const { ok, left, right } = (0, converter_1.convert_values)(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_cmp_greater(context, left, right);
        }
        return (0, value_type_1.asm_comp_action_b)(context, self, rhs, value_type_1.JN_I.jl);
    }
    asm_cmp_less(context, self, rhs) {
        self.valueType.isSameType(this) || (0, helper_1.UNREACHABLE)();
        const { ok, left, right } = (0, converter_1.convert_values)(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_cmp_less(context, left, right);
        }
        return (0, value_type_1.asm_comp_action_b)(context, self, rhs, value_type_1.JN_I.jg);
    }
    asm_from_literal(context, name, literal, pos, should_alloc) {
        if (should_alloc) {
            context.pushStack(this.size);
            const code = !!literal ? (0, helper_1.convert_string_to_char_codes)(literal) : [0];
            if (code.length > 1) {
                (0, helper_1.throwError)(new helper_1.RulesError(pos, `Char type Literal [${literal}] cannot be multichracter`));
            }
            context.addAssembly(`
            \rmovb $${code[0]}, %ah
            \rmovb %ah, ${context.stackPtr}(%rsp)
            `);
            return new value_1.Value(name, this, pos, context.stackPtr, value_type_1.AddrType.Stack);
        }
        return new value_1.Value(name, this, pos, null, value_type_1.AddrType.Stack);
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
                \rmovb ${src_addr}(%rsp), %dh
                \rmovb %dh, (%rax)
            `);
        }
        else {
            context.addAssembly(`
                \rmovb ${src_addr}(%rsp), %dh
                \rmovb %dh, ${dst_addr}(%rsp)
            `);
        }
    }
    asm_from_plus(context, self, rhs) {
        self.valueType.isSameType(this) || (0, helper_1.UNREACHABLE)();
        const { ok, left, right } = (0, converter_1.convert_values)(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_from_plus(context, left, right);
        }
        const stack_addr = (0, value_type_1.asm_bin_action)(context, value_type_1.MOV_I.movb, value_type_1.BIN_I.addb, value_type_1.REG_I.dh, self, rhs, this.size);
        return new value_1.Value(value_1.temp_t.t, this, self.pos, stack_addr, value_type_1.AddrType.Stack);
    }
    asm_from_minus(context, self, rhs) {
        self.valueType.isSameType(this) || (0, helper_1.UNREACHABLE)();
        const { ok, left, right } = (0, converter_1.convert_values)(context, self, rhs);
        if (!ok) {
            return left.valueType.asm_from_minus(context, left, right);
        }
        const stack_addr = (0, value_type_1.asm_bin_action)(context, value_type_1.MOV_I.movb, value_type_1.BIN_I.subb, value_type_1.REG_I.dh, self, rhs, this.size);
        return new value_1.Value(value_1.temp_t.t, this, self.pos, stack_addr, value_type_1.AddrType.Stack);
    }
    asm_from_multiply(context, self, rhs) {
        throw new Error('Method not implemented.');
    }
    asm_from_divide(context, self, rhs) {
        throw new Error('Method not implemented.');
    }
    asm_from_percent(context, self, rhs) {
        self.valueType.isSameType(this) || (0, helper_1.UNREACHABLE)();
        context.addAssembly(`
                \rmovb ${self.stack_addr(context)}(%rsp), %ax
                \rcbw
                \ridivb ${rhs.stack_addr(context)}(%rsp) 
                \rmovb %dx, ${context.pushStack(this.size)}
            `);
        return new value_1.Value(value_1.temp_t.t, this, self.pos, context.stackPtr, value_type_1.AddrType.Stack);
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CharType();
        }
        return this.instance;
    }
    isSameType(type) {
        return type instanceof CharType;
    }
    is_const = false;
    get size() {
        return 1;
    }
    toString = () => {
        return this.is_const ? "const char" : "char";
    };
}
exports.CharType = CharType;
