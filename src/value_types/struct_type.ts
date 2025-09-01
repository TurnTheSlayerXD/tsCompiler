import { Context } from "../context";
import { throwError } from "../helper";
import { Position } from "../lexer";
import { temp_t, Value } from "../value";
import { MOV_I, REG_I, ValueType } from "./value_type";



export class StructType implements ValueType {
    private static _instances: StructType[] = [];
    is_const: boolean = false;
    private constructor(public fields: { name: string, type: ValueType }[], public struct_name: string) {
    }

    toString: () => string = (): string => {
        return `struct ${this.fields.join('')}`
    };
    isSameType(type: ValueType): boolean {
        if (!(type instanceof StructType)) {
            return false;
        }
        if (type.struct_name === this.struct_name) {
            const min_len = this.fields.length < type.fields.length ? this.fields.length : type.fields.length;
            for (let i = 0; i < min_len; ++i) {
                if (!this.fields[i]!.type.isSameType(type.fields[i]!.type)) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }

    static getInstance(struct_name: string, fields: { name: string, type: ValueType }[]): StructType {
        const new_type = new StructType(fields, struct_name);
        let old_type;
        if ((old_type = StructType._instances.find(v => v.isSameType(new_type)))) {
            return old_type;
        }
        StructType._instances.push(new_type);
        return new_type;
    }


    get size(): number {
        throw new Error("Method not implemented.");
    }
    asm_from_literal(context: Context, name: string | temp_t, literal: string | null, pos: Position, should_alloc: boolean): Value {
        throw new Error("Method not implemented.");
    }
    asm_copy(context: Context, dst: Value, src: Value): void {
        throw new Error("Method not implemented.");
    }
    asm_from_plus(context: Context, self: Value, rhs: Value): Value {
        throw new Error("Method not implemented.");
    }
    asm_from_minus(context: Context, self: Value, rhs: Value): Value {
        throw new Error("Method not implemented.");
    }
    asm_from_multiply(context: Context, self: Value, rhs: Value): Value {
        throw new Error("Method not implemented.");
    }
    asm_from_divide(context: Context, self: Value, rhs: Value): Value {
        throw new Error("Method not implemented.");
    }
    asm_from_percent(context: Context, self: Value, rhs: Value): Value {
        throw new Error("Method not implemented.");
    }
    asm_cmp_less(context: Context, self: Value, rhs: Value): Value {
        throw new Error("Method not implemented.");
    }
    asm_cmp_greater(context: Context, self: Value, rhs: Value): Value {
        throw new Error("Method not implemented.");
    }
    asm_cmp_equal(context: Context, self: Value, rhs: Value): Value {
        throw new Error("Method not implemented.");
    }
    asm_cmp_not_equal(context: Context, self: Value, rhs: Value): Value {
        throw new Error("Method not implemented.");
    }
    asm_cmp_less_or_equal(context: Context, self: Value, rhs: Value): Value {
        throw new Error("Method not implemented.");
    }
    asm_cmp_greater_or_equal(context: Context, self: Value, rhs: Value): Value {
        throw new Error("Method not implemented.");
    }
    asm_to_boolean(context: Context, self: Value): Value {
        throw new Error("Method not implemented.");
    }
    get reg_i(): REG_I {
        throw new Error("Method not implemented.");
    }
    get mov_i(): MOV_I {
        throw new Error("Method not implemented.");
    }

}

