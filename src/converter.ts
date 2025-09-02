import { Context } from "./context";
import { throwError, TODO, TypeError } from "./helper";
import { Position } from "./lexer";
import { temp_t, Value } from "./value";
import { CharType } from "./value_types/char_type";
import { IntType } from "./value_types/int_type";
import { PtrType } from "./value_types/ptr_type";
import { AddrType, ValueType, REG_I, MOV_I } from "./value_types/value_type";
import { VoidType } from "./value_types/void_type";

type ConversionResult = { ok: boolean, left: Value, right: Value };

export function convert_values(context: Context, lhs: Value, rhs: Value): ConversionResult {
    if (lhs.valueType.isSameType(rhs.valueType)) {
        return { ok: true, left: lhs, right: rhs };
    }
    else if ((lhs.valueType instanceof IntType || rhs.valueType instanceof IntType)
        && (lhs.valueType instanceof CharType || rhs.valueType instanceof CharType)) {
        const to_convert = lhs.valueType instanceof CharType ? lhs : rhs;
        context.addAssembly(`
                    \rmovsbl ${to_convert.stack_addr(context)}(%rsp), %edx
                    \rmovl %edx, ${context.pushStack(IntType.getInstance().size)}(%rsp)
                `);
        const new_value = new Value(temp_t.t, IntType.getInstance(), lhs.pos, context.stackPtr, AddrType.Stack);
        return lhs.valueType instanceof CharType ? { ok: false, left: new_value, right: rhs } : { ok: false, left: lhs, right: new_value };
    }
    if (lhs.valueType instanceof PtrType && rhs.valueType instanceof PtrType) {
        let lhs_type: ValueType = lhs.valueType;
        let rhs_type: ValueType = rhs.valueType;
        while (lhs_type instanceof PtrType && rhs_type instanceof PtrType) {
            lhs_type = lhs_type.ptrTo;
            rhs_type = rhs_type.ptrTo;
        }
        if (!(lhs_type instanceof PtrType) && !(rhs_type instanceof PtrType) && (lhs_type instanceof VoidType || rhs_type instanceof VoidType)) {
            return { ok: true, left: lhs, right: rhs };
        }
        throwError(new TypeError(lhs.pos, `Unable to convert ptr of type ${lhs.valueType} to ptr of type ${rhs}`))
    }

    TODO(`CONVERTION:\nlhs: ${lhs}\nrhs: ${rhs}`);
}

function is_numeric_type(type: ValueType): boolean {
    return type.isSameType(IntType.getInstance()) || type.isSameType(CharType.getInstance());
}

export function are_converible_types(lhs: ValueType, rhs: ValueType): boolean {
    if (is_numeric_type(lhs) && is_numeric_type(rhs)) {
        return true;
    }
    if (lhs instanceof PtrType && rhs instanceof PtrType) {
        while (lhs instanceof PtrType && rhs instanceof PtrType) {
            lhs = lhs.ptrTo;
            rhs = rhs.ptrTo;
            if ((!(lhs instanceof PtrType) && !(rhs instanceof PtrType) && (lhs instanceof VoidType || rhs instanceof VoidType)) || lhs.isSameType(rhs)) {
                return true;
            }
        }
        return are_converible_types(lhs, rhs);
    }
    return false;
}

export function get_rax_i(size: number): [REG_I, MOV_I] {
    switch (size) {
        case 8: return [REG_I.rax, MOV_I.movq];
        case 4: return [REG_I.eax, MOV_I.movl];
        case 1: return [REG_I.al, MOV_I.movb];
        default: TODO();
    }
}

export function get_rcx_i(size: number): [REG_I, MOV_I] {
    switch (size) {
        case 8: return [REG_I.rcx, MOV_I.movq];
        case 4: return [REG_I.eax, MOV_I.movl];
        case 1: return [REG_I.cx, MOV_I.movb];
        default: TODO();
    }
}
export function get_rdx_i(size: number): [REG_I, MOV_I] {
    switch (size) {
        case 8: return [REG_I.rdx, MOV_I.movq];
        case 4: return [REG_I.edx, MOV_I.movl];
        case 1: return [REG_I.dh, MOV_I.movb];
        default: TODO();
    }
}

export function convert_val_to_type(context: Context, val: Value, to_type: ValueType): Value {
    if (val.valueType.isSameType(to_type)) {
        return val;
    }
    else if (val.valueType instanceof CharType && to_type instanceof IntType) {
        context.addAssembly(`
                    \rmovsbl ${val.stack_addr(context)}(%rsp), %edx
                    \rmovl %edx, ${context.pushStack(IntType.getInstance().size)}(%rsp)
                `);
        const new_value = new Value(temp_t.t, IntType.getInstance(), val.pos, context.stackPtr, AddrType.Stack);
        return new_value;
    }
    if (val.valueType instanceof PtrType && to_type instanceof PtrType) {
        let lhs: ValueType = val.valueType;
        let rhs: ValueType = to_type;
        while (lhs instanceof PtrType && rhs instanceof PtrType) {
            lhs = lhs.ptrTo;
            rhs = rhs.ptrTo;
        }
        if (!(lhs instanceof PtrType) && !(rhs instanceof PtrType) && (lhs instanceof VoidType || rhs instanceof VoidType)) {
            val.valueType = to_type;
            return val;
        }
        throwError(new TypeError(val.pos, `Unable to convert ptr of type ${val.valueType} to ptr of type ${to_type}`))
    }
    TODO(`Conversion from ${val.valueType} to ${to_type}`);
}