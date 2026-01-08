export interface MemLocation {

    non(): void;
}

export class StaticLocation implements MemLocation {
    non(): void { };
}

export class StackLoc implements MemLocation {

    constructor(public stackPos: string, private _offset: number, private _allocSize: number) {

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


export class LiteralMemLocation implements MemLocation {

    public constructor(public literal: number) {

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

type PossibleRegisterNames = 'rax' | 'eax' | 'ax' | 'rcx' | 'ecx' | 'cx' | 'ax';

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

    public static getRegisterForIndirect(): Register {
        return this.getInstance("rcx");
    }
}



export class IndirectRegister implements MemLocation {
    public constructor(public register: Register) {
    }
    non(): void {
        throw new Error("Method not implemented.");
    }
}

