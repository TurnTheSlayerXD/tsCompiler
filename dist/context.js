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
const lexer_1 = require("./lexer");
const fs = __importStar(require("fs"));
const scope_1 = require("./scope");
const value_1 = require("./value");
const char_type_1 = require("./value_types/char_type");
const function_type_1 = require("./value_types/function_type");
const int_type_1 = require("./value_types/int_type");
const ptr_type_1 = require("./value_types/ptr_type");
const value_type_1 = require("./value_types/value_type");
const void_type_1 = require("./value_types/void_type");
class Context {
    lexer;
    BUILT_IN_TYPES = {
        int: int_type_1.IntType.constructor,
        char: char_type_1.CharType.constructor,
    };
    custom_types = [];
    cur_function = null;
    literals = [];
    asm = '';
    dead_scopes = new Map();
    mark_num = 0;
    scope_id = 0;
    globals = [];
    subq_expr_stack_positions = [];
    init_stack_offset = 1000;
    scopes = [];
    constructor(lexer) {
        this.lexer = lexer;
    }
    _stackPtr = this.init_stack_offset;
    get stackPtr() {
        return this._stackPtr;
    }
    gen_scope_id() {
        return this.scope_id++;
    }
    pushStack(size) {
        const scope = this.scopes.at(-1);
        scope.used_space += size;
        this._stackPtr -= size;
        return this._stackPtr;
    }
    getLiteralsAsm() {
        return this.literals.map((l, index) => `"_${index}_literal":
                                            .asciz: "${l}"\n`).join('\n');
    }
    getAsm() {
        return this.asm;
    }
    asmToFile(filename) {
        this.asm = this.asm.replaceAll(/\s*\n\s*/g, '\n');
        fs.writeFileSync('./v1.asm', this.asm);
        this.optimize_stack_space();
        this.asm = this.asm.replaceAll(/\s*\n\s*/g, '\n');
        fs.writeFileSync(filename, this.asm);
        console.log(`Out: ${filename}`);
    }
    getTypeFromTypename(typename) {
        switch (typename) {
            case 'int': return int_type_1.IntType.getInstance();
            case 'char': return char_type_1.CharType.getInstance();
            case 'void': return void_type_1.VoidType.getInstance();
            default: {
                let struct_type;
                if (struct_type = this.custom_types.find(v => v.struct_name === typename)) {
                    return struct_type ?? null;
                }
                return null;
            }
        }
    }
    hasTypeAsBool(typename) {
        switch (typename) {
            case 'int': return true;
            case 'char': return true;
            case 'void': return true;
            default: {
                return !!this.custom_types.find(v => v.struct_name === typename);
            }
        }
    }
    pushScope(typeof_scope) {
        if (this.scopes.length > 0) {
            this.addAssembly(`
                \r#__end_${this.scopes.at(-1).scopeName}
            `);
        }
        if (this.scopes.length > 0) {
            this.scopes.push(new scope_1.Scope(`scope_${this.gen_scope_id()}`, this.scopes.at(-1), typeof_scope));
        }
        else {
            this.scopes.push(new scope_1.Scope(`scope_${this.gen_scope_id()}`, null, typeof_scope));
        }
        this.addAssembly(`
                \r#__begin_${this.scopes.at(-1).scopeName}
                \r#__init_${this.scopes.at(-1).scopeName}
                \rsubq $${this.init_stack_offset}, %rsp
            `);
    }
    clearAllStacks() {
        for (let i = this.scopes.length - 1; i > -1; --i) {
            this.addAssembly(`
            \r#__clear_${this.scopes[i].scopeName}
            \raddq $${this.init_stack_offset}, %rsp
        `);
        }
    }
    *asm_pop_scope() {
        for (const scope of (0, helper_1.toReversed)(this.scopes)) {
            yield scope;
            this.addAssembly(`
                \r#__clear_${scope.scopeName}
                \raddq $${this.init_stack_offset}, %rsp
                \r#__end_${scope.scopeName}
            `);
        }
    }
    popScope() {
        this.addAssembly(`
            \r#__clear_${this.scopes.at(-1).scopeName}
            \raddq $${this.init_stack_offset}, %rsp
            \r#__end_${this.scopes.at(-1).scopeName}
        `);
        const popped = this.scopes.pop() ?? (0, helper_1.UNREACHABLE)();
        this.dead_scopes.set(popped.scopeName, popped);
        if (this.scopes.length > 0) {
            this.addAssembly(`
                \r#__begin_${this.scopes.at(-1).scopeName}
            `);
        }
        return popped;
    }
    curScope() {
        return this.scopes.at(-1) ?? (0, helper_1.UNREACHABLE)();
    }
    *iter_scopes(lines) {
        let begin, prev = 0;
        while ((begin = (0, helper_1.findIndex)(lines, l => l.startsWith('#__begin_'), prev)) !== -1) {
            let end = (0, helper_1.findIndex)(lines, l => l.startsWith('#__end_'), begin);
            prev = end + 1;
            const scope_id = lines[begin].split('#__begin_', 2)[1];
            const cur_scope = this.dead_scopes.get(scope_id) ?? (0, helper_1.UNREACHABLE)();
            yield { scope: cur_scope, begin, end };
        }
    }
    static parse_rsp_ptr_from_line(cur_line) {
        let i = cur_line.indexOf('(%rsp)');
        i !== -1 || (0, helper_1.UNREACHABLE)();
        let j = cur_line.lastIndexOf(',', i);
        j = j === -1 ? cur_line.lastIndexOf(' ', i) : j;
        j !== -1 && j < i || (0, helper_1.throwError)(new Error(`j=${j}, i=${i} ${cur_line}`));
        j += 1;
        const offset = parseInt(cur_line.substring(j, i).trim());
        !Number.isNaN(offset) || (0, helper_1.throwError)(new Error(`parseInt, line: [${cur_line}]`));
        return offset;
    }
    static replace_rsp_ptr_in_line(lines, c, ptr) {
        const cur_line = lines[c];
        let i = cur_line.indexOf('(%rsp)');
        i !== -1 || (0, helper_1.UNREACHABLE)();
        let j = cur_line.lastIndexOf(',', i);
        j = j === -1 ? cur_line.lastIndexOf(' ', i) : j;
        j !== -1 && j < i || (0, helper_1.throwError)(new Error(`j=${j}, i=${i} ${cur_line}`));
        j += 1;
        lines[c] = `\r${cur_line.substring(0, j)} ${ptr}${cur_line.substring(i)}`;
    }
    optimize_stack_space() {
        const lines = this.asm.split('\n');
        const mapped_rsp_scope = new Map();
        const mapped_rsp_loc = new Map();
        for (const { scope, begin, end } of this.iter_scopes(lines)) {
            lines.slice(begin, end)
                .filter(l => l.includes('(%rsp)'))
                .map(cur_line => Context.parse_rsp_ptr_from_line(cur_line))
                .forEach(rsp => {
                if (!mapped_rsp_scope.has(rsp)) {
                    mapped_rsp_scope.set(rsp, scope);
                }
            });
        }
        let lowest_ptr = 1000;
        let ptr;
        for (let i = 0; i < lines.length; ++i) {
            const l = lines[i];
            if (l.includes('(%rsp)')) {
                ptr = Context.parse_rsp_ptr_from_line(l);
                if (ptr < lowest_ptr) {
                    mapped_rsp_loc.set(ptr, { size: lowest_ptr - ptr, own_offset: undefined });
                    lowest_ptr = ptr;
                }
            }
        }
        for (const { scope, begin, end } of this.iter_scopes(lines)) {
            for (let l = begin; l < end; ++l) {
                if (lines[l].includes('(%rsp)')) {
                    const ptr = Context.parse_rsp_ptr_from_line(lines[l]);
                    const ptr_scope = mapped_rsp_scope.get(ptr) ?? (0, helper_1.UNREACHABLE)();
                    const loc = mapped_rsp_loc.get(ptr) ?? (0, helper_1.UNREACHABLE)();
                    if (ptr_scope == scope) {
                        if (loc.own_offset === undefined) {
                            scope.cur_offset -= loc.size;
                            loc.own_offset = scope.cur_offset;
                        }
                        [1, 4, 8].includes(loc.size) || (0, helper_1.UNREACHABLE)();
                        if (loc.own_offset < 0) {
                            (0, helper_1.UNREACHABLE)();
                        }
                        Context.replace_rsp_ptr_in_line(lines, l, loc.own_offset);
                    }
                    else {
                        const dist = scope.get_distance_to(ptr_scope);
                        if (loc.own_offset === undefined || dist + loc.own_offset < 0) {
                            (0, helper_1.UNREACHABLE)();
                        }
                        Context.replace_rsp_ptr_in_line(lines, l, dist + loc.own_offset);
                    }
                }
            }
        }
        for (const i of (0, helper_1.filterIndexes)(lines, l => l.startsWith('#__init_'))) {
            const scope_name = lines[i].split('#__init_', 2)[1];
            const scope = this.dead_scopes.get(scope_name) ?? (0, helper_1.UNREACHABLE)();
            lines[i + 1] = `subq $${scope.used_space}, %rsp`;
        }
        for (const i of (0, helper_1.filterIndexes)(lines, l => l.startsWith('#__clear_'))) {
            const scope_name = lines[i].split('#__clear_', 2)[1];
            const scope = this.dead_scopes.get(scope_name) ?? (0, helper_1.UNREACHABLE)();
            lines[i + 1] = `addq $${scope.used_space}, %rsp`;
        }
        this.asm = lines.join('\n');
    }
    addGlobalStructType(type) {
        if (this.custom_types.find(t => t.struct_name === type.struct_name)) {
            (0, helper_1.throwError)(new Error(`Redefinition of type that already exists\nType: ${type}`));
        }
        this.custom_types.push(type);
    }
    addAssembly(asm) {
        this.asm += asm;
    }
    addScopeValue(value) {
        if (this.scopes.length === 0) {
            (0, helper_1.throwError)(new Error(`Trying to access scope though it does not exist: ${value.pos}`));
        }
        const scope = this.scopes.at(-1);
        if (!!scope.scopeValues.find(v => v.name === value.name)) {
            (0, helper_1.throwError)(new Error(`Pushing scope with existing name: [${value.name}]`));
        }
        scope.scopeValues.push(value);
    }
    addStringLiteral(literal) {
        if (!this.literals.includes(literal)) {
            this.literals.push(literal);
        }
        return `"_${this.literals.indexOf(literal)}_literal"`;
    }
    hasValue(name) {
        if (name === 'print') {
            return new value_1.Value('print', function_type_1.FunctionType.getInstance(void_type_1.VoidType.getInstance(), [ptr_type_1.PtrType.getInstance(char_type_1.CharType.getInstance()), int_type_1.IntType.getInstance()]), new lexer_1.Position(0, 0, 0), null, value_type_1.AddrType.Stack);
        }
        const scopeValues = this.scopes.map(s => s.scopeValues);
        for (let i = scopeValues.length - 1; i > -1; --i) {
            const val = scopeValues[i].find(val => val.name === name);
            if (!!val) {
                return val;
            }
        }
        let i;
        if ((i = this.globals.findIndex(v => v.name === name)) !== -1) {
            return this.globals[i];
        }
        return null;
    }
    hasValueOrThrow(name) {
        return this.hasValue(name) || (0, helper_1.throwError)(new helper_1.ParserError(this.lexer, `No such value name ${name} `));
    }
    getValueWithTypeOrThrow(name, type) {
        const value = this.hasValueOrThrow(name);
        const expected = value.valueType;
        const found = type;
        return expected.isSameType(type) ? value : (0, helper_1.throwError)(new helper_1.ParserError(this.lexer, `Unmatched type: expected ${expected}, found ${found} `));
    }
    get mark() {
        return `mark_${this.mark_num} `;
    }
    gen_mark() {
        return `mark_${this.mark_num++} `;
    }
    addGlobalValue(value) {
        if (this.globals.some(v => v.name === value.name)) {
            (0, helper_1.throwError)(new helper_1.RulesError(value.pos, `Pushing GLObal scope with existing value: ${value}`));
        }
        this.globals.push(value);
    }
    ends_with_retq() {
        return this.asm.replaceAll('\n', ' ').trimEnd().endsWith('retq');
    }
}
exports.Context = Context;
