import { OrderedToken } from "./ast_builder";
import { AstNode } from "./ast_node";
import { Context } from "./context";
import { convert_val_to_type } from "./converter";
import { DebugPosError, throwError, TODO, TokenParserError } from "./helper";
import { get_mov_i_on_size, LeaqInstruction, MovInstr, StringInstruction } from "./instruction/instruction";
import { LiteralMemLocation, MemLocation, Register } from "./instruction/mem_location";
import { TokenType } from "./token_type";
import { parse_type_from_ast_node } from "./type_parsing";
import { NamedValue, Value, valueToMemLoc } from "./value";
import { ArrayType } from "./value_types/array_type";
import { CharType } from "./value_types/char_type";
import { FunctionType } from "./value_types/function_type";
import { IntType } from "./value_types/int_type";
import { PtrType } from "./value_types/ptr_type";
import { StructType } from "./value_types/struct_type";
import { TypenameType } from "./value_types/typename_type";
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
                if (fun_obj instanceof NamedValue && fun_obj.valueType instanceof FunctionType) {
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
                    const functionName = fun_obj.name;
                    if (fun_obj.name === 'print') {

                        const memlocOne = context.getNewMemLocationFromOffset(8);
                        const memlocTwo = context.getNewMemLocationFromOffset(4);

                        context.addInstruction(new StringInstruction("movl $429496"))
                        context.addInstruction(new StringInstruction('callq *__imp_GetStdHandle(%rip)'))
                        context.addInstruction(new MovInstr("movq", memlocOne, Register.getInstance("rax")));
                        context.addInstruction(new MovInstr("movq", memlocTwo, LiteralMemLocation.staticNull()));

                        context.addInstruction(new MovInstr("movq", Register.getInstance("rcx"), memlocOne));
                        context.addInstruction(new MovInstr("movq", Register.getInstance("r9"), memlocTwo));
                        /*
                            context.addAssembly(`
                            \rmovl $4294967285, %ecx
                            \rcallq *__imp_GetStdHandle(%rip)
                            \rmovq %rax, ${context.pushStack(8)}(%rsp)
                            \rmovl $0, ${context.pushStack(4)}(%rsp)
                            \rmovq ${context.stackPtr + 4}(%rsp), %rcx
                            \rleaq ${context.stackPtr}(%rsp), %r9
                        `);
                        */
                        const paramOne = params[0]!;
                        const paramTwo = params[1]!;
                        if (params.length !== 2 ||
                            !PtrType.getInstance(CharType.getInstance()).isSameType(paramOne.valueType) ||
                            !IntType.getInstance().isSameType(paramTwo.valueType)) {
                            throwError(`Expected built-in PRINT function parameters to be of type (char *, int).\n\rActual parameters are (${paramOne?.valueType},${paramTwo?.valueType})`);
                        }

                        context.addInstruction(new MovInstr("movq", Register.getInstance("rdx"), valueToMemLoc(paramOne, context)));
                        context.addInstruction(new MovInstr("movl", Register.getInstance("r8d"), valueToMemLoc(paramTwo, context)));
                        context.addInstruction(new StringInstruction("callq *__imp_WriteConsoleA(%rip)"));
                        /*
                            context.addAssembly(`\rmovq  ${params[0].stack_addr(context) ?? throwError('Expected')}(%rsp), %rdx`);
                            context.addAssembly(`\rmovl  ${params[1].stack_addr(context) ?? throwError('Expected')}(%rsp), %r8d`);
                            context.addAssembly(`\rcallq	 *__imp_WriteConsoleA(%rip)`);
                        */
                        return new Value(new LiteralMemLocation(0), VoidType.getInstance(), token.pos);
                    }
                    else if (fun_obj.name === 'input') {
                        const param = params[0]!;
                        if (params.length !== 1 || !param.valueType.isSameType(PtrType.getInstance(CharType.getInstance()))) {
                            throw new DebugPosError(fun_obj.pos, `built-in "input" function can accept only one argument of type char*\nfound:${param?.valueType}`);
                        }
                        context.addInstruction(new MovInstr("movl", context.getNewMemLocationFromOffset(4), LiteralMemLocation.staticNull()));
                        context.addInstruction(new MovInstr("movq", Register.getInstance("rdx"), valueToMemLoc(param, context)));
                        context.addInstruction(new StringInstruction("leaq scanf_mark(%rip) %rcx"));
                        context.addInstruction(new MovInstr("movq", Register.getInstance("rax"), LiteralMemLocation.staticNull()));
                        context.addInstruction(new StringInstruction("callq scanf"));
                        /*
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
                        */
                        return new Value(LiteralMemLocation.staticNull(), VoidType.getInstance(), token.pos);
                    }
                    else {
                        let in_stack: Value | undefined;
                        const { paramTypes } = fun_obj.valueType;
                        if (paramTypes.length !== params.length) {
                            throwError(`Unmatched parameter count\nExpected: ${paramTypes}\nFound: ${params}`);
                        }
                        for (let i = 0; i < paramTypes.length; ++i) {
                            in_stack = paramTypes[i]!.from_null(context, params[i]!.pos);
                            in_stack.valueType.copy_to(context, in_stack, params[i]!);
                        }
                        if (paramTypes.length > 0) {
                            const lastInStackParam = in_stack!;
                            context.addInstruction(new StringInstruction("#__parameter_offset_pass"));
                            context.addInstruction(new LeaqInstruction("leaq", Register.forParamPass(), valueToMemLoc(lastInStackParam, context)));
                        }
                        context.addInstruction(new StringInstruction(`callq ${functionName}`));
                        /*
                            if (params.length > 0) {
                                context.addAssembly(`
                                    \r#__parameter_offset_pass
                                    \rleaq ${!in_stack ? UNREACHABLE() : in_stack.stack_addr(context)}(%rsp), %rcx
                                `);
                            }
                            context.addAssembly(`
                                \rcallq ${functionName}
                            `);
                        */
                        const returnType = fun_obj.valueType.returnType;

                        if (returnType instanceof StructType) {
                            TODO();
                        }

                        const returnTypeSize = returnType.size;
                        const memloc = context.getNewMemLocation(returnType);
                        context.addInstruction(new MovInstr(get_mov_i_on_size(returnTypeSize), memloc, Register.forReturnValue(returnType)));

                        /*
                            const [reg, mov] = get_rax_i(fun_obj.valueType.returnType.size);
                            context.addAssembly(`   
                                \r${MOV_I[mov]} %${REG_I[reg]}, ${context.pushStack(fun_obj.valueType.returnType.size)}(%rsp)
                            `);
                        */
                        return new Value(memloc, returnType, token.pos);
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
            return new Value(LiteralMemLocation.staticNull(), VoidType.getInstance(), token.pos);
        }
        if ([TokenType.O_SQR].includes(type)) {
            if (!this.middle || !this.left) {
                throwError(new TokenParserError(token, `OP square brackets requires both LEFT and right args at ${token.pos}`));
            }
            const ind_val = this.middle.eval({ is_lvalue: false, can_be_decl: true });
            const ptr_val = this.left.eval({ is_lvalue: false, can_be_decl: true });
            const ptrWithOffset = ptr_val.valueType.from_plus(context, ptr_val, ind_val);
            const retunVar = (ptrWithOffset.valueType as PtrType).dereference_from(context, ptrWithOffset, token.pos);
            return retunVar;
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
            const paramType = params.length > 0 ? params[0]!.valueType : CharType.getInstance();
            return ArrayType.getArrayInstance(paramType, params.length).from_params(context, params, token.pos);
        }

        TODO(`unhandeled: ${token}`);
    }

}