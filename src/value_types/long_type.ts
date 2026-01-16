import { Context } from "../context";
import { DebugPosError } from "../helper";
import { get_mov_i_on_size, MovInstr, StringInstruction } from "../instruction/instruction";
import { LiteralMemLocation, Register } from "../instruction/mem_location";
import { DebugPosition } from "../lexer";
import { Value, valueToMemLoc } from "../value";
import { CharType } from "./char_type";
import { IntType } from "./int_type";
import { PtrType } from "./ptr_type";
import { ValueType } from "./value_type";



export class LongType extends ValueType {
    static staticInstance?: LongType;

    private constructor() {
        super();
    }

    override toString: () => string = () => "LONG";
    override isSameType(type: ValueType): boolean {
        return type instanceof LongType
    }
    override get size(): number {
        return 8;
    }

    override from_literal(context: Context, literal: string, pos: DebugPosition): Value {
        if (!Number.isFinite(+literal)) {
            throw new DebugPosError(pos, `Expected literal to be valid number.\nReceived literal: ${literal}`);
        }
        const memloc = context.getNewMemLocation(this);
        context.addInstruction(new MovInstr("movq", memloc, new LiteralMemLocation(parseInt(literal))));
        return new Value(memloc, this, pos);
    }
    static getInstance(): LongType {
        if (!this.staticInstance) {
            this.staticInstance = new LongType();
        }
        return this.staticInstance;
    }

    static convertToFromValue(context: Context, srcValue: Value, debugPos: DebugPosition): Value {
        const { valueType: srcValueType } = srcValue;
        if (srcValueType instanceof LongType) {
            return srcValue;
        }
        if (srcValueType instanceof CharType || srcValueType instanceof IntType) {

            let movWord: 'movsbq' | 'movslq';
            if (srcValueType instanceof CharType) {
                movWord = 'movsbq';
            }
            else {
                movWord = 'movslq';
            }

            context.addInstruction(new MovInstr(movWord, Register.getInstance("rax"), valueToMemLoc(srcValue, context)));
            const memloc = context.getNewMemLocation(LongType.getInstance());
            context.addInstruction(new MovInstr("movq", memloc, Register.getInstance("rax")));
            return new Value(memloc, LongType.getInstance(), debugPos);
        }
        else {
            throw new DebugPosError(debugPos, `Cannot convert value of type ${srcValueType} to LONG`);
        }
    }
}



