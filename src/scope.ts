import { DebugPosError, throwError, TODO, UNREACHABLE } from "./helper";
import { Instruction, LeaqInstruction, MarkToJump, MovInstr, PopScopeInstr, PushScopeInstr, RetqInstr, ScopeEndInstr, ScopeStartInstr, StringInstruction } from "./instruction/instruction";
import { IndirectRegister, IndirectRegisterWithOffset, IndirectStackLoc, LiteralMemLocation, MemLocation, Register, StackLoc, StaticLocation } from "./instruction/mem_location";
import { NamedValue, Value } from "./value";
import { CharType } from "./value_types/char_type";
import { FunctionType } from "./value_types/function_type";
import { IntType } from "./value_types/int_type";
import { PtrType } from "./value_types/ptr_type";
import { ValueType } from "./value_types/value_type";
import { VoidType } from "./value_types/void_type";
import { DebugPosition } from "./lexer";
import { PlusInstr, SubInstr, MulInstr, DivInstr } from "./instruction/binary_op_instruction";


export enum TypeofScope {
    CYCLE_SCOPE,
    IF_SCOPE,
    FUN_SCOPE,
    GLOBAL_SCOPE,
}

type ScopeParams =
    { typeofScope: TypeofScope.IF_SCOPE } |
    { typeofScope: TypeofScope.GLOBAL_SCOPE } |
    { typeofScope: TypeofScope.FUN_SCOPE } |
    { typeofScope: TypeofScope.CYCLE_SCOPE, markToEnterCycle: MarkToJump, markToExitCycle: MarkToJump };


export class Scope {
    localVarValues: NamedValue[];
    stackLocs: StackLoc[];

    public parentScope: Scope | null;
    public siblingScope: Scope | null;
    public childScopes: Scope[];

    public scopeParams: ScopeParams;

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


        this.childScopes = [];

        this.localVarValues = [];
        this.stackLocs = [];
        this.instructions = [];
        this.marksToJump = [];
        this.markCounter = 0;

