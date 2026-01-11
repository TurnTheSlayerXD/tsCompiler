import { UNREACHABLE } from "../helper";
import { Scope } from "../scope";
import { ValueType } from "../value_types/value_type";

export interface MemLocation {

    non(): void;
}

export class StaticLocation implements MemLocation {
    non(): void { };
}

export class StackLoc implements MemLocation {

    constructor(public stackPos: string, private _offset: number, private _allocSize: number, public relatedScope: Scope) {

    }

    get offset(): number {
        return this._offset;
    }

    get allocSize(): number {
        return this._allocSize;
    }

    non(): void {
        throw new Error("Method not implemented.");
    }
}

export class IndirectStackLoc implements MemLocation {
    public constructor(public stackLoc: StackLoc) {
    }

    get offset(): number {
        return this.stackLoc.offset;
    }

    non(): void {
        throw new Error("Method not implemented.");
    }
}



export class LiteralMemLocation implements MemLocation {
    private static _staticNull: LiteralMemLocation | undefined;
    private static _staticOne: LiteralMemLocation | undefined;

    public constructor(public literal: number) {

    }
    non(): void {
        throw new Error("Method not implemented.");
    }

    static staticNull(): LiteralMemLocation {
        if (!LiteralMemLocation._staticNull) {
            LiteralMemLocation._staticNull = new LiteralMemLocation(0);
        }
        return LiteralMemLocation._staticNull;
    }

    static staticOne(): LiteralMemLocation {
        if (!LiteralMemLocation._staticOne) {
            LiteralMemLocation._staticOne = new LiteralMemLocation(1);
        }
        return LiteralMemLocation._staticOne;
    }
}


type PossibleRegisterNames = 'rax' | 'eax' | 'ax' | 'rcx' | 'ecx' | 'cx' | 'ax' | 'r9' | 'rdx' | 'r8d' | 'dh' | 'al' | 'ah' | 'bh' | 'bx' | 'ebx' | 'rbx' | 'ch' | 'dx' | 'edx' | 'r8b' | 'r8w' | 'r8d' | 'r8' | 'r9b' | 'r9w' | 'r9d';

type BaseRegisterNames = "a" | "b" | "c" | "d" | "r8" | "r9";
export class Register implements MemLocation {

    protected static staticRegisters: Register[] = [];

    private static MAPPER: Record<BaseRegisterNames, Record<number, PossibleRegisterNames>> = {
        "a": { 1: "ah", 2: "ax", 4: "eax", 8: "rax" },
        "b": { 1: "bh", 2: "bx", 4: "ebx", 8: "rbx" },
        "c": { 1: "ch", 2: "cx", 4: "ecx", 8: "rcx" },
        "d": { 1: "dh", 2: "dx", 4: "edx", 8: "rdx" },
        "r8": { 1: "r8b", 2: "r8w", 4: "r8d", 8: "r8" },
        "r9": { 1: "r9b", 2: "r9w", 4: "r9d", 8: "r9" },
    };

    private constructor(public registerName: PossibleRegisterNames) {
    }
    non(): void {
        throw new Error("Method not implemented.");
    }

    private static getRegisterNameBasedOnSizeofType(register_prefix: BaseRegisterNames, size: number): PossibleRegisterNames {
        if (size !== 1 && size !== 2 && size !== 4 && size !== 8) {
            UNREACHABLE();
        }

        return this.MAPPER[register_prefix][size]!;

    }

    public static getFrom(register_prefix: BaseRegisterNames, size: number): Register {
        return this.getInstance(this.getRegisterNameBasedOnSizeofType(register_prefix, size));
    }

    public static getInstance(registerName: PossibleRegisterNames): Register {
        const existing = Register.staticRegisters.find(t => registerName === t.registerName);
        if (!existing) {
            const newRegister = new Register(registerName);
            Register.staticRegisters.push(newRegister);
            return newRegister;
        }
        return existing;
    }

    public static forIndirect(): Register {
        return this.getInstance("rcx");
    }
    public static forParamPass(): Register {
        return this.getInstance("rdx")
    }
    public static forReturnValue(returnType: ValueType): Register {
        return this.getFrom("a", returnType.size);
    }
}



export class IndirectRegister implements MemLocation {
    public constructor(public register: Register) {
    }
    non(): void {
        throw new Error("Method not implemented.");
    }
}

export class IndirectRegisterWithOffset implements IndirectRegister {
    constructor(public register: Register, public offset: number) {
    }
    non(): void {
        throw new Error("Method not implemented.");
    }
}