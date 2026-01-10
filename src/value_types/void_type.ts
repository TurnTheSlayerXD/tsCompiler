import { Context } from "../context";
import { UNREACHABLE } from "../helper";
import { DebugPosition } from "../lexer";
import { Value } from "../value";
import { ValueType } from "./value_type";

export class VoidType extends ValueType {


    static instance: VoidType | null = null;
    private constructor() {
        super();
    }

    static getInstance(): VoidType {
        if (!this.instance) {
            this.instance = new VoidType();
        }
        return this.instance;
    }

    isSameType(type: ValueType): boolean {
        return type instanceof VoidType;
    }
    is_const: boolean = false;

    public override toString = (): string => {
        return "void";
    }

    override from_literal(context: Context, literal: string, pos: DebugPosition): Value {
        UNREACHABLE();
    }

    override from_plus(context: Context, self: Value, other: Value): Value {
        UNREACHABLE();
    }

    override from_minus(context: Context, self: Value, other: Value): Value {
        UNREACHABLE();
    }

    override from_multiply(context: Context, self: Value, other: Value): Value {
        UNREACHABLE();
    }

    override from_divide(context: Context, self: Value, other: Value): Value {
        UNREACHABLE();
    }
    override from_percent(context: Context, self: Value, other: Value): Value {
        UNREACHABLE();
    }
    override cmp_equal(context: Context, self: Value, other: Value): Value {
        UNREACHABLE();
    }
    override cmp_not_equal(context: Context, self: Value, other: Value): Value {
        UNREACHABLE();
    }
    override cmp_greater(context: Context, self: Value, other: Value): Value {
        UNREACHABLE();
    }
    override cmp_less(context: Context, self: Value, other: Value): Value {
        UNREACHABLE();
    }
    override cmp_greater_or_equal(context: Context, self: Value, other: Value): Value {
        UNREACHABLE();
    }
    override cmp_less_or_equal(context: Context, self: Value, other: Value): Value {
        UNREACHABLE();
    }

    get size(): number { return 0; }
}
