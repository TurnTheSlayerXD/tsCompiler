import { UNREACHABLE } from "../helper";
import { MemLocation } from "./mem_location";




export abstract class Instruction {
    abstract non(): void;
}

type mov_i =
    "movb" |
    "movr" |
    "movl" |
    "movq";

export function get_mov_i_on_size(sizeoftype: number): mov_i {

    switch (sizeoftype) {
        case 1: return "movb";
        case 2: return "movr";
        case 3: return "movl";
        case 4: return "movq";
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
}

export class MarkToJump extends Instruction {
    public constructor(public tag: string) {
        super();
    }
    override non(): void {
        throw new Error("Method not implemented.");
    }
}


export class StringInstruction extends Instruction {
    public constructor(public text: string) {
        super();
    }

    override non(): void {
        throw new Error("Method not implemented.");
    }
}

export { MemLocation };
