import { Context } from "../context";
import { throwError } from "../helper";
import { Position } from "../lexer";
import { Value } from "../value";
import { ValueType, MOV_I, REG_I } from "./value_type";

export class FunctionType implements ValueType {
    get mov_i(): MOV_I { return MOV_I.movq }
    private static instances: FunctionType[] = [];

    private constructor(public returnType: ValueType, public paramTypes: ValueType[]) { }
    asm_from_percent(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_to_boolean(context: Context, self: Value): Value {
        throw new Error('Method not implemented.');
    }
    get reg_i(): REG_I {
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
    static getInstance(returnType: ValueType, paramTypes: ValueType[]): FunctionType {
        const new_inst = new FunctionType(returnType, paramTypes);
        const ret = this.instances.find(tp => tp.isSameType(new_inst));
        if (!ret) {
            this.instances.push(new_inst);
        }
        return this.instances.find(tp => tp.isSameType(new_inst)) ?? throwError(new Error('wtf'));
    }
    isSameType(rhs: ValueType): boolean {
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


    is_const: boolean = false;
    public toString = (): string => {
        return `${this.returnType.toString()} (${this.paramTypes.map((p) => p.toString()).join(', ')})`;
    }
    get size(): number { return 8; }
}
