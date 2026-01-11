import { Context } from "../context";
import { UNREACHABLE, convert_string_to_char_codes } from "../helper";
import { DebugPosition } from "../lexer";
import { Value, valueToMemLoc } from "../value";
import { CharType } from "./char_type";
import { ValueType } from "./value_type";
import { IndirectRegister, IndirectStackLoc, LiteralMemLocation, Register, StackLoc } from "../instruction/mem_location";
import { get_mov_i_on_size, LeaqInstruction, MovInstr } from "../instruction/instruction";
import { convert_val_to_type } from "../converter";
import { IntType } from "./int_type";
import { MulInstr, PlusInstr, SubInstr } from "../instruction/binary_op_instruction";

export class PtrType extends ValueType {
    private static instances: PtrType[] = [];

    protected constructor(public ptrTo: ValueType) { super(); }

    take_reference_from(context: Context, srcVar: Value, debugPos: DebugPosition): Value {
        srcVar.valueType.isSameType(this.ptrTo) || UNREACHABLE();

        if (srcVar._srcMemLoc instanceof IndirectStackLoc) {
            const memLoc = context.getNewMemLocation(this);
            const varVal = new Value(memLoc, new PtrType(srcVar.valueType), debugPos);
            const register = Register.forIndirect();
            context.addInstruction(new MovInstr(get_mov_i_on_size(this.size), register, srcVar._srcMemLoc));
            context.addInstruction(new MovInstr(get_mov_i_on_size(this.size), memLoc, register));

            return varVal;
        }
        else if (srcVar._srcMemLoc instanceof StackLoc) {
            const memLoc = context.getNewMemLocation(this);
            const varVal = new Value(memLoc, new PtrType(srcVar.valueType), debugPos);
            const register = Register.forIndirect();
            context.addInstruction(new LeaqInstruction("leaq", register, srcVar._srcMemLoc));
            context.addInstruction(new MovInstr("movq", memLoc, register));
            return varVal;
        }
        else {
            UNREACHABLE();
        }
    }

    dereference_from(context: Context, self: Value, debugPos: DebugPosition): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        if (self._srcMemLoc instanceof IndirectStackLoc) {

            const register = Register.forIndirect();
            const indirectRegister = new IndirectRegister(register);

            context.addInstruction(new MovInstr(
                get_mov_i_on_size(this.size),
                register,
                self._srcMemLoc,
            ));

            const bufRegister = Register.getFrom("b", this.ptrTo.size);

            context.addInstruction(new MovInstr(
                get_mov_i_on_size(this.ptrTo.size),
                bufRegister,
                indirectRegister),
            );

            const memloc = new IndirectStackLoc(context.getNewMemLocation(this.ptrTo));
            const varVal = new Value(memloc, this.ptrTo, debugPos);
            context.addInstruction(new MovInstr(
                get_mov_i_on_size(this.ptrTo.size),
                memloc,
                bufRegister,
            ));

            return varVal;
        }
        else if (self._srcMemLoc instanceof StackLoc) {
            return new Value(new IndirectStackLoc(self._srcMemLoc), this.ptrTo, debugPos);
        }
        else {
            UNREACHABLE();
        }
    }

    override from_literal(context: Context, literal: string, debugPos: DebugPosition): Value {
        if (this.ptrTo.isSameType(CharType.getInstance()) && !!literal) {
            const charType = CharType.getInstance();
            const charSize = charType.size;

            let memloc = context.getNewMemLocation(charType);
            context.addInstruction(new MovInstr("movb", memloc, LiteralMemLocation.staticNull()));

            const convertedLiteral = convert_string_to_char_codes(literal).reverse();
            for (const char of convertedLiteral) {
                memloc = context.getNewMemLocation(charType);
                context.addInstruction(new MovInstr("movb", memloc, new LiteralMemLocation(char)));
            }
            const lastMemLoc = memloc;
            context.addInstruction(new LeaqInstruction("leaq", Register.forIndirect(), lastMemLoc));

            const ptrMemLoc = context.getNewMemLocation(this);
            context.addInstruction(new MovInstr("movq", ptrMemLoc, Register.forIndirect()))

            const returnVar = new Value(ptrMemLoc, this, debugPos);
            return returnVar;
        }
        else {
            UNREACHABLE();
        }
    }

    override from_plus(context: Context, self: Value, other: Value): Value {
        if (!this.isSameType(self.valueType)) {
            UNREACHABLE();
        }
        other = convert_val_to_type(context, other, IntType.getInstance());

        const newMemloc = context.getNewMemLocation(this);
        const bufRegister = Register.getFrom("a", this.size);
        context.addInstruction(new MovInstr("movq", bufRegister, valueToMemLoc(other, context)));
        context.addInstruction(new MulInstr("imulq", new LiteralMemLocation(this.ptrTo.size)));

        context.addInstruction(new PlusInstr("addq", bufRegister, valueToMemLoc(self, context)));
        context.addInstruction(new MovInstr("movq", newMemloc, bufRegister));
        const newVar = new Value(newMemloc, this, other.pos);
        return newVar;
    }

    override from_minus(context: Context, self: Value, other: Value): Value {
        if (!this.isSameType(self.valueType)) {
            UNREACHABLE();
        }
        other = convert_val_to_type(context, other, IntType.getInstance());

        const newMemloc = context.getNewMemLocation(this);
        const bufRegister = Register.getFrom("a", this.size);
        context.addInstruction(new MovInstr("movq", bufRegister, valueToMemLoc(other, context)));
        context.addInstruction(new MulInstr("imulq", new LiteralMemLocation(this.ptrTo.size)));

        context.addInstruction(new SubInstr("subq", bufRegister, valueToMemLoc(self, context)));
        context.addInstruction(new MovInstr("movq", newMemloc, bufRegister));
        const newVar = new Value(newMemloc, this, other.pos);
        return newVar;
    }

    override from_multiply(context: Context, self: Value, other: Value): Value {
        UNREACHABLE();
    }
    override from_percent(context: Context, self: Value, other: Value): Value {
        UNREACHABLE();
    }
    override from_divide(context: Context, self: Value, other: Value): Value {
        UNREACHABLE();
    }

    static getInstance(ptrTo: ValueType): PtrType {
        const new_inst = new PtrType(ptrTo);
        const ret = this.instances.find(tp => tp.isSameType(new_inst));
        if (!ret) {
            this.instances.push(new_inst);
        }
        return new_inst;
    }
    isSameType(type: ValueType): boolean {
        if (!(type instanceof PtrType)) {
            return false;
        }
        return this.ptrTo.isSameType(type.ptrTo);
    }

    public toString = (): string => {
        return `${this.ptrTo.toString()} *`;
    }

    get size(): number { return 8 };
}
