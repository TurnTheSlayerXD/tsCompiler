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


type PossibleRegisterNames = 'rax' | 'eax' | 'ax' | 'rcx' | 'ecx' | 'cx' | 'ax' | 'r9' | 'rdx' | 'r8d' | 'dh' | 'al';

type BaseRegisterNames = "ax" | "bx" | "cx" | "ex";
export class Register implements MemLocation {

    protected static staticRegisters: Register[] = [];

    private constructor(public registerName: PossibleRegisterNames) {
    }
    non(): void {
        throw new Error("Method not implemented.");
    }

    public static getRegisterNameBasedOnSizeofType(register_prefix: BaseRegisterNames, size: number): PossibleRegisterNames {
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
        return this.getFrom("ax", returnType.size);
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