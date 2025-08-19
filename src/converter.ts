import { Context } from "./context";
import { TODO } from "./helper";
import { AddrType, CharType, IntType, MOV_I, PtrType, REG_I, Value, ValueType } from "./value_types";

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
        const new_value = new Value('_temp', IntType.getInstance(), lhs.pos, context.stackPtr, AddrType.Stack);
        return lhs.valueType instanceof CharType ? { ok: false, left: new_value, right: rhs } : { ok: false, left: lhs, right: new_value };
    }

    TODO('CONVERTION');
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

export function convert_val_to_type(context: Context, val: Value, type: ValueType): Value {
    if (val.valueType.isSameType(type)) {
        return val;
    }
    else if (val.valueType instanceof CharType && type instanceof IntType) {
        context.addAssembly(`
                    \rmovsbl ${val.stack_addr(context)}(%rsp), %edx
                    \rmovl %edx, ${context.pushStack(IntType.getInstance().size)}(%rsp)
                `);
        const new_value = new Value('_temp', IntType.getInstance(), val.pos, context.stackPtr, AddrType.Stack);
        return new_value;
    }
    TODO();
}