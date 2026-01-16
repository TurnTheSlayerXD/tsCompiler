import { Context } from "./context";
import { MovInstr } from "./instruction/instruction";
import { IndirectStackLoc, Register, IndirectRegister, MemLocation } from "./instruction/mem_location";
import { DebugPosition } from "./lexer";
import { ValueType } from "./value_types/value_type";


export class Value {
    public constructor(public _srcMemLoc: MemLocation, public valueType: ValueType, public pos: DebugPosition) {
    }

    public toString = (): string => {
        return `Value ${{}}`;
    }
}

export class NamedValue extends Value {
    constructor(public name: string, value: Value) {
        super(value._srcMemLoc, value.valueType, value.pos);
    }

    public override toString = (): string => {
        return `Named Value ${[`name: ${this.name}`, `type: ${this.valueType}`, `pos: ${this.pos}`]}`;
    }
}

export function valueToMemLoc(value: Value, context: Context): MemLocation {
    if (value._srcMemLoc instanceof IndirectStackLoc) {
        const dstRegister = Register.forIndirect();
        context.addInstruction(new MovInstr("movq", dstRegister, value._srcMemLoc));
        return new IndirectRegister(dstRegister);
    }
    return value._srcMemLoc;
}