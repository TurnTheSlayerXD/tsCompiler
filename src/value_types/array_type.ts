import { Context } from "../context";
import { convert_string_to_char_codes } from "../helper";
import { Position } from "../lexer";
import { temp_t, Value } from "../value";
import { CharType } from "./char_type";
import { PtrType } from "./ptr_type";
import { ValueType, AddrType } from "./value_type";

export class ArrayType extends PtrType {
    override is_const: boolean = false;
    static _instances: ArrayType[] = [];
    private constructor(ptrTo: ValueType, public array_size: number | null) {
        super(ptrTo);
    }

    override toString: () => string = () => `(${this.ptrTo}) [], size=${this.array_size}`;
    override isSameType(type: ValueType): boolean {
        if ((type instanceof PtrType || type instanceof ArrayType) && type.ptrTo.isSameType(this.ptrTo)) {
            return true;
        }
        return false;
    }

    static getArrayInstance(ptrTo: ValueType, array_size: number | null): ArrayType {
        let inst: ArrayType | undefined = this._instances.find(i => i.ptrTo.isSameType(ptrTo) && i.array_size === array_size);
        if (!inst) {
            inst = new ArrayType(ptrTo, array_size);
            this._instances.push(inst);
        }
        return inst;
    }
    override get size(): number {
        return 8;
    }

    override asm_from_literal(context: Context, name: string | temp_t, literal: string | null, pos: Position, should_alloc: boolean): Value {
        if (should_alloc) {
            if (this.array_size) {
                for (let i = 0; i < this.array_size; ++i) {
                    this.ptrTo.asm_from_literal(context, temp_t.t, null, pos, true);
                }
            }
            else if (literal !== null) {
                context.addAssembly(`
                    \rmovb $0, ${context.pushStack(CharType.getInstance().size)}(%rsp)
                `);
                const codes = convert_string_to_char_codes(literal).reverse();
                for (const c of codes) {
                    context.addAssembly(`
                    \rmovb $${c}, ${context.pushStack(CharType.getInstance().size)}(%rsp)
                `);
                }
                context.addAssembly(`
                    \rleaq ${context.stackPtr}(%rsp), %rdx
                `);
                context.addAssembly(`
                    \rmovq %rdx, ${context.pushStack(this.size)}(%rsp) 
                `);
                this.array_size = codes.length;
                return new Value(name, this, pos, context.stackPtr, AddrType.Stack);
            }

            context.addAssembly(`
                \rleaq ${context.stackPtr}(%rsp), %rdx
                \rmovq %rdx, ${context.pushStack(this.size)}(%rsp)
            `);
            return new Value(name, this, pos, context.stackPtr, AddrType.Stack);
        }
        else {
            return new Value(name, this, pos, null, AddrType.Stack);
        }
    }
}

