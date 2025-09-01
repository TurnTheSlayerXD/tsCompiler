"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayType = void 0;
const helper_1 = require("../helper");
const value_1 = require("../value");
const char_type_1 = require("./char_type");
const ptr_type_1 = require("./ptr_type");
const value_type_1 = require("./value_type");
class ArrayType extends ptr_type_1.PtrType {
    array_size;
    is_const = false;
    static _instances = [];
    constructor(ptrTo, array_size) {
        super(ptrTo);
        this.array_size = array_size;
    }
    toString = () => `(${this.ptrTo}) [], size=${this.array_size}`;
    isSameType(type) {
        if ((type instanceof ptr_type_1.PtrType || type instanceof ArrayType) && type.ptrTo.isSameType(this.ptrTo)) {
            return true;
        }
        return false;
    }
    static getArrayInstance(ptrTo, array_size) {
        let inst = this._instances.find(i => i.ptrTo.isSameType(ptrTo) && i.array_size === array_size);
        if (!inst) {
            inst = new ArrayType(ptrTo, array_size);
            this._instances.push(inst);
        }
        return inst;
    }
    get size() {
        return 8;
    }
    asm_from_literal(context, name, literal, pos, should_alloc) {
        if (should_alloc) {
            if (this.array_size) {
                for (let i = 0; i < this.array_size; ++i) {
                    this.ptrTo.asm_from_literal(context, value_1.temp_t.t, null, pos, true);
                }
            }
            else if (literal !== null) {
                context.addAssembly(`
                    \rmovb $0, ${context.pushStack(char_type_1.CharType.getInstance().size)}(%rsp)
                `);
                const codes = (0, helper_1.convert_string_to_char_codes)(literal).reverse();
                for (const c of codes) {
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
                this.array_size = codes.length;
                return new value_1.Value(name, this, pos, context.stackPtr, value_type_1.AddrType.Stack);
            }
            context.addAssembly(`
                \rleaq ${context.stackPtr}(%rsp), %rdx
                \rmovq %rdx, ${context.pushStack(this.size)}(%rsp)
            `);
            return new value_1.Value(name, this, pos, context.stackPtr, value_type_1.AddrType.Stack);
        }
        else {
            return new value_1.Value(name, this, pos, null, value_type_1.AddrType.Stack);
        }
    }
}
exports.ArrayType = ArrayType;
