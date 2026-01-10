import { Context } from "../context";
import { LeaqInstruction, MovInstr } from "../instruction/instruction";
import { LiteralMemLocation, MemLocation, Register } from "../instruction/mem_location";
import { DebugPosition } from "../lexer";
import { Value } from "../value";
import { PtrType } from "./ptr_type";
import { ValueType } from "./value_type";

export class ArrayType extends PtrType {
    private static _instances: ArrayType[] = [];
    private constructor(ptrTo: ValueType, public array_size: number | null) {
        super(ptrTo);
    }

    override toString: () => string = () => `(${this.ptrTo}) [], size=${this.array_size}`;
    override isSameType(type: ValueType): boolean {
        if ((type instanceof PtrType || type instanceof ArrayType) && type.ptrTo.isSameType(this.ptrTo)) {
            return true;
        }
        return false;
    }

    static getArrayInstance(ptrTo: ValueType, array_size: number): ArrayType {
        let inst: ArrayType | undefined = this._instances.find(i => i.ptrTo.isSameType(ptrTo) && i.array_size === array_size);
        if (!inst) {
            inst = new ArrayType(ptrTo, array_size);
            this._instances.push(inst);
        }
        return inst;
    }
    override get size(): number {
        return 8;
    }


    from_params(context: Context, params: Value[], debugPos: DebugPosition): Value {
        if (params.length > 0) {
            const valueType = params[0]!.valueType;
            let memloc: MemLocation;
            for (const src of params) {
                memloc = context.getNewMemLocation(valueType);
                const dst = new Value(memloc, valueType, src.pos);
                valueType.copy_to(context, dst, src);
            }
            const lastMemLoc = memloc!;
            context.addInstruction(new LeaqInstruction("leaq", Register.getInstance("rdx"), lastMemLoc));

            const arrayType = ArrayType.getArrayInstance(valueType, params.length);
            const arrayMemLoc = context.getNewMemLocation(arrayType);
            const arrayVal = new Value(arrayMemLoc, arrayType, debugPos);
            context.addInstruction(new MovInstr("movq", arrayMemLoc, Register.getInstance("rdx")));

            return arrayVal;
        }
        const memloc = context.getNewMemLocation(this);
        context.addInstruction(new MovInstr("movq", memloc, new LiteralMemLocation(0)));
        return new Value(memloc, this, debugPos);
    }
}

