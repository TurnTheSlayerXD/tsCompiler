import { Value, ValueType } from "./value_types";

export class Scope {
    constructor(
        public scopeName: string,
        public stackPtr: number,
        public scopeValues: Value[] = [],
        public scopeTypes: ValueType[] = []) { }
}

