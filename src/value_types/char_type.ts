import { Context } from "../context";
import { convert_string_to_char_codes, throwError } from "../helper";
import { get_mov_i_on_size, MovInstr, MovLiteralInstr } from "../instruction/instruction";
import { LiteralMemLocation } from "../instruction/mem_location";
import { DebugPosition } from "../lexer";
import { Value } from "../value";
import { ValueType } from "./value_type";

export class CharType extends ValueType {

    static instance: CharType | null = null;
    is_const: boolean = false;

    private constructor() {
        super();
    }

    override isSameType(type: ValueType): boolean {
        return type instanceof CharType;
    }

    get size(): number {
        return 1;
    }

    override toString = (): string => {
        return this.is_const ? "const char" : "char";
    }

    override from_literal(context: Context, literal: string, pos: DebugPosition): Value {
        const memLoc = context.getNewMemLocation(this);
        const newValue = new Value(memLoc, this, pos);

        const numLiteral = convert_string_to_char_codes(literal);
        if (numLiteral.length !== 1) {
            throwError(new Error("expected char to be one character"));
        }

        context.addInstruction(new MovInstr(get_mov_i_on_size(1), memLoc, new LiteralMemLocation(numLiteral[0]!)));

        return newValue;
    }

    static getInstance(): CharType {
        if (!this.instance) {
            this.instance = new CharType();
        }
        return this.instance;
    }
}

