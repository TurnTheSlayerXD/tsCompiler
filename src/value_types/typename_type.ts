import { Context } from "../context";
import { UNREACHABLE } from "../helper";
import { DebugPosition } from "../lexer";
import { Value } from "../value";
import { ValueType } from "./value_type";


export class TypenameType extends ValueType {
    override from_literal(context: Context, literal: string, pos: DebugPosition): Value {
        UNREACHABLE();
    }
    private constructor(public typevalue: ValueType) {
        super();
    }

    static getInstance(typevalue: ValueType): TypenameType {
        return new TypenameType(typevalue);
    }

    toString: () => string = () => "typename";
    isSameType(type: ValueType): boolean {
        throw new Error('Method not implemented.');
    }
    get size(): number {
        throw new Error('Method not implemented.');
    }

}

