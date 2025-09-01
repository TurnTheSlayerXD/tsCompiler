"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionType = void 0;
const helper_1 = require("../helper");
const value_type_1 = require("./value_type");
class FunctionType {
    returnType;
    paramTypes;
    get mov_i() { return value_type_1.MOV_I.movq; }
    static instances = [];
    constructor(returnType, paramTypes) {
        this.returnType = returnType;
        this.paramTypes = paramTypes;
    }
    asm_from_percent(context, self, rhs) {
        throw new Error('Method not implemented.');
    }
    asm_to_boolean(context, self) {
        throw new Error('Method not implemented.');
    }
    get reg_i() {
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
    static getInstance(returnType, paramTypes) {
        const new_inst = new FunctionType(returnType, paramTypes);
        const ret = this.instances.find(tp => tp.isSameType(new_inst));
        if (!ret) {
            this.instances.push(new_inst);
        }
        return this.instances.find(tp => tp.isSameType(new_inst)) ?? (0, helper_1.throwError)(new Error('wtf'));
    }
    isSameType(rhs) {
        if (!(rhs instanceof FunctionType)) {
            return false;
        }
        if (!this.returnType.isSameType(rhs.returnType)) {
            return false;
        }
        if (this.paramTypes.length !== rhs.paramTypes.length) {
            return false;
        }
        for (let i = 0; i < this.paramTypes.length; ++i) {
            if (!(this.paramTypes[i].isSameType(rhs.paramTypes[i]))) {
                return false;
            }
        }
        return true;
    }
    is_const = false;
    toString = () => {
        return `${this.returnType.toString()} (${this.paramTypes.map((p) => p.toString()).join(', ')})`;
    };
    get size() { return 8; }
}
exports.FunctionType = FunctionType;
