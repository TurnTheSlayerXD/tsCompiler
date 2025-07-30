import { Context } from './context';
import { throwError, TODO } from './helper';

export interface ValueType {
    is_const: boolean;
    canAdd(value: ValueType): string;
    canSubtract(value: ValueType): string;
    canAssignTo(value: ValueType): string;

    toString: () => string;
    isSameType(type: ValueType): boolean;
    size(): number;
    asm_push_to_stack(context: Context, assigned_value: string | null): number;
}

export class IntType implements ValueType {

    static instance: IntType | null = null;
    private constructor() {
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
    size(): number { return 4; }

    asm_push_to_stack(context: Context, assigned_value: string | null): number {
        context.pushStack(this.size());
        context.addAssembly(`
            \rmovl $${assigned_value}, ${context.stackPtr}(%rsp)
            `);
        return context.stackPtr;
    }
}

export class CharType implements ValueType {

    static instance: CharType | null = null;
    private constructor() {
    }

    asm_push_to_stack(context: Context, assigned_value: string | null): number {
        context.pushStack(this.size());
        context.addAssembly(`
            \rmovb $${assigned_value} ${context.stackPtr}(%rsp)
            `);
        return context.stackPtr;
    }

    static getInstance(): CharType {
        if (!this.instance) {
            this.instance = new CharType();
        }
        return this.instance;
    }
    isSameType(type: ValueType): boolean {
        return type instanceof CharType;
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

    size(): number { return 1; }
}


export class VoidType implements ValueType {
    static instance: VoidType | null = null;
    private constructor() {
    }
    asm_push_to_stack(context: Context, assigned_value: string | null): number {
        context.pushStack(this.size());
        context.addAssembly(`
            \rmovb $${assigned_value} ${context.stackPtr}(%rsp)
            `);
        return context.stackPtr;
    }
    static getInstance(): VoidType {
        if (!this.instance) {
            this.instance = new VoidType();
        }
        return this.instance;
    }

    isSameType(type: ValueType): boolean {
        return type instanceof VoidType;
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

    size(): number { return 1; }
}

export class PtrType implements ValueType {
    private static instances: PtrType[] = [];

    private constructor(public ptrTo: ValueType) { }
    asm_push_to_stack(context: Context, assigned_value: string | null): number {
        if (this.ptrTo.isSameType(CharType.getInstance()) && !!assigned_value) {
            for (let i = assigned_value.length - 1; i > -1; --i) {
                context.pushStack(CharType.getInstance().size());
                context.addAssembly(`
                    \rmovb $${assigned_value.charCodeAt(i)}, ${context.stackPtr}(%rsp)
                    `);
            }
            return context.stackPtr;
        }
        TODO();
    }

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

    size(): number { return 8; }
}

export class FunctionType implements ValueType {

    private static instances: FunctionType[] = [];

    private constructor(public returnType: ValueType, public paramTypes: ValueType[]) { }
    asm_push_to_stack(context: Context, assigned_value: string | null): number {
        throw new Error('Method not implemented.');
    }

    static getInstance(returnType: ValueType, paramTypes: ValueType[]): FunctionType {
        const new_inst = new FunctionType(returnType, paramTypes);
        const ret = this.instances.find(tp => tp.isSameType(new_inst));
        if (!ret) {
            this.instances.push(new_inst);
        }
        return this.instances.find(tp => tp.isSameType(new_inst)) ?? throwError(new Error('wtf'));
    }
    isSameType(rhs: ValueType): boolean {
        if (!(rhs instanceof FunctionType)) {
            return false;
        }
        if (!this.returnType.isSameType(rhs.returnType)) {
            return false;
        }
        if (this.paramTypes.length !== rhs.paramTypes.length) {
            return false;
        }
        for (let i = 0; i < this.paramTypes.length; ++i) {
            if (!(this.paramTypes[i]!.isSameType(rhs.paramTypes[i]!))) {
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
    size(): number { return 8; }
}


export class Value {
    address: number | null = null;

    constructor(public name: string, public valueType: ValueType) { }

    public toString = (): string => {
        return `Name: [${this.name}] Type: [${this.valueType.toString()}]`
    }

    setValue(context: Context, assigned_value: string) {
        this.address = this.valueType.asm_push_to_stack(context, assigned_value);
    }

    public getAddress(): number {
        if (!this.address)
            throw new Error("Accessed before assigned");
        return this.address;
    }


}
