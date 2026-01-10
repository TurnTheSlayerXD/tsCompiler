import { Context } from "../context";
import { throwError, UNREACHABLE } from "../helper";
import { DebugPosition } from "../lexer";
import { Value } from "../value";
import { ValueType } from "./value_type";

export class FunctionType extends ValueType {

    private static instances: FunctionType[] = [];
    private constructor(public returnType: ValueType, public paramTypes: ValueType[]) { super(); }

    static getInstance(returnType: ValueType, paramTypes: ValueType[]): FunctionType {
        const new_inst = new FunctionType(returnType, paramTypes);
        const ret = this.instances.find(tp => tp.isSameType(new_inst));
        if (!ret) {
            this.instances.push(new_inst);
        }
        return this.instances.find(tp => tp.isSameType(new_inst)) ?? UNREACHABLE();
    }



    override isSameType(rhs: ValueType): boolean {
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
            if (!(this.paramTypes[i]!.isSameType(rhs.paramTypes[i]!))) {
                return false;
            }
        }
        return true;
    }

    public override toString = (): string => {
        return `${this.returnType.toString()} (${this.paramTypes.map((p) => p.toString()).join(', ')})`;
    }
    get size(): number { return 8; }

    override from_literal(context: Context, literal: string, pos: DebugPosition): Value {
        UNREACHABLE();
    }

}
