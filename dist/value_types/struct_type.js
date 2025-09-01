"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StructType = void 0;
const helper_1 = require("../helper");
class StructType {
    struct_name;
    static _instances = [];
    is_const = false;
    fields;
    _size;
    constructor(struct_name) {
        this.struct_name = struct_name;
        this.fields = [];
        this._size = null;
    }
    toString = () => {
        return `struct ${this.struct_name}: { ${this.fields.join('; ')} }`;
    };
    isSameType(type) {
        if (!(type instanceof StructType)) {
            return false;
        }
        return type.struct_name === this.struct_name;
    }
    static getInstance(struct_name) {
        const new_type = new StructType(struct_name);
        let old_type;
        if ((old_type = StructType._instances.find(v => v.isSameType(new_type)))) {
            return old_type;
        }
        StructType._instances.push(new_type);
        return new_type;
    }
    get size() {
        return this._size ?? (0, helper_1.UNREACHABLE)();
    }
    asm_from_literal(context, name, literal, pos, should_alloc) {
        throw new Error("Method not implemented.");
    }
    asm_copy(context, dst, src) {
        throw new Error("Method not implemented.");
    }
    asm_from_plus(context, self, rhs) {
        throw new Error("Method not implemented.");
    }
    asm_from_minus(context, self, rhs) {
        throw new Error("Method not implemented.");
    }
    asm_from_multiply(context, self, rhs) {
        throw new Error("Method not implemented.");
    }
    asm_from_divide(context, self, rhs) {
        throw new Error("Method not implemented.");
    }
    asm_from_percent(context, self, rhs) {
        throw new Error("Method not implemented.");
    }
    asm_cmp_less(context, self, rhs) {
        throw new Error("Method not implemented.");
    }
    asm_cmp_greater(context, self, rhs) {
        throw new Error("Method not implemented.");
    }
    asm_cmp_equal(context, self, rhs) {
        throw new Error("Method not implemented.");
    }
    asm_cmp_not_equal(context, self, rhs) {
        throw new Error("Method not implemented.");
    }
    asm_cmp_less_or_equal(context, self, rhs) {
        throw new Error("Method not implemented.");
    }
    asm_cmp_greater_or_equal(context, self, rhs) {
        throw new Error("Method not implemented.");
    }
    asm_to_boolean(context, self) {
        throw new Error("Method not implemented.");
    }
    get reg_i() {
        throw new Error("Method not implemented.");
    }
    get mov_i() {
        throw new Error("Method not implemented.");
    }
}
exports.StructType = StructType;
