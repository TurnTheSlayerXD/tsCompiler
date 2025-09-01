"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JN_I = exports.AddrType = exports.CMP_I = exports.REG_I = exports.BIN_I = exports.MOV_I = void 0;
exports.asm_div_action = asm_div_action;
exports.asm_to_boolean = asm_to_boolean;
exports.asm_bin_action = asm_bin_action;
exports.asm_comp_action_l = asm_comp_action_l;
exports.asm_comp_action_b = asm_comp_action_b;
exports.asm_comp_action_q = asm_comp_action_q;
const helper_1 = require("../helper");
const value_1 = require("../value");
const char_type_1 = require("./char_type");
var MOV_I;
(function (MOV_I) {
    MOV_I[MOV_I["movl"] = 0] = "movl";
    MOV_I[MOV_I["movr"] = 1] = "movr";
    MOV_I[MOV_I["movb"] = 2] = "movb";
    MOV_I[MOV_I["movq"] = 3] = "movq";
})(MOV_I || (exports.MOV_I = MOV_I = {}));
var BIN_I;
(function (BIN_I) {
    BIN_I[BIN_I["addb"] = 0] = "addb";
    BIN_I[BIN_I["addl"] = 1] = "addl";
    BIN_I[BIN_I["addq"] = 2] = "addq";
    BIN_I[BIN_I["subb"] = 3] = "subb";
    BIN_I[BIN_I["subl"] = 4] = "subl";
    BIN_I[BIN_I["subq"] = 5] = "subq";
    BIN_I[BIN_I["imulb"] = 6] = "imulb";
    BIN_I[BIN_I["imull"] = 7] = "imull";
    BIN_I[BIN_I["imulq"] = 8] = "imulq";
    BIN_I[BIN_I["idivb"] = 9] = "idivb";
    BIN_I[BIN_I["idivl"] = 10] = "idivl";
    BIN_I[BIN_I["idivq"] = 11] = "idivq";
})(BIN_I || (exports.BIN_I = BIN_I = {}));
var REG_I;
(function (REG_I) {
    REG_I[REG_I["ax"] = 0] = "ax";
    REG_I[REG_I["al"] = 1] = "al";
    REG_I[REG_I["eax"] = 2] = "eax";
    REG_I[REG_I["rax"] = 3] = "rax";
    REG_I[REG_I["dh"] = 4] = "dh";
    REG_I[REG_I["edx"] = 5] = "edx";
    REG_I[REG_I["rdx"] = 6] = "rdx";
    REG_I[REG_I["cx"] = 7] = "cx";
    REG_I[REG_I["ch"] = 8] = "ch";
    REG_I[REG_I["ecx"] = 9] = "ecx";
    REG_I[REG_I["rcx"] = 10] = "rcx";
})(REG_I || (exports.REG_I = REG_I = {}));
var CMP_I;
(function (CMP_I) {
    CMP_I[CMP_I["cmpl"] = 0] = "cmpl";
    CMP_I[CMP_I["cmpq"] = 1] = "cmpq";
    CMP_I[CMP_I["cmpb"] = 2] = "cmpb";
})(CMP_I || (exports.CMP_I = CMP_I = {}));
var AddrType;
(function (AddrType) {
    AddrType[AddrType["TempStack"] = 0] = "TempStack";
    AddrType[AddrType["Stack"] = 1] = "Stack";
    AddrType[AddrType["Indirect"] = 2] = "Indirect";
    AddrType[AddrType["Register"] = 3] = "Register";
})(AddrType || (exports.AddrType = AddrType = {}));
function asm_div_action(context, mov, div, eax, edx, ecx, ebx, lhs, rhs, size) {
    (0, helper_1.TODO)('DIVISION');
}
function asm_to_boolean(context, self, cmp_i) {
    const self_addr = self.stack_addr(context);
    const result_addr = context.pushStack(char_type_1.CharType.getInstance().size);
    const mark_if_true = context.gen_mark();
    context.addAssembly(`
                \rmovb $1, ${result_addr}(%rsp)
                \r${CMP_I[cmp_i]} $0, ${self_addr}(%rsp)
                \rjne ${mark_if_true}
                \rmovb $0, ${result_addr}(%rsp)
                ${mark_if_true}:
            `);
    return new value_1.Value(value_1.temp_t.t, char_type_1.CharType.getInstance(), self.pos, result_addr, AddrType.Stack);
}
function asm_bin_action(context, mov, act, reg, lhs, rhs, size) {
    const lhs_addr = lhs.stack_addr(context);
    const rhs_addr = rhs.stack_addr(context);
    context.addAssembly(`
                \r${MOV_I[mov]} ${lhs_addr}(%rsp), %${REG_I[reg]}
                \r${BIN_I[act]} ${rhs_addr}(%rsp), %${REG_I[reg]}
                \r${MOV_I[mov]} %${REG_I[reg]}, ${context.pushStack(size)}(%rsp) 
            `);
    return context.stackPtr;
}
var JN_I;
(function (JN_I) {
    JN_I[JN_I["jne"] = 0] = "jne";
    JN_I[JN_I["je"] = 1] = "je";
    JN_I[JN_I["jge"] = 2] = "jge";
    JN_I[JN_I["jle"] = 3] = "jle";
    JN_I[JN_I["jg"] = 4] = "jg";
    JN_I[JN_I["jl"] = 5] = "jl";
})(JN_I || (exports.JN_I = JN_I = {}));
function asm_comp_action_l(context, self, rhs, jn) {
    const mark = context.gen_mark();
    const bool_addr = context.pushStack(char_type_1.CharType.getInstance().size);
    const self_addr = self.stack_addr(context);
    const rhs_addr = rhs.stack_addr(context);
    context.addAssembly(`
                \rmovl ${self_addr}(%rsp), %eax
                \rmovl ${rhs_addr}(%rsp), %ebx
                \rmovb $1, ${bool_addr}(%rsp) 
                \rcmpl %eax, %ebx
                \r${JN_I[jn]} ${mark}
                \rmovb $0, ${bool_addr}(%rsp) 
                ${mark}:
            `);
    return new value_1.Value(value_1.temp_t.t, char_type_1.CharType.getInstance(), self.pos, bool_addr, AddrType.Stack);
}
function asm_comp_action_b(context, self, rhs, jn) {
    const mark = context.gen_mark();
    const bool_addr = context.pushStack(char_type_1.CharType.getInstance().size);
    const self_addr = self.stack_addr(context);
    const rhs_addr = rhs.stack_addr(context);
    context.addAssembly(`
                \rmovb ${self_addr}(%rsp), %ah
                \rmovb ${rhs_addr}(%rsp), %al
                \rmovb $1, ${bool_addr}(%rsp) 
                \rcmpb %ah, %al
                \r${JN_I[jn]} ${mark}
                \rmovb $0, ${bool_addr}(%rsp) 
                ${mark}:
            `);
    return new value_1.Value(value_1.temp_t.t, char_type_1.CharType.getInstance(), self.pos, bool_addr, AddrType.Stack);
}
function asm_comp_action_q(context, self, rhs, jn) {
    const mark = context.gen_mark();
    const bool_addr = context.pushStack(char_type_1.CharType.getInstance().size);
    const self_addr = self.stack_addr(context);
    const rhs_addr = rhs.stack_addr(context);
    context.addAssembly(`
                \rmovq ${self_addr}(%rsp), %rax
                \rmovq ${rhs_addr}(%rsp), %rbx
                \rmovb $1, ${bool_addr}(%rsp) 
                \rcmpq %rax, %rbx
                \r${JN_I[jn]} ${mark}
                \rmovb $0, ${bool_addr}(%rsp) 
                ${mark}:
            `);
    return new value_1.Value(value_1.temp_t.t, char_type_1.CharType.getInstance(), self.pos, bool_addr, AddrType.Stack);
}
