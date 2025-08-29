import { Context } from "../context";
import { UNREACHABLE, TODO } from "../helper";
import { Position } from "../lexer";
import { Value } from "../value";
import { ValueType, REG_I, MOV_I } from "./value_type";

export class VoidType implements ValueType {
    static instance: VoidType | null = null;
    private constructor() {
    }
    asm_from_percent(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_to_boolean(context: Context, self: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        TODO();
    }
    get reg_i(): REG_I {
        throw new Error('Method not implemented.');
    }
    get mov_i(): MOV_I {
        throw new Error('Method not implemented.');
    }
    asm_cmp_less(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_cmp_greater(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_cmp_equal(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_cmp_not_equal(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_cmp_less_or_equal(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_cmp_greater_or_equal(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_copy(context: Context, src: Value, dst_self: Value): void {
        throw new Error('Method not implemented.');
    }
    asm_from_literal(context: Context, name: string, literal: string | null, pos: Position): Value {
        throw new Error('Method not implemented.');
    }
    asm_create_from_variable(context: Context, name: string, value: Value, pos: Position): Value {
        throw new Error('Method not implemented.');
    }
    asm_from_plus(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_from_minus(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_from_multiply(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_from_divide(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_load_to_address_in_rax(context: Context, self: Value, l_value: ValueType): Value {
        throw new Error('Method not implemented.');
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

    public toString = (): string => {
        return "void";
    }


    get size(): number { return 1; }
}
