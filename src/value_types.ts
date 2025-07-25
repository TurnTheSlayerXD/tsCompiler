export interface ValueType {
    is_const: boolean;
    canAdd(value: ValueType): string;
    canSubtract(value: ValueType): string;
    canAssignTo(value: ValueType): string;
    toString(): string;
}

export class VarType implements ValueType {
    constructor() {
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

    toString(): string {
        throw new Error("Method not implemented.");
    }
}

export class IntType extends VarType {

    override toString(): string {
        return "int";
    }
}

export class CharType extends VarType {

    override toString(): string {
        return "char";
    }
}

export class PtrType implements ValueType {
    constructor(public ptrTo: ValueType) { }

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

    toString(): string {
        return `${this.ptrTo.toString()} *`;
    }
}

export class FunctionType implements ValueType {
    constructor(public returnType: ValueType, public paramTypes: ValueType[]) { }

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
    toString(): string {
        throw new Error("Method not implemented.");
    }
}


export class Value {
    constructor(public name: string, public valueType: ValueType) { }
}
