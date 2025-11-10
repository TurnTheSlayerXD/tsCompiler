import { OrderedToken } from "./ast_builder";
import { AstNode } from "./ast_node";
import { Context } from "./context";
import { convert_val_to_type, get_rax_i } from "./converter";
import { TEMP_NAME, throwError, TODO, TokenParserError, UNREACHABLE, TypeError } from "./helper";
import { TokenType } from "./token_type";
import { parse_type_from_ast_node } from "./type_parsing";
import { temp_t, Value } from "./value";
import { TypenameType } from "./value_types";
import { ArrayType } from "./value_types/array_type";
import { CharType } from "./value_types/char_type";
import { FunctionType } from "./value_types/function_type";
import { IntType } from "./value_types/int_type";
import { PtrType } from "./value_types/ptr_type";
import { AddrType, MOV_I, REG_I } from "./value_types/value_type";
import { VoidType } from "./value_types/void_type";

export class AstBracketNode extends AstNode {
    constructor(order: OrderedToken, public area: { l_b: number, r_b: number }, public middle: AstNode | null, left: AstNode | null, right: AstNode | null, context: Context) {
        super(order, left, right, context);
    }

    override insert_node(node: AstNode) {
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
        } else if (node.order.pos > this.order.pos) {
            if (!this.right) {
                this.right = node;
            }
            else {
                this.right.insert_node(node);
            }
        }
    }

    override eval({ is_lvalue, can_be_decl }: { is_lvalue: boolean; can_be_decl: boolean; is_immediately_assigned?: boolean }): Value {

        const type = this.order.tok.type;
        const token = this.order.tok;
        const { context } = this;

        if ([TokenType.O_PAREN].includes(type)) {
            //handle type conversion case
            if (this.middle && this.middle.type === TokenType.DECL_TYPENAME) {
                const res = parse_type_from_ast_node(context, this.middle);
                if (res.has_name) {
                    throwError(new TokenParserError(token, `Didn't expect name in Type Conversion`));
                }
                if (!this.right) {
                    throwError(new TokenParserError(token, `Expected value to convert on right in Type Conversion`));
                }
                const val = this.right.eval({ is_lvalue, can_be_decl: true, is_immediately_assigned: false });
                return convert_val_to_type(context, val, res.type);
            }
            //handle function call case
            else if (this.left) {
                const fun_obj = this.left.eval({ is_lvalue: false, can_be_decl: true });
                if (fun_obj.valueType instanceof FunctionType) {
                    let params = [];
                    let comma_token: AstNode | null = this.middle;
                    while (comma_token && comma_token.type === TokenType.COMMA) {
                        if (!comma_token.left) {
                            throwError(new TokenParserError(comma_token.order.tok, 'Expected expression before comma'));
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
                        return new Value(temp_t.t, VoidType.getInstance(), token.pos, null, AddrType.Stack);
                    }
                    else if (fun_obj.name === 'input') {
                        if (params.length > 1 || !params[0]?.valueType.isSameType(PtrType.getInstance(CharType.getInstance()))) {
                            throw new TypeError(fun_obj.pos, `built-in "input" function can accept only one argument of type char*\nfound:${params.map(t => t.valueType)}`);
                        }
                        const param = params[0];
                        context.addAssembly(`
                            \rmovl $0, ${context.pushStack(4)}(%rsp)
                        `);
                        context.addAssembly(`
                            \rmovq ${param.stack_addr(context)}(%rsp), %rdx
                            \rleaq scanf_mark(%rip), %rcx
                            \rmovq $0, %rax
                        `);
                        context.addAssembly(`
                            \rcallq	scanf
                        `);
                        return new Value(temp_t.t, VoidType.getInstance(), token.pos, null, AddrType.Stack);
                    }
                    else {
                        let in_stack: Value | undefined;
                        const { paramTypes } = fun_obj.valueType;
                        if (paramTypes.length !== params.length) {
                            throwError(`Unmatched parameter count\nExpected: ${paramTypes}\nFound: ${params}`);
                        }
                        for (let i = 0; i < paramTypes.length; ++i) {
                            in_stack = paramTypes[i]!.asm_from_literal(context, temp_t.t, null, params[i]!.pos, true);
                            in_stack.valueType.asm_copy(context, in_stack, params[i]!);
                        }
                        if (params.length > 0) {
                            context.addAssembly(`
                        \r#__parameter_offset_pass
                        \rleaq ${!in_stack ? UNREACHABLE() : in_stack.stack_addr(context)}(%rsp), %rcx
                    `);
                        }
                        context.addAssembly(`
                        \rcallq ${fun_name}
                    `);
                        const [reg, mov] = get_rax_i(fun_obj.valueType.returnType.size);
                        context.addAssembly(`   
                        \r${MOV_I[mov]} %${REG_I[reg]}, ${context.pushStack(fun_obj.valueType.returnType.size)}(%rsp)
                    `);
                        return new Value(temp_t.t, fun_obj.valueType.returnType, token.pos, context.stackPtr, AddrType.Stack);
                    }
                }

                TODO(`Unexpected expression: ${fun_obj}`)
            }
            // then it is casting operation
            if (this.right && this.middle) {
                const right = this.right.eval({ is_lvalue: false, can_be_decl: true });
                const middle = this.middle.eval({ is_lvalue: false, can_be_decl: true });
                if (middle.valueType instanceof TypenameType) {
                    const value = convert_val_to_type(context, right, (middle.valueType as TypenameType).typevalue);
                    return value;
                }
                TODO(`Unexpected expression: ${this.middle}`)
            }
            // then it is just for ordering
            if (this.middle) {
                return this.middle.eval({ is_lvalue: is_lvalue, can_be_decl: true });
            }
            //otherwise it is just for operation ordering
            return new Value(temp_t.t, VoidType.getInstance(), token.pos, null, AddrType.Stack);
        }
        if ([TokenType.O_SQR].includes(type)) {
            if (!this.middle || !this.left) {
                throwError(new TokenParserError(token, `OP square brackets requires both LEFT and right args at ${token.pos}`));
            }
            const ind_val = this.middle.eval({ is_lvalue: false, can_be_decl: true });
            const ptr_val = this.left.eval({ is_lvalue: false, can_be_decl: true });
            const applied = ptr_val.valueType.asm_from_plus(context, ptr_val, ind_val);
            const applied_type = applied.valueType as PtrType ?? throwError(new TokenParserError(token, 'Expected PTR type'));
            const res = applied_type.asm_dereference(context, temp_t.t, applied, is_lvalue);
            return res;
        }
        if ([TokenType.O_CURL].includes(type)) {
            const params = [];
            let comma_token: AstNode | null = this.middle;
            while (comma_token && comma_token.type === TokenType.COMMA) {
                if (!comma_token.left) {
                    throwError(new TokenParserError(comma_token.order.tok, 'Expected expression before comma'));
                }
                params.push(comma_token.left.eval({ is_lvalue: false, can_be_decl: true }));
                comma_token = comma_token.right;
            }
            if (!!comma_token) {
                params.push(comma_token.eval({ is_lvalue: false, can_be_decl: true }));
            }
            params.reverse();
            if (params.length > 0) {
                const valueType = params[0]!.valueType;
                for (const src of params) {
                    const dst = new Value(temp_t.t, valueType, src.pos, context.pushStack(valueType.size), AddrType.Stack);
                    valueType.asm_copy(context, dst, src);
                }
                context.addAssembly(`
                        \rleaq ${context.stackPtr}(%rsp), %rdx
                        \rmovq %rdx, ${context.pushStack(8)}(%rsp)
                    `);
                const ret = new Value(temp_t.t, ArrayType.getArrayInstance(valueType, params.length), params[0]!.pos, context.stackPtr, AddrType.Stack);
                return ret;
            }
            context.addAssembly(`
                    \rmovq $0, ${context.pushStack(8)}
                `);
            return new Value(temp_t.t, ArrayType.getArrayInstance(IntType.getInstance(), 0), token.pos, context.stackPtr, AddrType.Stack);
        }
        TODO(`unhandeled: ${token}`);

    }

}