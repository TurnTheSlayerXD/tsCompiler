import { Context } from './context';
import { are_converible_types, convert_values } from './converter';
import { convert_string_to_char_codes, ParserError, RulesError, throwError, TODO, TokenParserError, TypeError, UNREACHABLE } from './helper';
import { Position } from './lexer';
import { temp_t, Value } from './value';
import { MOV_I, REG_I, ValueType } from './value_types/value_type';


export class TypenameType implements ValueType {
    is_const: boolean = false;
    private constructor(public typevalue: ValueType) {

    }

    toString: () => string = () => "typename";
    isSameType(type: ValueType): boolean {
        throw new Error('Method not implemented.');
    }
    get size(): number {
        throw new Error('Method not implemented.');
    }
    asm_from_literal(context: Context, name: string, literal: string | null, pos: Position): Value {
        throw new Error('Method not implemented.');
    }
    asm_copy(context: Context, dst: Value, src: Value): void {
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
    asm_from_percent(context: Context, self: Value, rhs: Value): Value {
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
    asm_to_boolean(context: Context, self: Value): Value {
        throw new Error('Method not implemented.');
    }
    get reg_i(): REG_I {
        throw new Error('Method not implemented.');
    }
    get mov_i(): MOV_I {
        throw new Error('Method not implemented.');
    }

}

