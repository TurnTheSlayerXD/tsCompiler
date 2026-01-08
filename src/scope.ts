import { name } from "assert";
import { throwError, UNREACHABLE } from "./helper";
import { Instruction, MarkToJump, MovInstr, StringInstruction } from "./instruction/instruction";
import { MemLocation, StackLoc, StaticLocation } from "./instruction/mem_location";
import { NamedValue, Value } from "./value";
import { CharType } from "./value_types/char_type";
import { FunctionType } from "./value_types/function_type";
import { IntType } from "./value_types/int_type";
import { PtrType } from "./value_types/ptr_type";
import { ValueType } from "./value_types/value_type";
import { VoidType } from "./value_types/void_type";
import { DebugPosition } from "./lexer";


export enum TypeofScope {
    CYCLE_SCOPE,
    IF_SCOPE,
    FUN_SCOPE,
    GLOBAL_SCOPE,
}

export class Scope {
    localVarValues: NamedValue[];
    stackLocs: StackLoc[];

    public parentScope: Scope | null;
    public siblingScope: Scope | null;
    public typeofScope: TypeofScope;
    public instructions: Instruction[];
    public marksToJump: MarkToJump[];

    public markCounter: number;

    constructor(
        parentScope: Scope | null,
        siblingScope: Scope | null,
        typeofScope: TypeofScope,
    ) {
        this.parentScope = parentScope;
        this.siblingScope = siblingScope;
        this.typeofScope = typeofScope;

        this.localVarValues = [];
        this.stackLocs = [];
        this.instructions = [];
        this.marksToJump = [];
        this.markCounter = 0;
    }

    get scopeOrderIndex(): number {
        return this.siblingScope ? this.siblingScope.scopeOrderIndex + 1 : 0;
    }

    get scopeId(): string {
        if (!this.parentScope) {
            UNREACHABLE();
        }
        return `${this.parentScope.scopeId}_${TypeofScope[this.typeofScope]}_${this.scopeOrderIndex}`;
    }

    get allocsCounter(): number {
        return this.stackLocs.length;
    }

    get currentStackOffset(): number {
        if (this.stackLocs.length === 0) {
            return 0;
        }
        const lastStackLoc = this.stackLocs.at(-1)!;
        return lastStackLoc.offset + lastStackLoc.allocSize;
    }

    get_distance_to(rhs: Scope): number {
        let parent = this.parentScope;
        while (rhs !== parent) {
            if (parent === null) {
                UNREACHABLE();
            }
            offset += parent._used_space;
            parent = parent.parentScope;
        }
        return offset;
    }

    getNewMemLocation(valueType: ValueType): StackLoc {
        const newStackLoc = new StackLoc(`stack_alloc_${this.scopeId}_${this.allocsCounter}`, this.currentStackOffset, valueType.size);
        this.stackLocs.push(newStackLoc);
        return newStackLoc;
    }

    getNewMarkToJump(): MarkToJump {
        const newMark = new MarkToJump(`mark_${this.scopeId}_${this.markCounter++}`);
        this.marksToJump.push(newMark);
        return newMark;
    }

    getVarValue(varName: string): Value | null {
        let scope: Scope | null = this;
        let varValue = null;
        while (scope && !(varValue = scope.localVarValues.find((value) => value.name === varName))) {
            scope = scope.parentScope;
        }
        return varValue ?? null;
    }

    getVarValueOrThrow(varName: string): Value {
        return this.getVarValue(varName) ?? throwError(new Error(`No var ${varName} in scope ${this.scopeId}`));
    }

    addNewVarValue(varValue: NamedValue): void {
        if (this.localVarValues.some(val => varValue.name === val.name)) {
            throwError(`Var value with name ${varValue.name} already defined in scope ${this.scopeId}`);
        }

        this.localVarValues.push(varValue);
    }

    addInstruction(instruction: Instruction) {
        this.instructions.push(instruction);
    }


    interpretMemLocation(memLoc: MemLocation): string {
        if (memLoc instanceof StackLoc) {
            
        }
    }

    interpretInstructions(): string {
        let asm: string[] = [];
        for (const instr of this.instructions) {
            if (instr instanceof MovInstr) {
                const dstStr = this.interpretMemLocation(instr.dst);
                const srcStr = this.interpretMemLocation(instr.src);
                asm.push(`${instr.mov_i} ${srcStr} ${dstStr}`);
            }
            else if (instr instanceof MarkToJump) {
                asm.push(`${instr.tag}:`);
            }
            else if (instr instanceof StringInstruction) {
                asm.push(`${instr.text}`);
            }
            else {
                UNREACHABLE();
            }
        }

        return asm.join('\n');
    }
}


export class GlobalScope extends Scope {


    constructor() {
        super(null, null, TypeofScope.GLOBAL_SCOPE);
    }


    override get scopeId(): string {
        return TypeofScope[this.typeofScope];
    }

    override addNewVarValue(val: NamedValue): void {
        UNREACHABLE();
    }

    addFunctionValue(val: NamedValue) {
        if (!(val.valueType instanceof FunctionType)) {
            throwError(`Only function types can be added to global scope. Trying to add typeof ${val.valueType}`);
        }
        this.localVarValues.push(val);
    }


    override getVarValue(varName: string): Value | null {
        if (name === 'print') {
            return new NamedValue(
                "input",
                new StaticLocation(),
                FunctionType.getInstance(
                    VoidType.getInstance(),
                    [
                        PtrType.getInstance(CharType.getInstance()),
                        IntType.getInstance(),
                    ],
                ),
                new DebugPosition(0, 0, 0),
            );
        }
        if (name === 'input') {
            return new NamedValue(
                "input",
                new StaticLocation(),
                FunctionType.getInstance(
                    VoidType.getInstance(),
                    [
                        PtrType.getInstance(CharType.getInstance()),
                    ],
                ),
                new DebugPosition(0, 0, 0),
            );
        }
        return super.getVarValue(varName);
    }
}