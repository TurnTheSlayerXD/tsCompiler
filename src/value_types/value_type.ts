import { Context } from "../context";
import { convert_values_or_throw } from "../converter";
import { DebugPosError, throwError, TODO, UNREACHABLE } from "../helper";
import { DivInstruction, get_div_i_on_sizeoftype, MulInstruction, PlusInstruction, SubInstruction } from "../instruction/binary_op_instruction";
import { CmpInstr, get_cmp_i_on_size, JniInstr } from "../instruction/comparison_instruction";
import { get_mov_i_on_size, MovInstr, StringInstruction } from "../instruction/instruction";
import { LiteralMemLocation, Register } from "../instruction/mem_location";
import { DebugPosition } from "../lexer";
import { Value, valueToMemLoc } from "../value";
import { CharType } from "./char_type";

export abstract class ValueType {
    abstract toString: () => string;

    abstract isSameType(type: ValueType): boolean;

    abstract get size(): number;


    abstract from_literal(context: Context, literal: string, pos: DebugPosition): Value;

    to_boolean(context: Context, self: Value): Value {
        const memLoc = context.getNewMemLocation(CharType.getInstance());
        const newValue = new Value(memLoc, CharType.getInstance(), self.pos);

        context.addInstruction(new MovInstr("movb", memLoc, new LiteralMemLocation(1)));
        context.addInstruction(new CmpInstr(get_cmp_i_on_size(this.size), LiteralMemLocation.staticNull(), memLoc));

        const mark = context.getNewMarkToJump();
        context.addInstruction(new JniInstr("jne", mark));
        context.addInstruction(new MovInstr("movb", memLoc, LiteralMemLocation.staticNull()));
        context.addInstruction(mark);
        return newValue;
    }


    from_null(context: Context, pos: DebugPosition): Value {
        const newMemLoc = context.getNewMemLocation(this);
        const newValue = new Value(newMemLoc, this, pos);
        context.addInstruction(new MovInstr(get_mov_i_on_size(this.size), newMemLoc, LiteralMemLocation.staticNull()));
        return newValue;
    }

    copy_to(context: Context, dst: Value, src: Value): void {
        if (!this.isSameType(src.valueType) || !this.isSameType(dst.valueType)) {
            throwError(new DebugPosError(src.pos, `Unmatched types: dst = ${dst.valueType} | src = ${src.valueType}`));
        }

        const register = Register.getFrom("bx", src.valueType.size);
        context.addInstruction(new MovInstr(get_mov_i_on_size(src.valueType.size), register, valueToMemLoc(src, context)));
        context.addInstruction(new MovInstr(get_mov_i_on_size(src.valueType.size), valueToMemLoc(dst, context), register));
    }

    cmp_equal(context: Context, self: Value, other: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        return JniInstr.generateAsm(context, "je", self, other);
    }

    cmp_not_equal(context: Context, self: Value, other: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        return JniInstr.generateAsm(context, "jne", self, other);
    }

    cmp_less_or_equal(context: Context, self: Value, other: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        return JniInstr.generateAsm(context, "jle", self, other);
    }

    cmp_greater_or_equal(context: Context, self: Value, other: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        return JniInstr.generateAsm(context, "jge", self, other);
    }
    cmp_greater(context: Context, self: Value, other: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        return JniInstr.generateAsm(context, "jg", self, other);

    }
    cmp_less(context: Context, self: Value, other: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        return JniInstr.generateAsm(context, "jl", self, other);
    }

    from_plus(context: Context, self: Value, other: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        return PlusInstruction.generateAsm(context, self, other);
    }

    from_minus(context: Context, self: Value, other: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        return SubInstruction.generateAsm(context, self, other);
    }

    from_multiply(context: Context, self: Value, other: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        return MulInstruction.generateAsm(context, self, other);
    }
    from_divide(context: Context, self: Value, other: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        return DivInstruction.generateAsm(context, self, other);
    }

    from_percent(context: Context, self: Value, other: Value): Value {

        const { lhs, rhs } = convert_values_or_throw(context, self, other);

        const sizeoftype = lhs.valueType.size;
        const mov_i = get_mov_i_on_size(sizeoftype);
        const register = Register.getFrom("ax", sizeoftype);
        context.addInstruction(new MovInstr(mov_i, register, valueToMemLoc(lhs, context)));
        context.addInstruction(new StringInstruction("cdq"));

        const newMemLoc = context.getNewMemLocation(lhs.valueType);
        const newValue = new Value(newMemLoc, lhs.valueType, lhs.pos);
        context.addInstruction(new DivInstruction(get_div_i_on_sizeoftype(sizeoftype), valueToMemLoc(rhs, context)));

        context.addInstruction(new MovInstr(mov_i, newMemLoc, Register.getFrom("ex", sizeoftype)));

        return newValue;
    }


}

