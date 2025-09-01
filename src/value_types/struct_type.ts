import { Context } from "../context";
import { throwError, TokenParserError, UNREACHABLE } from "../helper";
import { Position, Token } from "../lexer";
import { TokenType } from "../token_type";
import { temp_t, Value } from "../value";
import { AddrType, MOV_I, REG_I, ValueType } from "./value_type";



export class StructType implements ValueType {
    private static _instances: StructType[] = [];
    is_const: boolean = false;
    public fields: { name: string, type: ValueType, offset: number }[];

    public _size: number | null;
    private constructor(public struct_name: string) {
        this.fields = [];
        this._size = null;
    }

    toString: () => string = (): string => {
        return `[struct ${this.struct_name}]`
    };
    isSameType(type: ValueType): boolean {
        if (!(type instanceof StructType)) {
            return false;
        }
        return type.struct_name === this.struct_name;
    }

    static getInstance(struct_name: string): StructType {
        const new_type = new StructType(struct_name);
        let old_type;
        if ((old_type = StructType._instances.find(v => v.isSameType(new_type)))) {
            return old_type;
        }
        StructType._instances.push(new_type);
        return new_type;
    }


    get size(): number {
        return this._size ?? UNREACHABLE();
    }
    asm_from_literal(context: Context, name: string | temp_t, literal: string | null, pos: Position, should_alloc: boolean): Value {
        if (should_alloc) {
            for (let _ = 0; _ < this.size; ++_) {
                context.addAssembly(`
                    \rmovq $0, ${context.pushStack(1)}(%rsp)
                `);
            }
            return new Value(name, this, pos, context.stackPtr, AddrType.Stack);
        }
        return new Value(name, this, pos, null, AddrType.Stack);
    }
    asm_from_dot(context: Context, src: Value, field_name: Token): Value {
        src.valueType.isSameType(this) && field_name.type === TokenType.NAME || UNREACHABLE();

        const struct_field = this.fields.find(f => f.name === field_name.text) ?? throwError(new TokenParserError(field_name, `No field [${field_name.text} on struct ${this.struct_name}]`));

        if (src.addr_type == AddrType.Indirect) {
            context.addAssembly(`
                    \raddq $${struct_field.offset}, ${src._address}(%rsp)
                `);
            return new Value(temp_t.t, struct_field.type, field_name.pos, src._address, AddrType.Indirect);
        }
        return new Value(temp_t.t, struct_field.type, field_name.pos, (src._address ?? UNREACHABLE()) + struct_field.offset, AddrType.Stack);
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

