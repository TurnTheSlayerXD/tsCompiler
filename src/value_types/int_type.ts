
import { Context } from "../context";
import { DebugPosition } from "../lexer";
import { Value } from "../value";
import { ValueType } from "./value_type";

export class IntType extends ValueType {
    static instance: IntType | null = null;

    private constructor() {
        super();
    }

    override get size(): number {
        return 4;
    }

    isSameType(type: ValueType): boolean {
        return type instanceof IntType;
    }

    static getInstance(): IntType {
        if (!this.instance) {
            this.instance = new IntType();
        }
        return this.instance;
    }

    public toString = (): string => {
        return "int";
    }


    override from_literal(context: Context, literal: string, pos: DebugPosition): Value {

    }
}
