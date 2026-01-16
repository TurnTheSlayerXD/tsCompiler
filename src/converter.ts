import { Context } from "./context";
import { DebugPosError, throwError, TODO, UNREACHABLE } from "./helper";
import { MovInstr } from "./instruction/instruction";
import { Register } from "./instruction/mem_location";
import { Value, valueToMemLoc } from "./value";
import { CharType } from "./value_types/char_type";
import { IntType } from "./value_types/int_type";
import { PtrType } from "./value_types/ptr_type";
import { ValueType } from "./value_types/value_type";
import { VoidType } from "./value_types/void_type";

type ConversionResult = { lhs: Value, rhs: Value };

export function convert_values_or_throw(context: Context, lhsVar: Value, rhsVar: Value): ConversionResult {
    const { ok, lhs, rhs } = convert_values(context, lhsVar, rhsVar);

    if (!ok) {
        throwError(new DebugPosError(lhs.pos, `Cannot convert ${lhsVar} to ${rhsVar}`));
    }
    return { lhs, rhs };
}

function privateCharToInt(context: Context, value: Value) {
    const varToConvert = value;
    const memlocConverted = context.getNewMemLocation(IntType.getInstance());
    const bufRegister = Register.getInstance("ebx");
    context.addInstruction(new MovInstr("movsbl", bufRegister, valueToMemLoc(varToConvert, context)));
    context.addInstruction(new MovInstr("movl", memlocConverted, bufRegister));
    return new Value(memlocConverted, IntType.getInstance(), value.pos);
}

export function convert_values(context: Context, lhs: Value, rhs: Value): ConversionResult & { ok: boolean } {

    const intAndChar = [IntType.getInstance(), CharType.getInstance()];

    if (lhs.valueType.isSameType(rhs.valueType)) {
        return { ok: true, lhs: lhs, rhs: rhs };
    }
    else if (lhs.valueType instanceof CharType && rhs.valueType instanceof IntType) {
        const convertedValue = privateCharToInt(context, lhs);
        return { ok: true, lhs: convertedValue, rhs };
    }
    else if (rhs.valueType instanceof CharType && lhs.valueType instanceof IntType) {
        const convertedValue = privateCharToInt(context, rhs);
        return { ok: true, lhs, rhs: convertedValue };
    }
    if (lhs.valueType instanceof PtrType && rhs.valueType instanceof PtrType) {
        let lhs_type: ValueType = lhs.valueType;
        let rhs_type: ValueType = rhs.valueType;
        while (lhs_type instanceof PtrType && rhs_type instanceof PtrType) {
            lhs_type = lhs_type.ptrTo;
            rhs_type = rhs_type.ptrTo;
        }
        if (!(lhs_type instanceof PtrType) && !(rhs_type instanceof PtrType) && (lhs_type instanceof VoidType || rhs_type instanceof VoidType)) {
            return { ok: true, lhs, rhs };
        }
        throwError(new DebugPosError(lhs.pos, `Unable to convert ptr of type ${lhs.valueType} to ptr of type ${rhs}`))
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

export function convert_val_to_type(context: Context, val: Value, to_type: ValueType): Value {
    if (val.valueType.isSameType(to_type)) {
        return val;
    }
    else if (val.valueType instanceof CharType && to_type instanceof IntType) {
        const memlocConverted = context.getNewMemLocation(IntType.getInstance());
        const bufRegister = Register.getInstance("ebx");
        context.addInstruction(new MovInstr("movsbl", bufRegister, valueToMemLoc(val, context)));
        context.addInstruction(new MovInstr("movl", memlocConverted, bufRegister));
        const convertedValue = new Value(memlocConverted, IntType.getInstance(), val.pos);
        return convertedValue;
    }
    else if (val.valueType instanceof IntType && to_type instanceof CharType) {
        return new Value(val._srcMemLoc, CharType.getInstance(), val.pos);
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
        throwError(new DebugPosError(val.pos, `Unable to convert ptr of type ${val.valueType} to ptr of type ${to_type}`))
    }
    TODO(`Conversion from ${val.valueType} to ${to_type}`);
}