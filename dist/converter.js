"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert_values = convert_values;
exports.are_converible_types = are_converible_types;
exports.get_rax_i = get_rax_i;
exports.get_rcx_i = get_rcx_i;
exports.get_rdx_i = get_rdx_i;
exports.convert_val_to_type = convert_val_to_type;
const helper_1 = require("./helper");
const value_1 = require("./value");
const char_type_1 = require("./value_types/char_type");
const int_type_1 = require("./value_types/int_type");
const ptr_type_1 = require("./value_types/ptr_type");
const value_type_1 = require("./value_types/value_type");
const void_type_1 = require("./value_types/void_type");
function convert_values(context, lhs, rhs) {
    if (lhs.valueType.isSameType(rhs.valueType)) {
        return { ok: true, left: lhs, right: rhs };
    }
    else if ((lhs.valueType instanceof int_type_1.IntType || rhs.valueType instanceof int_type_1.IntType)
        && (lhs.valueType instanceof char_type_1.CharType || rhs.valueType instanceof char_type_1.CharType)) {
        const to_convert = lhs.valueType instanceof char_type_1.CharType ? lhs : rhs;
        context.addAssembly(`
                    \rmovsbl ${to_convert.stack_addr(context)}(%rsp), %edx
                    \rmovl %edx, ${context.pushStack(int_type_1.IntType.getInstance().size)}(%rsp)
                `);
        const new_value = new value_1.Value(value_1.temp_t.t, int_type_1.IntType.getInstance(), lhs.pos, context.stackPtr, value_type_1.AddrType.Stack);
        return lhs.valueType instanceof char_type_1.CharType ? { ok: false, left: new_value, right: rhs } : { ok: false, left: lhs, right: new_value };
    }
    (0, helper_1.TODO)('CONVERTION');
}
function is_numeric_type(type) {
    return type.isSameType(int_type_1.IntType.getInstance()) || type.isSameType(char_type_1.CharType.getInstance());
}
function are_converible_types(lhs, rhs) {
    if (is_numeric_type(lhs) && is_numeric_type(rhs)) {
        return true;
    }
    if (lhs instanceof ptr_type_1.PtrType && rhs instanceof ptr_type_1.PtrType) {
        while (lhs instanceof ptr_type_1.PtrType && rhs instanceof ptr_type_1.PtrType) {
            lhs = lhs.ptrTo;
            rhs = rhs.ptrTo;
            if (!(lhs instanceof ptr_type_1.PtrType) && !(rhs instanceof ptr_type_1.PtrType) && (lhs instanceof void_type_1.VoidType || rhs instanceof void_type_1.VoidType)) {
                return true;
            }
        }
        return are_converible_types(lhs, rhs);
    }
    return false;
}
function get_rax_i(size) {
    switch (size) {
        case 8: return [value_type_1.REG_I.rax, value_type_1.MOV_I.movq];
        case 4: return [value_type_1.REG_I.eax, value_type_1.MOV_I.movl];
        case 1: return [value_type_1.REG_I.al, value_type_1.MOV_I.movb];
        default: (0, helper_1.TODO)();
    }
}
function get_rcx_i(size) {
    switch (size) {
        case 8: return [value_type_1.REG_I.rcx, value_type_1.MOV_I.movq];
        case 4: return [value_type_1.REG_I.eax, value_type_1.MOV_I.movl];
        case 1: return [value_type_1.REG_I.cx, value_type_1.MOV_I.movb];
        default: (0, helper_1.TODO)();
    }
}
function get_rdx_i(size) {
    switch (size) {
        case 8: return [value_type_1.REG_I.rdx, value_type_1.MOV_I.movq];
        case 4: return [value_type_1.REG_I.edx, value_type_1.MOV_I.movl];
        case 1: return [value_type_1.REG_I.dh, value_type_1.MOV_I.movb];
        default: (0, helper_1.TODO)();
    }
}
function convert_val_to_type(context, val, to_type) {
    if (val.valueType.isSameType(to_type)) {
        return val;
    }
    else if (val.valueType instanceof char_type_1.CharType && to_type instanceof int_type_1.IntType) {
        context.addAssembly(`
                    \rmovsbl ${val.stack_addr(context)}(%rsp), %edx
                    \rmovl %edx, ${context.pushStack(int_type_1.IntType.getInstance().size)}(%rsp)
                `);
        const new_value = new value_1.Value(value_1.temp_t.t, int_type_1.IntType.getInstance(), val.pos, context.stackPtr, value_type_1.AddrType.Stack);
        return new_value;
    }
    if (val.valueType instanceof ptr_type_1.PtrType && to_type instanceof ptr_type_1.PtrType) {
        let lhs = val.valueType;
        let rhs = to_type;
        while (lhs instanceof ptr_type_1.PtrType && rhs instanceof ptr_type_1.PtrType) {
            lhs = lhs.ptrTo;
            rhs = rhs.ptrTo;
        }
        if (!(lhs instanceof ptr_type_1.PtrType) && !(rhs instanceof ptr_type_1.PtrType) && (lhs instanceof void_type_1.VoidType || rhs instanceof void_type_1.VoidType)) {
            val.valueType = to_type;
            return val;
        }
        (0, helper_1.throwError)(new helper_1.TypeError(val.pos, `Unable to convert ptr of type ${val.valueType} to ptr of type ${to_type}`));
    }
    (0, helper_1.TODO)(`Conversion from ${val.valueType} to ${to_type}`);
}
