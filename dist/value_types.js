"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypenameType = void 0;
class TypenameType {
    typevalue;
    is_const = false;
    constructor(typevalue) {
        this.typevalue = typevalue;
    }
    toString = () => "typename";
    isSameType(type) {
        throw new Error('Method not implemented.');
    }
    get size() {
        throw new Error('Method not implemented.');
    }
    asm_from_literal(context, name, literal, pos) {
        throw new Error('Method not implemented.');
    }
    asm_copy(context, dst, src) {
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
    asm_from_percent(context, self, rhs) {
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
    asm_to_boolean(context, self) {
        throw new Error('Method not implemented.');
    }
    get reg_i() {
        throw new Error('Method not implemented.');
    }
    get mov_i() {
        throw new Error('Method not implemented.');
    }
}
exports.TypenameType = TypenameType;
