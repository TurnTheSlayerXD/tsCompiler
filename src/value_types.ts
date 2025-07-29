import { toString } from './lexer';




export interface ValueType {
    is_const: boolean;
    canAdd(value: ValueType): string;
    canSubtract(value: ValueType): string;
    canAssignTo(value: ValueType): string;

    toString: () => string;
    isSameType(type: ValueType): boolean;
}

export class IntType implements ValueType {

    static instance: IntType | null = null;
    private constructor() {
    }
    isSameType(type: ValueType): boolean {
        return type === this;
    }
    static getInstance(): IntType {
        if (!this.instance) {
            this.instance = new IntType();
        }
        return this.instance;
    }

    is_const: boolean = false;
    canAdd(value: ValueType): string {
        throw new Error("Method not implemented.");
    }
    canSubtract(value: ValueType): string {
        throw new Error("Method not implemented.");
    }
    canAssignTo(value: ValueType): string {
        throw new Error("Method not implemented.");
    }

    public toString = (): string => {
        return this.is_const ? "const int" : "int";
    }

}
export class CharType implements ValueType {

    static instance: CharType | null = null;
    private constructor() {
    }
    static getInstance(): CharType {
        if (!this.instance) {
            this.instance = new CharType();
        }
        return this.instance;
    }
    isSameType(type: ValueType): boolean {
        return type === this;
    }


    is_const: boolean = false;
    canAdd(value: ValueType): string {
        throw new Error("Method not implemented.");
    }
    canSubtract(value: ValueType): string {
        throw new Error("Method not implemented.");
    }
    canAssignTo(value: ValueType): string {
        throw new Error("Method not implemented.");
    }

    public toString = (): string => {
        return this.is_const ? "const char" : "char";
    }
}


export class VoidType implements ValueType {
    static instance: VoidType | null = null;
    private constructor() {
    }
    static getInstance(): VoidType {
        if (!this.instance) {
            this.instance = new VoidType();
        }
        return this.instance;
    }

    isSameType(type: ValueType): boolean {
        return type === this;
    }
    is_const: boolean = false;


    canAdd(value: ValueType): string {
        throw new Error("Method not implemented.");
    }
    canSubtract(value: ValueType): string {
        throw new Error("Method not implemented.");
    }
    canAssignTo(value: ValueType): string {
        throw new Error("Method not implemented.");
    }

    public toString = (): string => {
        return "void";
    }
}

export class PtrType implements ValueType {
    private static instances: PtrType[] = [];

    private constructor(public ptrTo: ValueType) { }

    static getInstance(ptrTo: ValueType): PtrType {
        const new_inst = new PtrType(ptrTo);
        const ret = this.instances.find(tp => tp.isSameType(new_inst));
        if (!ret) {
            this.instances.push(new_inst);
        }
        return new_inst;
    }
    isSameType(type: ValueType): boolean {
        if (!(type instanceof PtrType)) {
            return false;
        }
        return this.ptrTo.isSameType(type.ptrTo);
    }

    is_const: boolean = false;
    canAdd(value: ValueType): string {
        throw new Error("Method not implemented.");
    }
    canSubtract(value: ValueType): string {
        throw new Error("Method not implemented.");
    }
    canAssignTo(value: ValueType): string {
        throw new Error("Method not implemented.");
    }

    public toString = (): string => {
        return this.is_const ? `${this.ptrTo.toString()} * const` : `${this.ptrTo.toString()} *`;
    }
}

export class FunctionType implements ValueType {

    private static instances: FunctionType[] = [];

    private constructor(public returnType: ValueType, public paramTypes: ValueType[]) { }

    static getInstance(returnType: ValueType, paramTypes: ValueType[]): FunctionType {
        const new_inst = new FunctionType(returnType, paramTypes);
        const ret = this.instances.find(tp => tp.isSameType(new_inst));
        if (!ret) {
            this.instances.push(new_inst);
        }
        return new_inst;
    }
    isSameType(rhs: ValueType): boolean {
        if (!(rhs instanceof FunctionType)) {
            return false;
        }
        if (this.returnType.isSameType(rhs.returnType)) {
            return false;
        }
        if (this.paramTypes.length !== rhs.paramTypes.length) {
            return false;
        }
        for (let i = 0; i < this.paramTypes.length; ++i) {
            if (!this.paramTypes[i]!.isSameType(rhs.paramTypes[i]!)) {
                return false;
            }
        }
        return true;
    }


    is_const: boolean = false;
    canAdd(value: ValueType): string {
        throw new Error("Method not implemented.");
    }
    canSubtract(value: ValueType): string {
        throw new Error("Method not implemented.");
    }
    canAssignTo(value: ValueType): string {
        throw new Error("Method not implemented.");
    }

    public toString = (): string => {
        return `${this.returnType.toString()} (${this.paramTypes.map((p) => p.toString()).join(', ')})`;
    }
}


export class Value {
    constructor(public name: string, public valueType: ValueType) { }

    public toString = (): string => {
        return `Name: [${this.name}] Type: [${this.valueType.toString()}]`
    }

    public getAddress(): number {
        return 0;
    }
}
