"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Value = exports.FunctionType = exports.PtrType = exports.VoidType = exports.CharType = exports.IntType = void 0;
const helper_1 = require("./helper");
class IntType {
    static instance = null;
    constructor() {
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
    is_const = false;
    canAdd(value) {
        throw new Error("Method not implemented.");
    }
    canSubtract(value) {
        throw new Error("Method not implemented.");
    }
    canAssignTo(value) {
        throw new Error("Method not implemented.");
    }
    toString = () => {
        return this.is_const ? "const int" : "int";
    };
    size() { return 4; }
    asm_push_to_stack(context, assigned_value) {
        context.pushStack(this.size());
        context.addAssembly(`
            \rmovl $${assigned_value}, ${context.stackPtr}(%rsp)
            `);
        return context.stackPtr;
    }
}
exports.IntType = IntType;
class CharType {
    static instance = null;
    constructor() {
    }
    asm_push_to_stack(context, assigned_value) {
        context.pushStack(this.size());
        context.addAssembly(`
            \rmovb $${assigned_value} ${context.stackPtr}(%rsp)
            `);
        return context.stackPtr;
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
    canAdd(value) {
        throw new Error("Method not implemented.");
    }
    canSubtract(value) {
        throw new Error("Method not implemented.");
    }
    canAssignTo(value) {
        throw new Error("Method not implemented.");
    }
    toString = () => {
        return this.is_const ? "const char" : "char";
    };
    size() { return 1; }
}
exports.CharType = CharType;
class VoidType {
    static instance = null;
    constructor() {
    }
    asm_push_to_stack(context, assigned_value) {
        context.pushStack(this.size());
        context.addAssembly(`
            \rmovb $${assigned_value} ${context.stackPtr}(%rsp)
            `);
        return context.stackPtr;
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
    canAdd(value) {
        throw new Error("Method not implemented.");
    }
    canSubtract(value) {
        throw new Error("Method not implemented.");
    }
    canAssignTo(value) {
        throw new Error("Method not implemented.");
    }
    toString = () => {
        return "void";
    };
    size() { return 1; }
}
exports.VoidType = VoidType;
class PtrType {
    ptrTo;
    static instances = [];
    constructor(ptrTo) {
        this.ptrTo = ptrTo;
    }
    asm_push_to_stack(context, assigned_value) {
        if (this.ptrTo.isSameType(CharType.getInstance()) && !!assigned_value) {
            for (let i = assigned_value.length - 1; i > -1; --i) {
                context.pushStack(CharType.getInstance().size());
                context.addAssembly(`
                    \rmovb $${assigned_value.charCodeAt(i)}, ${context.stackPtr}(%rsp)
                    `);
            }
            return context.stackPtr;
        }
        (0, helper_1.TODO)();
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
    canAdd(value) {
        throw new Error("Method not implemented.");
    }
    canSubtract(value) {
        throw new Error("Method not implemented.");
    }
    canAssignTo(value) {
        throw new Error("Method not implemented.");
    }
    toString = () => {
        return this.is_const ? `${this.ptrTo.toString()} * const` : `${this.ptrTo.toString()} *`;
    };
    size() { return 8; }
}
exports.PtrType = PtrType;
class FunctionType {
    returnType;
    paramTypes;
    static instances = [];
    constructor(returnType, paramTypes) {
        this.returnType = returnType;
        this.paramTypes = paramTypes;
    }
    asm_push_to_stack(context, assigned_value) {
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
    canAdd(value) {
        throw new Error("Method not implemented.");
    }
    canSubtract(value) {
        throw new Error("Method not implemented.");
    }
    canAssignTo(value) {
        throw new Error("Method not implemented.");
    }
    toString = () => {
        return `${this.returnType.toString()} (${this.paramTypes.map((p) => p.toString()).join(', ')})`;
    };
    size() { return 8; }
}
exports.FunctionType = FunctionType;
class Value {
    name;
    valueType;
    address = null;
    constructor(name, valueType) {
        this.name = name;
        this.valueType = valueType;
    }
    toString = () => {
        return `Name: [${this.name}] Type: [${this.valueType.toString()}]`;
    };
    setValue(context, assigned_value) {
        this.address = this.valueType.asm_push_to_stack(context, assigned_value);
    }
    getAddress() {
        if (!this.address)
            throw new Error("Accessed before assigned");
        return this.address;
    }
}
exports.Value = Value;
