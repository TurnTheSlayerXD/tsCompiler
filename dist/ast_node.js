"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AstNode = void 0;
const helper_1 = require("./helper");
const token_type_1 = require("./token_type");
const type_parsing_1 = require("./type_parsing");
const value_1 = require("./value");
const array_type_1 = require("./value_types/array_type");
const char_type_1 = require("./value_types/char_type");
const int_type_1 = require("./value_types/int_type");
const ptr_type_1 = require("./value_types/ptr_type");
const value_type_1 = require("./value_types/value_type");
class AstNode {
    order;
    left;
    right;
    context;
    constructor(order, left, right, context) {
        this.order = order;
        this.left = left;
        this.right = right;
        this.context = context;
    }
    get type() {
        return this.order.tok.type;
    }
    insert_node(node) {
        if (node.order.pos < this.order.pos) {
            if (!this.left) {
                this.left = node;
            }
            else {
                this.left.insert_node(node);
            }
        }
        else if (node.order.pos > this.order.pos) {
            if (!this.right) {
                this.right = node;
            }
            else {
                this.right.insert_node(node);
            }
        }
        else {
            (0, helper_1.UNREACHABLE)();
        }
    }
    eval({ is_lvalue, can_be_decl, is_immediately_assigned }) {
        const type = this.order.tok.type;
        const token = this.order.tok;
        const { context } = this;
        if ([token_type_1.TokenType.OP_ASSIGNMENT, token_type_1.TokenType.OP_ASSIGNMENT_PLUS, token_type_1.TokenType.OP_ASSIGNMENT_MINUS, token_type_1.TokenType.OP_ASSIGNMENT_MULTIPLY, token_type_1.TokenType.OP_ASSIGNMENT_DIVIDE].includes(type)) {
            if (!this.left || !this.right)
                (0, helper_1.throwError)(new helper_1.TokenParserError(token, `Expected left and right args for ASSIGNMENT OP`));
            switch (token.type) {
                case token_type_1.TokenType.OP_ASSIGNMENT_PLUS: {
                    const l_value = this.left.eval({ is_lvalue: true, can_be_decl: false });
                    const r_value = this.right.eval({ is_lvalue: false, can_be_decl: false });
                    const new_value = l_value.valueType.asm_from_plus(context, l_value, r_value);
                    l_value.valueType.asm_copy(context, l_value, new_value);
                    return new_value;
                }
                case token_type_1.TokenType.OP_ASSIGNMENT_MINUS: {
                    const l_value = this.left.eval({ is_lvalue: true, can_be_decl: false });
                    const r_value = this.right.eval({ is_lvalue: false, can_be_decl: false });
                    const new_value = l_value.valueType.asm_from_minus(context, l_value, r_value);
                    l_value.valueType.asm_copy(context, l_value, new_value);
                    return new_value;
                }
                case token_type_1.TokenType.OP_ASSIGNMENT_MULTIPLY: {
                    const l_value = this.left.eval({ is_lvalue: true, can_be_decl: false });
                    const r_value = this.right.eval({ is_lvalue: false, can_be_decl: false });
                    const new_value = l_value.valueType.asm_from_multiply(context, l_value, r_value);
                    l_value.valueType.asm_copy(context, l_value, new_value);
                    return new_value;
                }
                case token_type_1.TokenType.OP_ASSIGNMENT_DIVIDE: {
                    const l_value = this.left.eval({ is_lvalue: true, can_be_decl: false });
                    const r_value = this.right.eval({ is_lvalue: false, can_be_decl: false });
                    const new_value = l_value.valueType.asm_from_divide(context, l_value, r_value);
                    l_value.valueType.asm_copy(context, l_value, new_value);
                    return new_value;
                }
                case token_type_1.TokenType.OP_ASSIGNMENT: {
                    const l_value = this.left.eval({ is_lvalue: true, can_be_decl: true, is_immediately_assigned: true });
                    const r_value = this.right.eval({ is_lvalue: false, can_be_decl: false });
                    if (l_value.valueType instanceof array_type_1.ArrayType &&
                        !l_value._address &&
                        r_value.valueType instanceof array_type_1.ArrayType &&
                        r_value.name === helper_1.TEMP_NAME &&
                        r_value.valueType.array_size !== null) {
                        if (!l_value.valueType.array_size) {
                            l_value._address = r_value._address;
                            return r_value;
                        }
                        else if (l_value.valueType.array_size >= r_value.valueType.array_size) {
                            const _temp = l_value.valueType.asm_from_literal(context, value_1.temp_t.t, null, l_value.pos, true);
                            const _temp_type = _temp.valueType ?? (0, helper_1.UNREACHABLE)();
                            for (let i = 0; i < r_value.valueType.array_size; ++i) {
                                const from_plus = _temp_type
                                    .asm_from_plus(context, _temp, int_type_1.IntType.getInstance()
                                    .asm_from_literal(context, value_1.temp_t.t, String(i), l_value.pos, true));
                                const deref = from_plus.valueType?.asm_dereference(context, value_1.temp_t.t, from_plus, true);
                                const r_value_from_plus = r_value.valueType
                                    .asm_from_plus(context, r_value, int_type_1.IntType.getInstance()
                                    .asm_from_literal(context, value_1.temp_t.t, String(i), r_value.pos, true));
                                const r_value_deref = r_value_from_plus.valueType?.asm_dereference(context, value_1.temp_t.t, r_value_from_plus, false);
                                deref.valueType.asm_copy(context, deref, r_value_deref);
                            }
                            l_value._address = _temp._address;
                            r_value._address = _temp._address;
                        }
                        else if (l_value.valueType.array_size < r_value.valueType.array_size) {
                            (0, helper_1.throwError)(new helper_1.TokenParserError(token, "Expected array size to be greater or equal than array size it is assigned to"));
                        }
                        else {
                            (0, helper_1.UNREACHABLE)();
                        }
                    }
                    else if (!l_value._address && l_value.valueType.isSameType(r_value.valueType)) {
                        l_value._address = r_value._address;
                    }
                    else {
                        if (!l_value._address) {
                            const l_value_alloc = l_value.valueType.asm_from_literal(context, l_value.name, null, l_value.pos, true);
                            l_value._address = l_value_alloc._address;
                            l_value.addr_type = l_value_alloc.addr_type;
                        }
                        l_value.valueType.asm_copy(context, l_value, r_value);
                    }
                    return r_value;
                }
                default:
                    (0, helper_1.TODO)();
            }
        }
        if ([token_type_1.TokenType.DECL_TYPENAME].includes(type)) {
            if (!can_be_decl) {
                (0, helper_1.throwError)(new helper_1.TokenParserError(token, `Assignment forbidden in expression`));
            }
            const { type, name } = (0, type_parsing_1.parse_declaration_from_ast_node)(context, this);
            const val = type.asm_from_literal(context, name, null, token.pos, !is_immediately_assigned);
            context.addScopeValue(val);
            return val;
        }
        if ([token_type_1.TokenType.OP_AND, token_type_1.TokenType.OP_OR,].includes(type)) {
            if (!this.left || !this.right)
                (0, helper_1.throwError)(new helper_1.TokenParserError(token, `Expected left and right args for ASSIGNMENT OP`));
            const left = this.left.eval({ is_lvalue: false, can_be_decl: true });
            const right = this.right.eval({ is_lvalue: false, can_be_decl: true });
            const left_addr = left.valueType.asm_to_boolean(context, left).stack_addr(context);
            const right_addr = right.valueType.asm_to_boolean(context, right).stack_addr(context);
            const res_addr = context.pushStack(char_type_1.CharType.getInstance().size);
            const mark = context.gen_mark();
            switch (token.type) {
                case token_type_1.TokenType.OP_AND: {
                    context.addAssembly(`
                                \rmovb ${left_addr}(%rsp), %dh
                                \rmovb ${right_addr}(%rsp), %al
                                \randb %dh, %al
                                \rmovb $1, ${res_addr}(%rsp)
                                \rcmpb $0, %al
                                \rjne ${mark}  
                                \rmovb $0, ${res_addr}(%rsp)
                                \r${mark}:
                            `);
                    break;
                }
                case token_type_1.TokenType.OP_OR: {
                    context.addAssembly(`
                                \rmovb ${left_addr}(%rsp), %dh
                                \rmovb ${right_addr}(%rsp), %al
                                \rorb %dh, %al
                                \rmovb $1, ${res_addr}(%rsp)
                                \rcmpb $0, %al
                                \rjne ${mark}  
                                \rmovb $0, ${res_addr}(%rsp)
                                \r${mark}:
                            `);
                    break;
                }
            }
            return new value_1.Value(value_1.temp_t.t, char_type_1.CharType.getInstance(), left.pos, res_addr, value_type_1.AddrType.Stack);
        }
        if ([
            token_type_1.TokenType.OP_COMP_GREATER,
            token_type_1.TokenType.OP_COMP_EQ,
            token_type_1.TokenType.OP_COMP_NOT_EQ,
            token_type_1.TokenType.OP_COMP_GREATER_EQ,
            token_type_1.TokenType.OP_COMP_LESS,
            token_type_1.TokenType.OP_COMP_LESS_EQ
        ].includes(type)) {
            if (!this.left || !this.right)
                (0, helper_1.throwError)(new helper_1.TokenParserError(token, `Expected left and right args for ASSIGNMENT OP`));
            const left = this.left.eval({ is_lvalue: false, can_be_decl: true });
            const right = this.right.eval({ is_lvalue: false, can_be_decl: true });
            switch (token.type) {
                case token_type_1.TokenType.OP_COMP_GREATER: return left.valueType.asm_cmp_greater(context, left, right);
                case token_type_1.TokenType.OP_COMP_GREATER_EQ: return left.valueType.asm_cmp_greater_or_equal(context, left, right);
                case token_type_1.TokenType.OP_COMP_LESS: return left.valueType.asm_cmp_less(context, left, right);
                case token_type_1.TokenType.OP_COMP_LESS_EQ: return left.valueType.asm_cmp_less_or_equal(context, left, right);
                case token_type_1.TokenType.OP_COMP_EQ: return left.valueType.asm_cmp_equal(context, left, right);
                case token_type_1.TokenType.OP_COMP_NOT_EQ: return left.valueType.asm_cmp_not_equal(context, left, right);
            }
            (0, helper_1.TODO)('CMP');
        }
        if ([token_type_1.TokenType.OP_PLUS, token_type_1.TokenType.OP_MINUS].includes(type)) {
            if (!this.right)
                (0, helper_1.throwError)(new helper_1.TokenParserError(token, `Expected at least right arg for PLUS-MINUS OP`));
            let left, right = this.right.eval({ is_lvalue: false, can_be_decl: true });
            if (!this.left) {
                left = right.valueType.asm_from_literal(context, value_1.temp_t.t, '0', token.pos, true);
            }
            else {
                left = this.left.eval({ is_lvalue: false, can_be_decl: true });
            }
            return token.type === token_type_1.TokenType.OP_PLUS ? left.valueType.asm_from_plus(context, left, right) : left.valueType.asm_from_minus(context, left, right);
        }
        if ([token_type_1.TokenType.OP_MULTIPLY, token_type_1.TokenType.OP_DIVIDE].includes(type)) {
            if (!this.left || !this.right)
                (0, helper_1.throwError)(new helper_1.TokenParserError(token, `Expected left and right args for MUL/DIV OP`));
            const left = this.left.eval({ is_lvalue: false, can_be_decl: true });
            const right = this.right.eval({ is_lvalue: false, can_be_decl: true });
            return token.type === token_type_1.TokenType.OP_DIVIDE ? left.valueType.asm_from_divide(context, left, right) : left.valueType.asm_from_multiply(context, left, right);
        }
        if ([token_type_1.TokenType.OP_PERCENT].includes(type)) {
            if (!this.left || !this.right)
                (0, helper_1.throwError)(new helper_1.TokenParserError(token, `Expected left and right args for PERCENT OP`));
            const left = this.left.eval({ is_lvalue: false, can_be_decl: true });
            const right = this.right.eval({ is_lvalue: false, can_be_decl: true });
            return left.valueType.asm_from_percent(context, left, right);
        }
        if ([token_type_1.TokenType.OP_REFERENCE].includes(type)) {
            if (!this.right) {
                (0, helper_1.throwError)(new helper_1.TokenParserError(token, `Expected right arg for REFERENCE OP`));
            }
            const arg = this.right.eval({ is_lvalue: true, can_be_decl: true });
            return ptr_type_1.PtrType.getInstance(arg.valueType).asm_take_reference_from(context, value_1.temp_t.t, arg);
        }
        if ([token_type_1.TokenType.OP_DEREFERENCE].includes(type)) {
            if (!this.right) {
                (0, helper_1.throwError)(new helper_1.TokenParserError(token, `Expected right arg for DEREFERENCE OP`));
            }
            const arg = this.right.eval({ is_lvalue: false, can_be_decl: true });
            const ptr_type = arg.valueType instanceof ptr_type_1.PtrType ? arg.valueType : (0, helper_1.throwError)(new helper_1.TokenParserError(token, `Trying to dereference Non-Pointer type ${arg.valueType}`));
            return ptr_type.asm_dereference(context, value_1.temp_t.t, arg, is_lvalue);
        }
        if ([token_type_1.TokenType.NUM_INT].includes(type)) {
            const new_value = int_type_1.IntType.getInstance().asm_from_literal(this.context, value_1.temp_t.t, token.text, token.pos, true);
            return new_value;
        }
        if ([token_type_1.TokenType.STRING_LITERAL].includes(type)) {
            this.context.addStringLiteral(token.text);
            const new_value = array_type_1.ArrayType.getArrayInstance(char_type_1.CharType.getInstance(), null).asm_from_literal(this.context, value_1.temp_t.t, token.text, token.pos, true);
            return new_value;
        }
        if ([token_type_1.TokenType.CHAR_LITERAL].includes(type)) {
            const new_value = char_type_1.CharType.getInstance().asm_from_literal(this.context, value_1.temp_t.t, token.text, token.pos, true);
            return new_value;
        }
        if ([token_type_1.TokenType.NAME].includes(type)) {
            if (this.left || this.right) {
                (0, helper_1.TODO)(`UNKNOWN EXPR: ${this}`);
            }
            return this.context.hasValue(token.text) ?? (0, helper_1.throwError)(new helper_1.TokenParserError(token, `Using undeclared var name [${token.text}]`));
        }
        (0, helper_1.TODO)(`unhandeled: ${token}`);
    }
}
exports.AstNode = AstNode;
