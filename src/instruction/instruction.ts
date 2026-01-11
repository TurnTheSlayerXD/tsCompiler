import { UNREACHABLE } from "../helper";
import { Scope } from "../scope";
import { MemLocation, Register } from "./mem_location";


export abstract class Instruction {
    abstract non(): void;
    abstract toString: () => string;
}

type mov_i =
    "movb" |
    "movr" |
    "movl" |
    "movq" |
    "movsbl";

export function get_mov_i_on_size(sizeoftype: number): mov_i {

    switch (sizeoftype) {
        case 1: return "movb";
        case 2: return "movr";
        case 4: return "movl";
        case 8: return "movq";
        default: UNREACHABLE();
    }
}

export class MovInstr extends Instruction {
    constructor(public mov_i: mov_i, public dst: MemLocation, public src: MemLocation) {
        super();
    }
    override non(): void {
        throw new Error("Method not implemented.");
    }
    override toString: () => string = (): string => `MOV_INSTR`;
}

export class MarkToJump extends Instruction {
    public constructor(public tag: string) {
        super();
    }
    override non(): void {
        throw new Error("Method not implemented.");
    }
    override toString: () => string = (): string => `MARK_TO_JUMP`;
}


export class StringInstruction extends Instruction {
    public constructor(public text: string) {
        super();
    }

    override non(): void {
        throw new Error("Method not implemented.");
    }
    override toString: () => string = (): string => `STRING`;
}


type lea_i = "leaq";
export class LeaqInstruction extends Instruction {
    override non(): void {
        throw new Error("Method not implemented.");
    }

    constructor(public lea_i: lea_i, public dst: Register, public src: MemLocation) {
        super();
    }
    override toString: () => string = (): string => `LEA`;

}

export class ScopeStartInstr extends Instruction {
    constructor(public scope: Scope) {
        super();
    }
    override non(): void {
        throw new Error("Method not implemented.");
    }
    override toString: () => string = (): string => `SCOPE_START_INSTR`;

}

export class ScopeEndInstr extends Instruction {
    constructor(public scope: Scope) {
        super();
    }
    override non(): void {
        throw new Error("Method not implemented.");
    }
    override toString: () => string = (): string => `SCOPE_END_INSTR`;

}


export class PushScopeInstr extends Instruction {
    constructor(public scope: Scope) {
        super();
    }
    override non(): void {
        throw new Error("Method not implemented.");
    }
    override toString: () => string = (): string => `PUSH_SCOPE`;

}


export class PopScopeInstr extends Instruction {
    constructor(public scope: Scope) {
        super();
    }
    override non(): void {
        throw new Error("Method not implemented.");
    }
    override toString: () => string = (): string => `POP_SCOPE`;

}

export class JmpInstr extends Instruction {
    constructor(public markToJmp: MarkToJump) {
        super();
    }
    override non(): void {
        throw new Error("Method not implemented.");
    }
    override toString: () => string = (): string => `JMP`;

}

export class RetqInstr extends Instruction {
    constructor() {
        super();
    }
    override non(): void {

    }

    override toString: () => string = (): string => `RETQ`;
}