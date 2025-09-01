"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scope = exports.TypeofScope = void 0;
const helper_1 = require("./helper");
var TypeofScope;
(function (TypeofScope) {
    TypeofScope[TypeofScope["CYCLE_SCOPE"] = 0] = "CYCLE_SCOPE";
    TypeofScope[TypeofScope["IF_SCOPE"] = 1] = "IF_SCOPE";
    TypeofScope[TypeofScope["FUN_SCOPE"] = 2] = "FUN_SCOPE";
})(TypeofScope || (exports.TypeofScope = TypeofScope = {}));
class Scope {
    scopeName;
    parentScope;
    typeofScope;
    scopeValues;
    _used_space = 0;
    cur_offset = 0;
    constructor(scopeName, parentScope, typeofScope, scopeValues = []) {
        this.scopeName = scopeName;
        this.parentScope = parentScope;
        this.typeofScope = typeofScope;
        this.scopeValues = scopeValues;
    }
    get used_space() {
        return this._used_space;
    }
    set used_space(offset) {
        this._used_space = offset;
        this.cur_offset = offset;
    }
    get_distance_to(rhs) {
        let parent = this.parentScope;
        let offset = this._used_space;
        while (rhs !== parent) {
            if (parent === null) {
                (0, helper_1.UNREACHABLE)();
            }
            offset += parent._used_space;
            parent = parent.parentScope;
        }
        return offset;
    }
}
exports.Scope = Scope;
