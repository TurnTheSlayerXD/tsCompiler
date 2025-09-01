"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoidType = void 0;
const helper_1 = require("../helper");
class VoidType {
    static instance = null;
    constructor() {
    }
    asm_from_percent(context, self, rhs) {
        throw new Error('Method not implemented.');
    }
    asm_to_boolean(context, self) {
        self.valueType.isSameType(this) || (0, helper_1.UNREACHABLE)();
        (0, helper_1.TODO)();
    }
    get reg_i() {
        throw new Error('Method not implemented.');
    }
    get mov_i() {
        throw new Error('Method not implemented.');
    }
    asm_cmp_less(context, self, rhs) {
        throw new Error('Method not implemented.');
    }
    asm_cmp_greater(context, self, rhs) {
        throw new Error('Method not implemented.');
    }
    asm_cmp_equal(context, self, rhs) {
        throw new Error('Method not implemented.');
    }
    asm_cmp_not_equal(context, self, rhs) {
        throw new Error('Method not implemented.');
    }
    asm_cmp_less_or_equal(context, self, rhs) {
        throw new Error('Method not implemented.');
    }
    asm_cmp_greater_or_equal(context, self, rhs) {
        throw new Error('Method not implemented.');
    }
    asm_copy(context, src, dst_self) {
        throw new Error('Method not implemented.');
    }
    asm_from_literal(context, name, literal, pos) {
        throw new Error('Method not implemented.');
    }
    asm_create_from_variable(context, name, value, pos) {
        throw new Error('Method not implemented.');
    }
    asm_from_plus(context, self, rhs) {
        throw new Error('Method not implemented.');
    }
    asm_from_minus(context, self, rhs) {
        throw new Error('Method not implemented.');
    }
    asm_from_multiply(context, self, rhs) {
        throw new Error('Method not implemented.');
    }
    asm_from_divide(context, self, rhs) {
        throw new Error('Method not implemented.');
    }
    asm_load_to_address_in_rax(context, self, l_value) {
        throw new Error('Method not implemented.');
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new VoidType();
        }
        return this.instance;
    }
    isSameType(type) {
        return type instanceof VoidType;
    }
    is_const = false;
    toString = () => {
        return "void";
    };
    get size() { return 1; }
}
exports.VoidType = VoidType;
