"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Scope {
    familiarTypeNames = [];
    familiarValues = [];
    addKnownValue(val) {
        this.familiarValues.push(val);
    }
    removeKnownValue(val) {
        this.familiarValues.push(val);
    }
    hasName(name) {
        return this.familiarValues.find((v) => v.name === name);
    }
}
