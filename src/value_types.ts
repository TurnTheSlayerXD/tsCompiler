import { Context } from './context';
import { ParserError, throwError, TODO, TypeError, UNREACHABLE } from './helper';
import { Position } from './lexer';

export interface ValueType {
    is_const: boolean;
    toString: () => string;
    isSameType(type: ValueType): boolean;
    size(): number;

    asm_from_literal(context: Context, name: string, literal: string | null, pos: Position): Value;
    asm_copy(context: Context, src: Value, dst_self: Value): void;

    asm_from_plus(context: Context, self: Value, rhs: Value): Value;
    asm_from_minus(context: Context, self: Value, rhs: Value): Value;
    asm_from_multiply(context: Context, self: Value, rhs: Value): Value;
    asm_from_divide(context: Context, self: Value, rhs: Value): Value;
}

export class IntType implements ValueType {

    static instance: IntType | null = null;
    private constructor() {
    }
    asm_from_plus(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_from_minus(context: Context, self: Value, rhs: Value): Value {
        self.valueType.isSameType(this) || UNREACHABLE();
        context.addAssembly(`
            \rmovl ${self.address}(%rsp), %edx
            \rsubl ${rhs.address}(%rsp), %edx
            \rmovl %edx, ${context.pushStack(this.size())}(%rsp)
            `);
        return new Value('_temp', this, self.pos, context.stackPtr);
    }
    asm_from_multiply(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_from_divide(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
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
    public toString = (): string => {
        return this.is_const ? "const int" : "int";
    }
    size(): number { return 4; }

    asm_from_literal(context: Context, name: string = '_temp', literal: string | null, pos: Position): Value {
        const val = new Value(name, this, pos);
        context.pushStack(this.size());
        context.addAssembly(`
            \rmovl $${literal ?? 0}, ${context.stackPtr}(%rsp)
            `);
        val.address = context.stackPtr;
        return val;
    }
    asm_create_from_variable(context: Context, name: string = '_temp', assigned_value: Value, pos: Position): Value {
        const val = new Value(name, this, pos);
        if (!this.isSameType(assigned_value.valueType)) {
            throwError(new TypeError(assigned_value.pos, `Can't convert ${assigned_value.valueType} to ${this.toString()}`));
        }
        context.addAssembly(`
            \rmovl ${assigned_value.address}(%rsp), %edx
            \rmovl %edx, ${context.pushStack(this.size())}(%rsp)
            `);
        assigned_value.address = context.stackPtr;
        return val;
    }

    asm_copy(context: Context, src: Value, dst_self: Value): void {
        dst_self.valueType.isSameType(this) || UNREACHABLE();
        if (!this.isSameType(src.valueType)) {
            throwError(new TypeError(src.pos, `Can't convert ${src.valueType} to ${this.toString()}`));
        }
        context.addAssembly(`
            \rmovl ${src.address}(%rsp), %edx
            \rmovl %edx, ${dst_self.address}(%rsp)
            `);
    }

}

export class CharType implements ValueType {

    static instance: CharType | null = null;
    private constructor() {
    }
    asm_from_literal(context: Context, name: string, literal: string | null, pos: Position): Value {
        context.pushStack(this.size());
        context.addAssembly(`
            \rmovb $${literal ?? 0} ${context.stackPtr}(%rsp)
            `);
        return new Value(name, this, pos, context.stackPtr);
    }
    asm_create_from_variable(context: Context, name: string, value: Value, pos: Position): Value {
        if (!this.isSameType(value.valueType)) {
            throwError(new TypeError(value.pos, `Can't convert ${value.valueType} to ${this.toString()}`));
        }
        context.addAssembly(`
            \rmovb ${value.address}(%rsp), %dh
            \rmovb %dh, ${context.pushStack(this.size())}(%rsp)
            `);
        return new Value(name, this, pos, context.stackPtr);
    }
    asm_copy(context: Context, src: Value, dst_self: Value): void {
        dst_self.valueType.isSameType(this) || UNREACHABLE();
        if (!this.isSameType(src.valueType)) {
            throwError(new TypeError(src.pos, `Can't convert ${src.valueType} to ${this.toString()}`));
        }
        context.addAssembly(`
            \rmovb ${src.address}(%rsp), %dh
            \rmovb %dh, ${dst_self.address}(%rsp)
            `);
    }

    asm_from_plus(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_from_minus(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_from_multiply(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_from_divide(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
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

    public toString = (): string => {
        return this.is_const ? "const char" : "char";
    }

    size(): number { return 1; }
}


export class VoidType implements ValueType {
    static instance: VoidType | null = null;
    private constructor() {
    }
    asm_copy(context: Context, src: Value, dst_self: Value): void {
        throw new Error('Method not implemented.');
    }
    asm_from_literal(context: Context, name: string, literal: string | null, pos: Position): Value {
        throw new Error('Method not implemented.');
    }
    asm_create_from_variable(context: Context, name: string, value: Value, pos: Position): Value {
        throw new Error('Method not implemented.');
    }
    asm_from_plus(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_from_minus(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_from_multiply(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_from_divide(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
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

    public toString = (): string => {
        return "void";
    }

    size(): number { return 1; }
}

export class PtrType implements ValueType {
    private static instances: PtrType[] = [];

    private constructor(public ptrTo: ValueType) { }

    asm_from_literal(context: Context, name: string, literal: string | null, pos: Position): Value {
        if (this.ptrTo.isSameType(CharType.getInstance()) && !!literal) {
            for (let i = literal.length - 1; i > -1; --i) {
                context.pushStack(CharType.getInstance().size());
                context.addAssembly(`
                    \rmovb $${literal.charCodeAt(i)}, ${context.stackPtr}(%rsp)
                    `);
            }
            context.pushStack(CharType.getInstance().size());
            context.addAssembly(`
                    \rmovb $${'\0'.charCodeAt(0)}, ${context.stackPtr}(%rsp)
                    `);
            return new Value(name, this, pos, context.stackPtr);
        }

        TODO();
    }
    asm_create_from_variable(context: Context, name: string, value: Value, pos: Position): Value {
        if (!this.isSameType(value.valueType)) {
            throwError(new TypeError(value.pos, "Cannot assign int from nonint"));
        }
        context.addAssembly(`
            \rmovq ${value.address}(%rsp), %rdx
            \rmovq %rdx, ${context.pushStack(this.size())}(%rsp)
            `);
        return new Value(name, this, pos, context.stackPtr);
    }

    asm_copy(context: Context, src: Value, dst_self: Value): void {
        dst_self.valueType.isSameType(this) || UNREACHABLE();
        if (!this.isSameType(src.valueType)) {
            throwError(new TypeError(src.pos, `Can't convert ${src.valueType} to ${this.toString()}`));
        }
        context.addAssembly(`
            \rmovq ${src.address}(%rsp), %rdx
            \rmovq %rdx, ${dst_self.address}(%rsp)
            `);
    }

    asm_from_plus(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_from_minus(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_from_multiply(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_from_divide(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
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

    public toString = (): string => {
        return this.is_const ? `${this.ptrTo.toString()} * const` : `${this.ptrTo.toString()} *`;
    }

    size(): number { return 8; }
}

export class FunctionType implements ValueType {

    private static instances: FunctionType[] = [];

    private constructor(public returnType: ValueType, public paramTypes: ValueType[]) { }
    asm_copy(context: Context, src: Value, dst_self: Value): void {
        throw new Error('Method not implemented.');
    }
    asm_from_literal(context: Context, name: string, literal: string | null, pos: Position): Value {
        throw new Error('Method not implemented.');
    }
    asm_create_from_variable(context: Context, name: string, value: Value, pos: Position): Value {
        throw new Error('Method not implemented.');
    }
    asm_from_plus(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_from_minus(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_from_multiply(context: Context, self: Value, rhs: Value): Value {
        throw new Error('Method not implemented.');
    }
    asm_from_divide(context: Context, self: Value, rhs: Value): Value {
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
    public toString = (): string => {
        return `${this.returnType.toString()} (${this.paramTypes.map((p) => p.toString()).join(', ')})`;
    }
    size(): number { return 8; }
}



export class Value {
    private _address: number | null = null;

    constructor(public name: string, public valueType: ValueType, public pos: Position, address: number | null = null) {
        this._address = address;
    }

    public toString = (): string => {
        return `Value {\n\rName: [${this.name}]\n\rType: [${this.valueType.toString()}]\n\rAddress: ${this.address}(%rsp)\n\r}`
    }

    get address(): number {
        return this._address ?? throwError(new Error("Accessed before assigned"));
    }

    set address(address: number) {
        this._address = address;
    }
}
