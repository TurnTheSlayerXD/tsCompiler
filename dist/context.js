"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
const helper_1 = require("./helper");
const value_types_1 = require("./value_types");
const fs = __importStar(require("fs"));
class Context {
    lexer;
    BUILT_IN_TYPES = {
        int: value_types_1.IntType.constructor,
        char: value_types_1.CharType.constructor,
    };
    scopeValues = [[],];
    scopeTypes = [[],];
    literals = [];
    asm = '';
    stackPtr = 100;
    init_stack_offset = this.stackPtr;
    constructor(lexer) {
        this.lexer = lexer;
    }
    pushStack(size) {
        this.stackPtr -= size;
        return this.stackPtr;
    }
    getLiteralsAsm() {
        return this.literals.map((l, index) => `"_${index}_literal":
                                            .asciz: "${l}"\n`).join('\n');
    }
    getAsm() {
        return this.asm;
    }
    asmToFile(filename) {
        fs.writeFileSync(filename, this.asm);
    }
    isFamiliarTypename(typename) {
        switch (typename) {
            case 'int': return value_types_1.IntType.getInstance();
            case 'char': return value_types_1.CharType.getInstance();
            case 'void': return value_types_1.VoidType.getInstance();
            default: return null;
        }
    }
    isFamiliarTypenameOrThrow(typename) {
        if (typename in this.BUILT_IN_TYPES) {
            return this.BUILT_IN_TYPES[typename]();
        }
        throw new helper_1.ParserError(this.lexer, `Unknown type: [${typename}]`);
    }
    pushScope() {
        this.scopeValues.push([]);
        this.scopeTypes.push([]);
    }
    popScope() {
        this.scopeValues.pop();
        this.scopeTypes.pop();
    }
    addScopeType() {
        (0, helper_1.TODO)();
    }
    addAssembly(asm) {
        this.asm += asm;
    }
    addScopeValue(value) {
        this.scopeValues.at(-1).push(value);
    }
    addStringLiteral(literal) {
        if (!this.literals.includes(literal)) {
            this.literals.push(literal);
        }
        return `"_${this.literals.indexOf(literal)}_literal"`;
    }
    isFamiliarValueName(name) {
        if (name === 'print') {
            return new value_types_1.Value('print', value_types_1.FunctionType.getInstance(value_types_1.VoidType.getInstance(), [value_types_1.PtrType.getInstance(value_types_1.CharType.getInstance()), value_types_1.IntType.getInstance()]));
        }
        return null;
    }
    isFamiliarValueNameOrThrow(name) {
        return this.isFamiliarValueName(name) || (0, helper_1.throwError)(new helper_1.ParserError(this.lexer, `No such value name ${name}`));
    }
    getValueWithTypeOrThrow(name, type) {
        const value = this.isFamiliarValueNameOrThrow(name);
        const expected = value.valueType;
        const found = type;
        return expected.isSameType(type) ? value : (0, helper_1.throwError)(new helper_1.ParserError(this.lexer, `Unmatched type: expected ${expected}, found ${found}`));
    }
}
exports.Context = Context;
