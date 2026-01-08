import { Context } from "../context";
import { convert_values_or_throw } from "../converter";
import { UNREACHABLE } from "../helper";
import { Value } from "../value";
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
export class PlusInstruction extends Instruction {
    public constructor(public add_i: add_i, public lhs: MemLocation, public rhs: Register) {
        super();
    }
    override non(): void { }

    public static generateAsm(context: Context, self: Value, other: Value): Value {

        const { lhs, rhs } = convert_values_or_throw(context, self, other);
        const sizeoftype = lhs.valueType.size;
        const mov_i = get_mov_i_on_size(sizeoftype);

        const register = Register.getFrom("ax", sizeoftype);

        context.addInstruction(new MovInstr(mov_i, register, lhs.toMemLoc(context)));
        context.addInstruction(new PlusInstruction(get_add_i_on_sizeoftype(sizeoftype), rhs.toMemLoc(context), register));

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
export class SubInstruction extends Instruction {
    override non(): void {
        throw new Error("Method not implemented.");
    }
    public constructor(public sub_i: sub_i, public lhs: MemLocation, public rhs: Register) {
        super();
    }


    public static generateAsm(context: Context, self: Value, other: Value): Value {

        const { lhs, rhs } = convert_values_or_throw(context, self, other);
        const sizeoftype = lhs.valueType.size;
        const mov_i = get_mov_i_on_size(sizeoftype);

        const register = Register.getFrom("ax", sizeoftype);

        context.addInstruction(new MovInstr(mov_i, register, lhs.toMemLoc(context)));
        context.addInstruction(new SubInstruction(get_sub_i_on_sizeoftype(sizeoftype), rhs.toMemLoc(context), register));

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
export class MulInstruction extends Instruction {
    override non(): void {
        throw new Error("Method not implemented.");
    }

    public constructor(public mul_i: mul_i, public memloc: MemLocation) {
        super();
    }


    public static generateAsm(context: Context, self: Value, other: Value): Value {
        const { lhs, rhs } = convert_values_or_throw(context, self, other);
        const sizeoftype = lhs.valueType.size;

        const mov_i = get_mov_i_on_size(sizeoftype);
        const register = Register.getFrom("ax", sizeoftype);

        context.addInstruction(new MovInstr(mov_i, register, lhs.toMemLoc(context)));
        context.addInstruction(new MulInstruction(get_mul_i_on_sizeoftype(sizeoftype), rhs.toMemLoc(context)));

        const newMemLoc = context.getNewMemLocation(lhs.valueType);
        const newValue = new Value(newMemLoc, lhs.valueType, lhs.pos);
        context.addInstruction(new MovInstr(mov_i, newMemLoc, register));
        return newValue;
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
export class DivInstruction extends Instruction {

    public constructor(public div_i: div_i, public memloc: MemLocation) { super(); }
    override non(): void { }

    public static generateAsm(context: Context, self: Value, other: Value): Value {
        const { lhs, rhs } = convert_values_or_throw(context, self, other);
        const sizeoftype = lhs.valueType.size;

        const mov_i = get_mov_i_on_size(sizeoftype);
        const register = Register.getFrom("ax", sizeoftype);

        context.addInstruction(new MovInstr(mov_i, register, lhs.toMemLoc(context)));

        context.addInstruction(new StringInstruction("cdq"));

        context.addInstruction(new DivInstruction(get_div_i_on_sizeoftype(sizeoftype), rhs.toMemLoc(context)));

        const newMemLoc = context.getNewMemLocation(lhs.valueType);
        const newValue = new Value(newMemLoc, lhs.valueType, lhs.pos);

        context.addInstruction(new MovInstr(mov_i, newMemLoc, register));

        return newValue;
    }
}

