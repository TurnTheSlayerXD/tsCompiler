import { Context } from "../context";
import { DebugPosError, throwError, TODO, TokenParserError, UNREACHABLE } from "../helper";
import { PlusInstr } from "../instruction/binary_op_instruction";
import { LeaqInstruction, MovInstr } from "../instruction/instruction";
import { IndirectRegisterWithOffset, IndirectStackLoc, LiteralMemLocation, MemLocation, Register, StackLoc } from "../instruction/mem_location";
import { DebugPosition, Token } from "../lexer";
import { Value, valueToMemLoc } from "../value";
import { CharType } from "./char_type";
import { PtrType } from "./ptr_type";
import { ValueType } from "./value_type";

type StructField = { name: string, type: ValueType, offset: number };


export class StructType extends ValueType {
    private static _instances: StructType[] = [];
    public fields: StructField[];

    public _size: number | null;
    private constructor(public struct_name: string) {
        super();
        this.fields = [];
        this._size = null;
    }

    override toString: () => string = (): string => {
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

    override from_null(context: Context, debugPos: DebugPosition): Value {
        const charType = CharType.getInstance();
        const structSize = this.size;
        let memloc;
        for (let i = 0; i < structSize; ++i) {
            memloc = context.getNewMemLocation(charType);
            context.addInstruction(new MovInstr("movb", memloc, LiteralMemLocation.staticNull()))
        }
        if (!memloc) {
            UNREACHABLE();
        }

        return new Value(memloc, this, debugPos);
    }

    private putStructAddressToRegister(context: Context, register: Register, memloc: MemLocation) {
        if (memloc instanceof IndirectStackLoc) {
            context.addInstruction(new MovInstr("movq", register, memloc));
        }
        else {
            context.addInstruction(new LeaqInstruction("leaq", register, memloc));
        }
    }

    private getFieldFromStruct(fieldName: string): StructField {
        return this.fields.find(f => f.name === fieldName) ?? throwError( `No field [${fieldName} on struct ${this.struct_name}]`);
    }

    override copy_to(context: Context, dst: Value, src: Value): void {
        if (!this.isSameType(dst.valueType) || !this.isSameType(src.valueType)) {
            throwError(new DebugPosError(dst.pos, `Cannot copy from type ${src.valueType} to type ${dst.valueType}`));
        }

        let structSize = this.size;
        const ptrSize = PtrType.getInstance(CharType.getInstance()).size;

        const dstRegister: Register = Register.getFrom("a", ptrSize);
        const srcRegister: Register = Register.getFrom("b", ptrSize);
        const bufRegister = Register.getFrom("c", 1);

        this.putStructAddressToRegister(context, srcRegister, src._srcMemLoc);
        this.putStructAddressToRegister(context, dstRegister, dst._srcMemLoc);

        // UNREACHABLE("ADD PER FIELD STRUCT COPYING INSTEAD OF PER BYTE");

        for (let i = 0; i < structSize; ++i) {
            context.addInstruction(new MovInstr("movb", bufRegister, new IndirectRegisterWithOffset(srcRegister, i)));
            context.addInstruction(new MovInstr("movb", new IndirectRegisterWithOffset(dstRegister, i), bufRegister));
        }
    }

    from_dot(context: Context, src: Value, fieldName: string, debugPos: DebugPosition): Value {
        if (!this.isSameType(src.valueType)) {
            UNREACHABLE();
        }
        const fieldFromStuct = this.getFieldFromStruct(fieldName);

        const srcRegister = Register.forIndirect();
        this.putStructAddressToRegister(context, srcRegister, src._srcMemLoc);

        const ptrType = PtrType.getInstance(CharType.getInstance());

        const memloc = new IndirectStackLoc(context.getNewMemLocation(ptrType));
        const returnVar = new Value(memloc, fieldFromStuct.type, debugPos);

        const bufRegister = Register.getFrom("a", ptrType.size);

        context.addInstruction(new LeaqInstruction("leaq", bufRegister, new IndirectRegisterWithOffset(srcRegister, fieldFromStuct.offset)));
        context.addInstruction(new MovInstr("movq", memloc, bufRegister));

        return returnVar;
    }

    from_ptr_dot(context: Context, srcVar: Value, fieldName: string, debugPos: DebugPosition): Value {
        if (!srcVar.valueType.isSameType(PtrType.getInstance(this))) {
            throwError(`Unexpected method call on type ${this}`);
        }

        const fieldFromStruct = this.getFieldFromStruct(fieldName);
        const indirectMemloc = new IndirectStackLoc(context.getNewMemLocation(fieldFromStruct.type));
        const newVar = new Value(indirectMemloc, fieldFromStruct.type, debugPos);
        const raxRegister = Register.getInstance("rax");
        const srcMemLoc = valueToMemLoc(srcVar, context);
        context.addInstruction(new MovInstr("movq", raxRegister, srcMemLoc));
        context.addInstruction(new PlusInstr("addq", raxRegister, new LiteralMemLocation(fieldFromStruct.offset)));
        context.addInstruction(new MovInstr("movq", indirectMemloc, raxRegister));

        return newVar;
    }

    override from_literal(context: Context, literal: string, pos: DebugPosition): Value {
        UNREACHABLE();
    }

    override from_plus(context: Context, self: Value, other: Value): Value {
        UNREACHABLE();
    }

    override from_minus(context: Context, self: Value, other: Value): Value {
        UNREACHABLE();
    }

    override from_multiply(context: Context, self: Value, other: Value): Value {
        UNREACHABLE();
    }

    override from_divide(context: Context, self: Value, other: Value): Value {
        UNREACHABLE();
    }
    override from_percent(context: Context, self: Value, other: Value): Value {
        UNREACHABLE();
    }
    override cmp_equal(context: Context, self: Value, other: Value): Value {
        UNREACHABLE();
    }
    override cmp_not_equal(context: Context, self: Value, other: Value): Value {
        UNREACHABLE();
    }
    override cmp_greater(context: Context, self: Value, other: Value): Value {
        UNREACHABLE();
    }
    override cmp_less(context: Context, self: Value, other: Value): Value {
        UNREACHABLE();
    }
    override cmp_greater_or_equal(context: Context, self: Value, other: Value): Value {
        UNREACHABLE();
    }
    override cmp_less_or_equal(context: Context, self: Value, other: Value): Value {
        UNREACHABLE();
    }

}

