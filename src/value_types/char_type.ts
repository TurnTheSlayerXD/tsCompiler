import { Context } from "../context";
import { convert_string_to_char_codes, throwError } from "../helper";
import { CmpInstr, JniInstr } from "../instruction/comparison_instruction";
import { get_mov_i_on_size, MovInstr, StringInstruction } from "../instruction/instruction";
import { LiteralMemLocation, Register } from "../instruction/mem_location";
import { DebugPosition } from "../lexer";
import { Value, valueToMemLoc } from "../value";
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

    private from_AND_OR_EXPR(operator: "andb"| "orb", context: Context, lhs: Value, rhs: Value): Value {

        const leftBool = valueToMemLoc(lhs.valueType.to_boolean(context, lhs), context);
        const rightBool = valueToMemLoc(rhs.valueType.to_boolean(context, rhs), context);

        const memloc = context.getNewMemLocation(this);
        const newVar = new Value(memloc, this, lhs.pos);
        context.addInstruction(new MovInstr("movb", Register.getInstance("dh"), leftBool));
        context.addInstruction(new MovInstr("movb", Register.getInstance("al"), rightBool));

        context.addInstruction(new StringInstruction(`${operator} %dh, %al`));
        context.addInstruction(new MovInstr("movb", memloc, LiteralMemLocation.staticOne()));

        context.addInstruction(new CmpInstr("cmpb", LiteralMemLocation.staticNull(), Register.getInstance("al")));

        const markToJump = context.getNewMarkToJump();
        context.addInstruction(new JniInstr("jne", markToJump));
        context.addInstruction(new MovInstr("movb", memloc, LiteralMemLocation.staticNull()));
        context.addInstruction(markToJump);
        return newVar;
    }

    from_AND_expr(context: Context, lhs: Value, rhs: Value): Value {
        return this.from_AND_OR_EXPR("andb", context, lhs, rhs);
    }
    from_OR_expr(context: Context, lhs: Value, rhs: Value): Value {
        return this.from_AND_OR_EXPR("orb", context, lhs, rhs);
    }

    static getInstance(): CharType {
        if (!this.instance) {
            this.instance = new CharType();
        }
        return this.instance;
    }
}

