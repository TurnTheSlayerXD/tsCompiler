
import { Context } from "../context";
import { DebugPosError, throwError } from "../helper";
import { get_mov_i_on_size, MovInstr } from "../instruction/instruction";
import { LiteralMemLocation } from "../instruction/mem_location";
import { DebugPosition } from "../lexer";
import { Value } from "../value";
import { ValueType } from "./value_type";

export class IntType extends ValueType {
    static instance: IntType | null = null;

    private constructor() {
        super();
    }

    override get size(): number {
        return 4;
    }

    isSameType(type: ValueType): boolean {
        return type instanceof IntType;
    }

    static getInstance(): IntType {
        if (!this.instance) {
            this.instance = new IntType();
        }
        return this.instance;
    }

    public toString = (): string => {
        return "int";
    }


    override from_literal(context: Context, literal: string, pos: DebugPosition): Value {

        let parsedInt = parseInt(literal);
        if (!Number.isFinite(parsedInt)) {
            throwError(new DebugPosError(pos, `Invalid integer literal: ${literal}`));
        }
        const memloc = context.getNewMemLocation(this);
        const varValue = new Value(memloc, this, pos);
        context.addInstruction(new MovInstr(get_mov_i_on_size(this.size), memloc, new LiteralMemLocation(parsedInt)));
        return varValue;
    }
}
