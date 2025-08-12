import { Context } from "./context";
import { TODO } from "./helper";
import { AddrType, CharType, IntType, Value, ValueType } from "./value_types";

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