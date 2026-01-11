import { Context } from "../context";
import { convert_values_or_throw } from "../converter";
import { UNREACHABLE } from "../helper";
import { Value, valueToMemLoc } from "../value";
import { CharType } from "../value_types/char_type";
import { get_mov_i_on_size, MarkToJump, MovInstr } from "./instruction";
import { Instruction } from "./instruction";
import { LiteralMemLocation, MemLocation, Register } from "./mem_location";



type cmp_i = "cmpb" | "cmpr" | "cmpl" | "cmpq";
export function get_cmp_i_on_size(sizeoftype: number): cmp_i {
    switch (sizeoftype) {
        case 1: return "cmpb";
        case 2: return "cmpr";
        case 4: return "cmpl";
        case 8: return "cmpq";
        default: UNREACHABLE();
    }
}

export class CmpInstr extends Instruction {
    constructor(public cmp_i: cmp_i, public lhs: MemLocation, public rhs: MemLocation) {
        super();
    }
    override non(): void {
    }

    override toString: () => string = () => `CMP`;
}

type jni_i = "jne" |
    "je" |
    "jge" |
    "jle" |
    "jg" |
    "jl";
export class JniInstr extends Instruction {
    constructor(public jni_i: jni_i, public mark: MarkToJump) {
        super();
    }
    public static generateAsm(context: Context, jn_i: jni_i, self: Value, other: Value): Value {
        const { lhs, rhs } = convert_values_or_throw(context, self, other);
        const sizeoftype = lhs.valueType.size;
        const mov_i = get_mov_i_on_size(sizeoftype);
        const ax_register = Register.getFrom("a", sizeoftype);
        const bx_register = Register.getFrom("b", sizeoftype);

        context.addInstruction(new MovInstr(mov_i, ax_register, valueToMemLoc(lhs, context)));
        context.addInstruction(new MovInstr(mov_i, bx_register, valueToMemLoc(rhs, context)));

        const newMemLoc = context.getNewMemLocation(CharType.getInstance());
        const newValue = new Value(newMemLoc, CharType.getInstance(), self.pos);

        context.addInstruction(new MovInstr("movb", newMemLoc, new LiteralMemLocation(1)));
        context.addInstruction(new CmpInstr(get_cmp_i_on_size(sizeoftype), bx_register, ax_register));

        const newMark = context.getNewMarkToJump();
        context.addInstruction(new JniInstr(jn_i, newMark));
        context.addInstruction(new MovInstr("movb", newMemLoc, LiteralMemLocation.staticNull()));
        context.addInstruction(newMark);
        return newValue;
    }
    override non(): void { }
    override toString: () => string = () => 'JNI';
}




