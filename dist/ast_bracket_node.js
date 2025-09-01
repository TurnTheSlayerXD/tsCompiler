"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AstBracketNode = void 0;
const ast_node_1 = require("./ast_node");
const converter_1 = require("./converter");
const helper_1 = require("./helper");
const token_type_1 = require("./token_type");
const type_parsing_1 = require("./type_parsing");
const value_1 = require("./value");
const value_types_1 = require("./value_types");
const array_type_1 = require("./value_types/array_type");
const function_type_1 = require("./value_types/function_type");
const int_type_1 = require("./value_types/int_type");
const value_type_1 = require("./value_types/value_type");
const void_type_1 = require("./value_types/void_type");
class AstBracketNode extends ast_node_1.AstNode {
    area;
    middle;
    constructor(order, area, middle, left, right, context) {
        super(order, left, right, context);
        this.area = area;
        this.middle = middle;
    }
    insert_node(node) {
        if (this.area.l_b <= node.order.pos && node.order.pos <= this.area.r_b) {
            if (!this.middle) {
                this.middle = node;
            }
            else {
                this.middle.insert_node(node);
            }
        }
        else if (node.order.pos < this.order.pos) {
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
    }
    eval({ is_lvalue, can_be_decl }) {
        const type = this.order.tok.type;
        const token = this.order.tok;
        const { context } = this;
        if ([token_type_1.TokenType.O_PAREN].includes(type)) {
            //handle type conversion case
            if (this.middle && this.middle.type === token_type_1.TokenType.DECL_TYPENAME) {
                const res = (0, type_parsing_1.parse_type_from_ast_node)(context, this.middle);
                if (res.has_name) {
                    (0, helper_1.throwError)(new helper_1.TokenParserError(token, `Didn't expect name in Type Conversion`));
                }
                if (!this.right) {
                    (0, helper_1.throwError)(new helper_1.TokenParserError(token, `Expected value to convert on right in Type Conversion`));
                }
                const val = this.right.eval({ is_lvalue: false, can_be_decl: true, is_immediately_assigned: false });
                return (0, converter_1.convert_val_to_type)(context, val, res.type);
            }
            //handle function call case
            else if (this.left) {
                const fun_obj = this.left.eval({ is_lvalue: false, can_be_decl: true });
                if (fun_obj.valueType instanceof function_type_1.FunctionType) {
                    let params = [];
                    let comma_token = this.middle;
                    while (comma_token && comma_token.type === token_type_1.TokenType.COMMA) {
                        if (!comma_token.left) {
                            (0, helper_1.throwError)(new helper_1.TokenParserError(comma_token.order.tok, 'Expected expression before comma'));
                        }
                        params.push(comma_token.left.eval({ is_lvalue: false, can_be_decl: true }));
                        comma_token = comma_token.right;
                    }
                    if (!!comma_token) {
                        params.push(comma_token.eval({ is_lvalue: false, can_be_decl: true }));
                    }
                    const fun_name = fun_obj.name;
                    if (fun_obj.name === 'print') {
                        context.addAssembly(`
                        \rmovl $4294967285, %ecx
                        \rcallq *__imp_GetStdHandle(%rip)
                        \rmovq %rax, ${context.pushStack(8)}(%rsp)
                        \rmovl $0, ${context.pushStack(4)}(%rsp)
                        \rmovq ${context.stackPtr + 4}(%rsp), %rcx
                        \rleaq ${context.stackPtr}(%rsp), %r9
                    `);
                        context.addAssembly(`
                        \rmovq  ${params[0]?.stack_addr(context) ?? 'Expected first param for built-in PRINT function'}(%rsp), %rdx
                    `);
                        context.addAssembly(`
                        \rmovl  ${params[1]?.stack_addr(context) ?? 'Expected second param for built-in PRINT function'}(%rsp), %r8d
                    `);
                        context.addAssembly(`
                        \rcallq	 *__imp_WriteConsoleA(%rip)
                    `);
                        return new value_1.Value(value_1.temp_t.t, void_type_1.VoidType.getInstance(), token.pos, null, value_type_1.AddrType.Indirect);
                    }
                    else {
                        let in_stack;
                        const { paramTypes } = fun_obj.valueType;
                        if (paramTypes.length !== params.length) {
                            (0, helper_1.throwError)(`Unmatched parameter count\nExpected: ${paramTypes}\nFound: ${params}`);
                        }
                        for (let i = 0; i < paramTypes.length; ++i) {
                            in_stack = paramTypes[i].asm_from_literal(context, value_1.temp_t.t, null, params[i].pos, true);
                            in_stack.valueType.asm_copy(context, in_stack, params[i]);
                        }
                        if (params.length > 0) {
                            context.addAssembly(`
                        \r#__parameter_offset_pass
                        \rleaq ${!in_stack ? (0, helper_1.UNREACHABLE)() : in_stack.stack_addr(context)}(%rsp), %rcx
                    `);
                        }
                        context.addAssembly(`
                        \rcallq ${fun_name}
                    `);
                        const [reg, mov] = (0, converter_1.get_rax_i)(fun_obj.valueType.returnType.size);
                        context.addAssembly(`   
                        \r${value_type_1.MOV_I[mov]} %${value_type_1.REG_I[reg]}, ${context.pushStack(fun_obj.valueType.returnType.size)}(%rsp)
                    `);
                        return new value_1.Value(value_1.temp_t.t, fun_obj.valueType.returnType, token.pos, context.stackPtr, value_type_1.AddrType.Stack);
                    }
                }
                (0, helper_1.TODO)(`Unexpected expression: ${fun_obj}`);
            }
            // then it is casting operation
            if (this.right && this.middle) {
                const right = this.right.eval({ is_lvalue: false, can_be_decl: true });
                const middle = this.middle.eval({ is_lvalue: false, can_be_decl: true });
                if (middle.valueType instanceof value_types_1.TypenameType) {
                    const value = (0, converter_1.convert_val_to_type)(context, right, middle.valueType.typevalue);
                    return value;
                }
                (0, helper_1.TODO)(`Unexpected expression: ${this.middle}`);
            }
            if (this.middle) {
                return this.middle.eval({ is_lvalue: false, can_be_decl: true });
            }
            //otherwise it is just for operation ordering
            return new value_1.Value(value_1.temp_t.t, void_type_1.VoidType.getInstance(), token.pos, null, value_type_1.AddrType.Stack);
        }
        if ([token_type_1.TokenType.O_SQR].includes(type)) {
            if (!this.middle || !this.left) {
                (0, helper_1.throwError)(new helper_1.TokenParserError(token, `OP square brackets requires both LEFT and right args at ${token.pos}`));
            }
            const ind_val = this.middle.eval({ is_lvalue: false, can_be_decl: true });
            const ptr_val = this.left.eval({ is_lvalue: false, can_be_decl: true });
            const applied = ptr_val.valueType.asm_from_plus(context, ptr_val, ind_val);
            const applied_type = applied.valueType ?? (0, helper_1.throwError)(new helper_1.TokenParserError(token, 'Expected PTR type'));
            const res = applied_type.asm_dereference(context, value_1.temp_t.t, applied, is_lvalue);
            return res;
        }
        if ([token_type_1.TokenType.O_CURL].includes(type)) {
            const params = [];
            let comma_token = this.middle;
            while (comma_token && comma_token.type === token_type_1.TokenType.COMMA) {
                if (!comma_token.left) {
                    (0, helper_1.throwError)(new helper_1.TokenParserError(comma_token.order.tok, 'Expected expression before comma'));
                }
                params.push(comma_token.left.eval({ is_lvalue: false, can_be_decl: true }));
                comma_token = comma_token.right;
            }
            if (!!comma_token) {
                params.push(comma_token.eval({ is_lvalue: false, can_be_decl: true }));
            }
            params.reverse();
            if (params.length > 0) {
                const valueType = params[0].valueType;
                for (const src of params) {
                    const dst = new value_1.Value(value_1.temp_t.t, valueType, src.pos, context.pushStack(valueType.size), value_type_1.AddrType.Stack);
                    valueType.asm_copy(context, dst, src);
                }
                context.addAssembly(`
                        \rleaq ${context.stackPtr}(%rsp), %rdx
                        \rmovq %rdx, ${context.pushStack(8)}(%rsp)
                    `);
                const ret = new value_1.Value(value_1.temp_t.t, array_type_1.ArrayType.getArrayInstance(valueType, params.length), params[0].pos, context.stackPtr, value_type_1.AddrType.Stack);
                return ret;
            }
            context.addAssembly(`
                    \rmovq $0, ${context.pushStack(8)}
                `);
            return new value_1.Value(value_1.temp_t.t, array_type_1.ArrayType.getArrayInstance(int_type_1.IntType.getInstance(), 0), params[0].pos, context.stackPtr, value_type_1.AddrType.Stack);
        }
        (0, helper_1.TODO)(`unhandeled: ${token}`);
    }
}
exports.AstBracketNode = AstBracketNode;
