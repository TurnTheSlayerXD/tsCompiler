import { Context } from "../context";
import { convert_values_or_throw } from "../converter";
import { UNREACHABLE } from "../helper";
import { Value, valueToMemLoc } from "../value";
import { get_mov_i_on_size, Instruction, MovInstr, StringInstruction } from "./instruction";
import { MemLocation, Register } from "./mem_location";


type add_i =
    "addb" |
    "addr" |
    "addl" |
    "addq";

function get_add_i_on_sizeoftype(sizeoftype: number): add_i {
    switch (sizeoftype) {
        case 1: return "addb";
        case 2: return "addr";
        case 4: return "addl";
        case 8: return "addq";
        default: UNREACHABLE();
    }
}
export class PlusInstr extends Instruction {
    public constructor(public add_i: add_i, public dst: MemLocation, public src: MemLocation) {
        super();
    }
    override non(): void { }

    public static generateAsm(context: Context, self: Value, other: Value): Value {

        const { lhs, rhs } = convert_values_or_throw(context, self, other);
        const sizeoftype = lhs.valueType.size;
        const mov_i = get_mov_i_on_size(sizeoftype);

        const register = Register.getFrom("a", sizeoftype);

        context.addInstruction(new MovInstr(mov_i, register, valueToMemLoc(lhs, context)));
        context.addInstruction(new PlusInstr(get_add_i_on_sizeoftype(sizeoftype), register, valueToMemLoc(rhs, context)));

        const newMemLoc = context.getNewMemLocation(lhs.valueType);
        const newValue = new Value(newMemLoc, lhs.valueType, lhs.pos);

        context.addInstruction(new MovInstr(mov_i, newMemLoc, register));

        return newValue;
    }
}

type sub_i =
    "subb" |
    "subr" |
    "subl" |
    "subq";

function get_sub_i_on_sizeoftype(sizeoftype: number): sub_i {
    switch (sizeoftype) {
        case 1: return "subb";
        case 2: return "subr";
        case 4: return "subl";
        case 8: return "subq";
        default: UNREACHABLE();
    }
}
export class SubInstr extends Instruction {
    override non(): void {
        throw new Error("Method not implemented.");
    }
    public constructor(public sub_i: sub_i, public dst: MemLocation, public src: MemLocation) {
        super();
    }


    public static generateAsm(context: Context, self: Value, other: Value): Value {

        const { lhs, rhs } = convert_values_or_throw(context, self, other);
        const sizeoftype = lhs.valueType.size;
        const mov_i = get_mov_i_on_size(sizeoftype);

        const register = Register.getFrom("a", sizeoftype);

        context.addInstruction(new MovInstr(mov_i, register, valueToMemLoc(lhs, context)));
        context.addInstruction(new SubInstr(get_sub_i_on_sizeoftype(sizeoftype), register, valueToMemLoc(rhs, context)));

        const newMemLoc = context.getNewMemLocation(lhs.valueType);
        const newValue = new Value(newMemLoc, lhs.valueType, lhs.pos);

        context.addInstruction(new MovInstr(mov_i, newMemLoc, register));

        return newValue;
    }
}

type mul_i = 'imulb' | 'imulr' | 'imull' | 'imulq';
function get_mul_i_on_sizeoftype(sizeoftype: number): mul_i {
    switch (sizeoftype) {
        case 1: return 'imulb';
        case 2: return 'imulr';
        case 4: return 'imull';
        case 8: return 'imulq';
        default: UNREACHABLE();
    }
}
export class MulInstr extends Instruction {
    public constructor(public mul_i: mul_i, public memloc: MemLocation) {
        super();
    }

    public static generateAsm(context: Context, self: Value, other: Value): Value {
        const { lhs, rhs } = convert_values_or_throw(context, self, other);
        const sizeoftype = lhs.valueType.size;

        const mov_i = get_mov_i_on_size(sizeoftype);
        const register = Register.getFrom("a", sizeoftype);

        context.addInstruction(new MovInstr(mov_i, register, valueToMemLoc(lhs, context)));
        context.addInstruction(new MulInstr(get_mul_i_on_sizeoftype(sizeoftype), valueToMemLoc(rhs, context)));

        const newMemLoc = context.getNewMemLocation(lhs.valueType);
        const newValue = new Value(newMemLoc, lhs.valueType, lhs.pos);
        context.addInstruction(new MovInstr(mov_i, newMemLoc, register));
        return newValue;
    }

    override non(): void {
        throw new Error("Method not implemented.");
    }
}

type div_i =
    'idivb' |
    'idivr' |
    'idivl' |
    'idivq';
export function get_div_i_on_sizeoftype(sizeoftype: number): div_i {
    switch (sizeoftype) {
        case 1: return 'idivb';
        case 2: return 'idivr';
        case 4: return 'idivl';
        case 8: return 'idivq';
        default: UNREACHABLE();
    }
}
export class DivInstr extends Instruction {

    public constructor(public div_i: div_i, public memloc: MemLocation) { super(); }
    override non(): void { }

    public static generateAsm(context: Context, self: Value, other: Value): Value {
        const { lhs, rhs } = convert_values_or_throw(context, self, other);
        const sizeoftype = lhs.valueType.size;

        const mov_i = get_mov_i_on_size(sizeoftype);
        const register = Register.getFrom("a", sizeoftype);

        context.addInstruction(new MovInstr(mov_i, register, valueToMemLoc(lhs, context)));

        context.addInstruction(new StringInstruction("cdq"));

        context.addInstruction(new DivInstr(get_div_i_on_sizeoftype(sizeoftype), valueToMemLoc(rhs, context)));

        const newMemLoc = context.getNewMemLocation(lhs.valueType);
        const newValue = new Value(newMemLoc, lhs.valueType, lhs.pos);

        context.addInstruction(new MovInstr(mov_i, newMemLoc, register));

        return newValue;
    }
}

