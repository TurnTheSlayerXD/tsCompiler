import { OrderedToken } from "./ast_builder";
import { AstNode } from "./ast_node";
import { Context } from "./context";
import { convert_val_to_type, get_rax_i } from "./converter";
import { throwError, TODO, TokenParserError } from "./helper";
import { TokenType } from "./token_type";
import { AddrType, FunctionType, IntType, MOV_I, PtrType, REG_I, TypenameType, Value, VoidType } from "./value_types";

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

    override eval({ is_lvalue, can_be_decl }: { is_lvalue: boolean; can_be_decl: boolean; }): Value {

        const type = this.order.tok.type;
        const token = this.order.tok;
        const { context } = this;

        if ([TokenType.O_PAREN].includes(type)) {
            //handle function call case
            if (this.left) {
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
                        \rmovq  ${params[0]!.stack_addr(context)}(%rsp), %rdx
                    `);
                        context.addAssembly(`
                        \rmovl  ${params[1]!.stack_addr(context)}(%rsp), %r8d
                    `);
                        context.addAssembly(`
                        \rcallq	 *__imp_WriteConsoleA(%rip)
                    `);
                        return new Value('_temp', VoidType.getInstance(), token.pos, null, AddrType.Indirect);
                    }
                    else {
                        let in_stack: Value;
                        const { paramTypes } = fun_obj.valueType;
                        if (paramTypes.length !== params.length) {
                            throwError(`Unmatched parameter count\nExpected: ${paramTypes}\nFound: ${params}`);
                        }
                        for (let i = 0; i < paramTypes.length; ++i) {
                            in_stack = paramTypes[i]!.asm_from_literal(context, '_param', null, params[i]!.pos);
                            in_stack.valueType.asm_copy(context, in_stack, params[i]!);
                        }
                        if (params.length > 0) {
                            context.addAssembly(`
                        \r#__parameter_offset_pass
                        \rleaq ${in_stack!.stack_addr(context)}(%rsp), %rcx
                    `);
                        }
                        context.addAssembly(`
                        \rcallq ${fun_name}
                    `);
                        const [reg, mov] = get_rax_i(fun_obj.valueType.returnType.size);
                        context.addAssembly(`   
                        \r${MOV_I[mov]} %${REG_I[reg]}, ${context.pushStack(fun_obj.valueType.returnType.size)}(%rsp)
                    `);
                        return new Value('_temp', fun_obj.valueType.returnType, token.pos, context.stackPtr, AddrType.Stack);
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
            if (this.middle) {
                return this.middle.eval({ is_lvalue: false, can_be_decl: true });
            }
            //otherwise it is just for operation ordering
            return new Value("_temp", VoidType.getInstance(), token.pos, null, AddrType.Stack);
        }
        if ([TokenType.O_SQR].includes(type)) {
            if (!this.middle || !this.left) {
                throwError(new TokenParserError(token, `OP square brackets requires both LEFT and right args at ${token.pos}`));
            }
            const ind_val = this.middle.eval({ is_lvalue: false, can_be_decl: true });
            const ptr_val = this.left.eval({ is_lvalue: false, can_be_decl: true });
            const applied = ptr_val.valueType.asm_from_plus(context, ptr_val, ind_val);
            const applied_type = applied.valueType as PtrType ?? throwError(new TokenParserError(token, 'Expected PTR type'));
            const res = applied_type.asm_dereference(context, '_temp', applied, is_lvalue);
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
                    const dst = new Value('_temp', valueType, src.pos, context.pushStack(valueType.size), AddrType.Stack);
                    valueType.asm_copy(context, dst, src);
                }
                context.addAssembly(`
                        \rleaq ${context.stackPtr}(%rsp), %rdx
                        \rmovq %rdx, ${context.pushStack(8)}(%rsp)
                    `);
                const ret = new Value('_temp', PtrType.getInstance(valueType), params[0]!.pos, context.stackPtr, AddrType.Stack);
                return ret;
            }
            context.addAssembly(`
                    \rmovq $0, ${context.pushStack(8)}
                `);
            return new Value('_temp', PtrType.getInstance(IntType.getInstance()), params[0]!.pos, context.stackPtr, AddrType.Stack);
        }
        TODO(`unhandeled: ${token}`);

    }

}