        switch (typeofScope) {
            case TypeofScope.CYCLE_SCOPE:
                this.scopeParams = { typeofScope: TypeofScope.CYCLE_SCOPE, markToEnterCycle: this.getNewMarkToJump(), markToExitCycle: this.getNewMarkToJump() };
                break;
            case TypeofScope.FUN_SCOPE:
                this.scopeParams = { typeofScope: typeofScope };
                break;
            case TypeofScope.IF_SCOPE: case TypeofScope.GLOBAL_SCOPE:
                this.scopeParams = { typeofScope: typeofScope };
        }

    }

    get typeofScope(): TypeofScope {
        return this.scopeParams.typeofScope;
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

    getNewMemLocation(valueType: ValueType): StackLoc {
        const newStackLoc = new StackLoc(
            `stack_alloc_${this.scopeId}_${this.allocsCounter}`,
            this.currentStackOffset,
            valueType.size,
            this,
        );
        this.stackLocs.push(newStackLoc);
        return newStackLoc;
    }

    getNewMemLocationFromOffset(offset: number): StackLoc {
        const newStackLoc = new StackLoc(
            `stack_alloc_${this.scopeId}_${this.allocsCounter}`,
            this.currentStackOffset,
            offset,
            this,
        );
        this.stackLocs.push(newStackLoc);
        return newStackLoc;
    }

    getNewMarkToJump(): MarkToJump {
        const newMark = new MarkToJump(`mark_${this.scopeId}_${this.markCounter++}`);
        this.marksToJump.push(newMark);
        return newMark;
    }

    getVarValue(varName: string): NamedValue | null {
        let scope: Scope | null = this;
        let varValue = null;
        while (scope && !(varValue = scope.localVarValues.find((value) => value.name === varName))) {
            scope = scope.parentScope;
        }
        return varValue ?? null;
    }

    getVarValueOrThrow(varName: string): NamedValue {
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

    public totalAllocs() {

    }

    private getTotalStackSpace(): number {
        return this.stackLocs.map(l => l.allocSize).reduce((s, l) => s + l);
    }

    private getDistanceToScope(locationScope: Scope): number {
        let distance = 0;
        let scope: Scope | null = this;
        while (scope && scope !== locationScope) {
            scope = scope.parentScope;
            distance += scope?.getTotalStackSpace() ?? 0;
        }
        if (!scope) {
            UNREACHABLE();
        }
        return distance;
    }

    private doStackLocationProcessing(memLoc: StackLoc): string {
        let totalStackSpace = this.getTotalStackSpace();
        if (memLoc.relatedScope === this) {
            return `${totalStackSpace - memLoc.offset - memLoc.allocSize}(%rsp)`;
        }
        const distanceToScope = this.getDistanceToScope(memLoc.relatedScope);
        return `${distanceToScope - memLoc.offset - memLoc.allocSize + totalStackSpace}(%rsp)`;
    }

    private interpretMemLocation(memLoc: MemLocation): string {
        if (memLoc instanceof StackLoc) {
            return this.doStackLocationProcessing(memLoc);
        }
        if (memLoc instanceof IndirectStackLoc) {
            return this.doStackLocationProcessing(memLoc.stackLoc);
        }
        else if (memLoc instanceof LiteralMemLocation) {
            return `$${memLoc.literal}`;
        }
        else if (memLoc instanceof Register) {
            return `%${memLoc.registerName}`;
        }
        else if (memLoc instanceof IndirectRegister) {
            return `(%${memLoc.register.registerName})`;
        }
        else if (memLoc instanceof IndirectRegisterWithOffset) {
            return `${memLoc.offset}(%${memLoc.register.registerName})`
        }
        else {
            UNREACHABLE();
        }

    }

    interpretInstructions(): string[] {
        let asm: string[] = [];
        for (const instr of this.instructions) {
            if (instr instanceof ScopeStartInstr) {
                if (this.childScopes.indexOf(instr.scope) === -1) {
                    UNREACHABLE();
                }
                asm.push(`#SCOPE START ${instr.scope.scopeId}`);
                asm.push(...instr.scope.interpretInstructions());
            }
            else if (instr instanceof ScopeEndInstr) {
                if (this.childScopes.indexOf(instr.scope) === -1) {
                    UNREACHABLE();
                }
                asm.push(`#SCOPE END ${instr.scope.scopeId}`);
            }
            else if (instr instanceof PushScopeInstr) {
                asm.push(`subq $${this.getTotalStackSpace()}, %rsp`);
            }
            else if (instr instanceof PopScopeInstr) {
                asm.push(`addq $${this.getTotalStackSpace()}, %rsp`);
            }

            else if (instr instanceof MovInstr) {
                const dstStr = this.interpretMemLocation(instr.dst);
                const srcStr = this.interpretMemLocation(instr.src);
                asm.push(`${instr.mov_i} ${srcStr}, ${dstStr}`);
            }
            else if (instr instanceof LeaqInstruction) {
                const dstStr = this.interpretMemLocation(instr.dst);
                const srcStr = this.interpretMemLocation(instr.src);
                asm.push(`leaq ${srcStr}, ${dstStr}`);
            }
            else if (instr instanceof MarkToJump) {
                asm.push(`${instr.tag}:`);
            }
            else if (instr instanceof StringInstruction) {
                asm.push(`${instr.text}`);
            }
            else if (instr instanceof PlusInstr) {
                const lhsStr = this.interpretMemLocation(instr.src);
                const rhsStr = this.interpretMemLocation(instr.dst);
                asm.push(`${instr.add_i} ${lhsStr}, ${rhsStr}`);
            }
            else if (instr instanceof SubInstr) {
                const lhsStr = this.interpretMemLocation(instr.src);
                const rhsStr = this.interpretMemLocation(instr.dst);
                asm.push(`${instr.sub_i} ${lhsStr}, ${rhsStr}`);
            }
            else if (instr instanceof MulInstr) {
                const memLocStr = this.interpretMemLocation(instr.memloc);
                asm.push(`${instr.mul_i} ${memLocStr}`);
            }
            else if (instr instanceof DivInstr) {
                const memLocStr = this.interpretMemLocation(instr.memloc);
                asm.push(`${instr.div_i} ${memLocStr}`);
            }
            else if (instr instanceof RetqInstr) {
                asm.push("retq");
            }


            else {
                TODO(`UNHANDELED INSTRUCTION ${instr}`);
            }
        }
        return asm;
    }
}

export class GlobalScope extends Scope {


    constructor() {
        super(null, null, TypeofScope.GLOBAL_SCOPE);

        this.localVarValues.push(
            new NamedValue(
                "print",
                new Value(
                    new StaticLocation(),
                    FunctionType.getInstance(
                        VoidType.getInstance(),
                        [
                            PtrType.getInstance(CharType.getInstance()),
                            IntType.getInstance(),
                        ],
                    ),
                    new DebugPosition(0, 0, 0),
                )
            ),
            new NamedValue(
                "input",
                new Value(
                    new StaticLocation(),
                    FunctionType.getInstance(
                        VoidType.getInstance(),
                        [
                            PtrType.getInstance(CharType.getInstance()),
                        ],
                    ),
                    new DebugPosition(0, 0, 0),
                )
            ),
        );
    }


    override get scopeId(): string {
        return TypeofScope[this.typeofScope];
    }

    override addNewVarValue(val: NamedValue): void {
        if (!(val.valueType instanceof FunctionType)) {
            throwError(new DebugPosError(val.pos, `Only FUNCTION object types can exist in global scope`));
        }
        super.addNewVarValue(val);
    }

}