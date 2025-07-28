import { FunctionType, Value, ValueType } from "./value_types";



class Scope {
    public familiarTypeNames: ValueType[] = [];
    public familiarValues: Value[] = [];

    addKnownValue(val: Value) {
        this.familiarValues.push(val);
    }
    removeKnownValue(val: Value) {
        this.familiarValues.push(val);
    }

    hasName(name: string) {
        return this.familiarValues.find((v) => v.name === name);
    }
}