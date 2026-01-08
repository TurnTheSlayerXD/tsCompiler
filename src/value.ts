import { Context } from "./context";
import { MemLocation, MovInstr } from "./instruction/instruction";
import { IndirectStackLoc, Register, IndirectRegister } from "./instruction/mem_location";
import { DebugPosition } from "./lexer";
import { ValueType } from "./value_types/value_type";


export class Value {
    public constructor(private memLoc: MemLocation, public valueType: ValueType, public pos: DebugPosition) {
    }
    public toMemLoc(context: Context): MemLocation {
        if (this.memLoc instanceof IndirectStackLoc) {
            const dstRegister = Register.getRegisterForIndirect();
            context.addInstruction(new MovInstr("movq", dstRegister, this.memLoc));
            return new IndirectRegister(dstRegister);
        } 1
        return this.memLoc;
    }
}

export class NamedValue extends Value {
    constructor(public name: string, location: MemLocation, valueType: ValueType, pos: DebugPosition) {
        super(location, valueType, pos);
    }

    public override toString = (): string => {
        return `Value ${JSON.stringify(this)}`;
    }
}

export class __IndirectValue extends Value {


}