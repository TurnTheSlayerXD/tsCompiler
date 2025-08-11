import { throwError, UNREACHABLE } from "./helper";
import { Value, ValueType } from "./value_types";

export class Scope {
    private _used_space: number;
    public cur_offset = 0;
    constructor(
        public scopeName: string,
        public parentScope: Scope | null,
        public scopeValues: Value[] = [],
        public scopeTypes: ValueType[] = [],
        used_space = 0,
    ) {

        this._used_space = used_space;

    }

    get used_space(): number {
        return this._used_space;
    }

    set used_space(offset: number) {
        this._used_space = offset;
        this.cur_offset = offset;
    }


    get_distance_to(rhs: Scope): number {
        let parent = this.parentScope;
        let offset = this._used_space;
        while (rhs !== parent) {
            if (parent === null) {
                UNREACHABLE();
            }
            offset += parent._used_space;
            parent = parent.parentScope;
        }
        return offset;
    }
}

