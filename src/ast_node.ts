import { get_rax_i } from "./converter";
import { UNREACHABLE, throwError, TokenParserError, TODO } from "./helper";
import { TokenType } from "./token_type";
import { parse_declaration_from_tokens } from "./type_parsing";
import { Value, ValueType, CharType, AddrType, PtrType, IntType, FunctionType, VoidType, MOV_I, REG_I, ArrayType } from "./value_types";
import { Context } from "./context";
import { OrderedToken } from "./ast_builder";
import { Token } from "./lexer";

export class AstNode {
    constructor(public order: OrderedToken, public left: AstNode | null, public right: AstNode | null, public context: Context) {
    }

    get type(): TokenType {
        return this.order.tok.type;
    }

    insert_node(node: AstNode) {
        if (node.order.pos < this.order.pos) {
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
        else {
            UNREACHABLE();
        }
    }

    eval({ is_lvalue, can_be_decl, is_immediately_assigned }: { is_lvalue: boolean, can_be_decl: boolean, is_immediately_assigned?: boolean }): Value {
        const type = this.order.tok.type;
        const token = this.order.tok;
        const { context } = this;

        if ([TokenType.OP_ASSIGNMENT, TokenType.OP_ASSIGNMENT_PLUS, TokenType.OP_ASSIGNMENT_MINUS, TokenType.OP_ASSIGNMENT_MULTIPLY, TokenType.OP_ASSIGNMENT_DIVIDE].includes(type)) {
            if (!this.left || !this.right)
                throwError(new TokenParserError(token, `Expected left and right args for ASSIGNMENT OP`));

            switch (token.type) {
                case TokenType.OP_ASSIGNMENT_PLUS: {
                    const l_value = this.left.eval({ is_lvalue: true, can_be_decl: false });
                    const r_value = this.right.eval({ is_lvalue: false, can_be_decl: false });

                    const new_value = l_value.valueType.asm_from_plus(context, l_value, r_value);
                    l_value.valueType.asm_copy(context, l_value, new_value);
                    return new_value;
                }
                case TokenType.OP_ASSIGNMENT_MINUS: {
                    const l_value = this.left.eval({ is_lvalue: true, can_be_decl: false });
                    const r_value = this.right.eval({ is_lvalue: false, can_be_decl: false });
                    const new_value = l_value.valueType.asm_from_minus(context, l_value, r_value);
                    l_value.valueType.asm_copy(context, l_value, new_value);
                    return new_value;
                }
                case TokenType.OP_ASSIGNMENT_MULTIPLY: {
                    const l_value = this.left.eval({ is_lvalue: true, can_be_decl: false });
                    const r_value = this.right.eval({ is_lvalue: false, can_be_decl: false });
                    const new_value = l_value.valueType.asm_from_multiply(context, l_value, r_value);
                    l_value.valueType.asm_copy(context, l_value, new_value);
                    return new_value;
                }
                case TokenType.OP_ASSIGNMENT_DIVIDE: {
                    const l_value = this.left.eval({ is_lvalue: true, can_be_decl: false });
                    const r_value = this.right.eval({ is_lvalue: false, can_be_decl: false });
                    const new_value = l_value.valueType.asm_from_divide(context, l_value, r_value);
                    l_value.valueType.asm_copy(context, l_value, new_value);
                    return new_value;
                }
                case TokenType.OP_ASSIGNMENT: {
                    const l_value = this.left.eval({ is_lvalue: true, can_be_decl: true, is_immediately_assigned: true });
                    const r_value = this.right.eval({ is_lvalue: false, can_be_decl: false });
                    console.log(l_value);
                    console.log(r_value);
                    if (
                        l_value.valueType instanceof ArrayType &&
                        !l_value._address &&
                        r_value.valueType instanceof ArrayType &&
                        r_value.name === '_temp' &&
                        r_value.valueType.array_size !== null) {

                        if (!l_value.valueType.array_size) {
                            l_value._address = r_value._address;
                            return r_value;
                        }
                        else if (l_value.valueType.array_size >= r_value.valueType.array_size) {
                            const _temp = l_value.valueType.asm_from_literal(context, '_temp', null, l_value.pos, true);
                            const _temp_type = _temp.valueType as ArrayType ?? UNREACHABLE();
                            for (let i = 0; i < r_value.valueType.array_size; ++i) {
                                const from_plus = _temp_type
                                    .asm_from_plus(context, _temp, IntType.getInstance()
                                        .asm_from_literal(context, "_temp", String(i), l_value.pos, true));
                                const deref = (from_plus.valueType as PtrType)?.asm_dereference(context, '_temp', from_plus, true);

                                const r_value_from_plus = r_value.valueType
                                    .asm_from_plus(context, r_value, IntType.getInstance()
                                        .asm_from_literal(context, "_temp", String(i), r_value.pos, true));
                                const r_value_deref = (r_value_from_plus.valueType as PtrType)?.asm_dereference(context, '_temp', r_value_from_plus, false);

                                deref.valueType.asm_copy(context, deref, r_value_deref);
                            }
                            l_value._address = _temp._address;
                            r_value._address = _temp._address;
                        }
                        else {
                            UNREACHABLE();
                        }
                    }
                    else if (!l_value._address) {
                        l_value._address = r_value._address;
                    }
                    else {
                        l_value.valueType.asm_copy(context, l_value, r_value);
                    }
                    return r_value;
                }
                default:
                    TODO();
            }
        }
        if ([TokenType.DECL_TYPENAME].includes(type)) {
            if (!can_be_decl) {
                throwError(new TokenParserError(token, `Assignment forbidden in expression`));
            }
            const { type, name } = parse_declaration_from_tokens(context, this);
            const val = type.asm_from_literal(context, name, null, token.pos, !is_immediately_assigned);
            context.addScopeValue(val);
            return val;
        }

        if ([TokenType.OP_AND, TokenType.OP_OR,].includes(type)) {
            if (!this.left || !this.right)
                throwError(new TokenParserError(token, `Expected left and right args for ASSIGNMENT OP`));

            const left = this.left.eval({ is_lvalue: false, can_be_decl: true });
            const right = this.right.eval({ is_lvalue: false, can_be_decl: true });

            const left_addr = left.valueType.asm_to_boolean(context, left).stack_addr(context);
            const right_addr = right.valueType.asm_to_boolean(context, right).stack_addr(context);

            const res_addr = context.pushStack(CharType.getInstance().size);
            const mark = context.gen_mark();
            switch (token!.type) {
                case TokenType.OP_AND: {
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
                case TokenType.OP_OR: {
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
            return new Value('_temp', CharType.getInstance(), left.pos, res_addr, AddrType.Stack);
        }

        if ([
            TokenType.OP_COMP_GREATER,
            TokenType.OP_COMP_EQ,
            TokenType.OP_COMP_NOT_EQ,
            TokenType.OP_COMP_GREATER_EQ,
            TokenType.OP_COMP_LESS,
            TokenType.OP_COMP_LESS_EQ].includes(type)) {
            if (!this.left || !this.right)
                throwError(new TokenParserError(token, `Expected left and right args for ASSIGNMENT OP`));
            const left = this.left.eval({ is_lvalue: false, can_be_decl: true });
            const right = this.right.eval({ is_lvalue: false, can_be_decl: true });
            switch (token!.type) {
                case TokenType.OP_COMP_GREATER: return left.valueType.asm_cmp_greater(context, left, right);
                case TokenType.OP_COMP_GREATER_EQ: return left.valueType.asm_cmp_greater_or_equal(context, left, right);
                case TokenType.OP_COMP_LESS: return left.valueType.asm_cmp_less(context, left, right);
                case TokenType.OP_COMP_LESS_EQ: return left.valueType.asm_cmp_less_or_equal(context, left, right);
                case TokenType.OP_COMP_EQ: return left.valueType.asm_cmp_equal(context, left, right);
                case TokenType.OP_COMP_NOT_EQ: return left.valueType.asm_cmp_not_equal(context, left, right);
            }
            TODO('CMP');
        }
        if ([TokenType.OP_PLUS, TokenType.OP_MINUS].includes(type)) {
            if (!this.right)
                throwError(new TokenParserError(token, `Expected at least right arg for PLUS-MINUS OP`));
            let left: Value, right: Value = this.right.eval({ is_lvalue: false, can_be_decl: true });
            if (!this.left) {
                left = right.valueType.asm_from_literal(context, '_temp', '0', token.pos, true);
            }
            else {
                left = this.left.eval({ is_lvalue: false, can_be_decl: true });
            }
            return token.type === TokenType.OP_PLUS ? left.valueType.asm_from_plus(context, left, right) : left.valueType.asm_from_minus(context, left, right);
        }

        if ([TokenType.OP_MULTIPLY, TokenType.OP_DIVIDE].includes(type)) {
            if (!this.left || !this.right)
                throwError(new TokenParserError(token, `Expected left and right args for MUL/DIV OP`));
            const left = this.left.eval({ is_lvalue: false, can_be_decl: true });
            const right = this.right.eval({ is_lvalue: false, can_be_decl: true });

            return token.type === TokenType.OP_DIVIDE ? left.valueType.asm_from_divide(context, left, right) : left.valueType.asm_from_multiply(context, left, right);
        }
        if ([TokenType.OP_PERCENT].includes(type)) {
            if (!this.left || !this.right)
                throwError(new TokenParserError(token, `Expected left and right args for PERCENT OP`));
            const left = this.left.eval({ is_lvalue: false, can_be_decl: true });
            const right = this.right.eval({ is_lvalue: false, can_be_decl: true });
            return left.valueType.asm_from_percent(context, left, right);
        }
        if ([TokenType.OP_REFERENCE].includes(type)) {
            if (!this.right) {
                throwError(new TokenParserError(token, `Expected right arg for REFERENCE OP`));
            }
            const arg = this.right.eval({ is_lvalue: true, can_be_decl: true });
            return PtrType.getInstance(arg.valueType).asm_take_reference_from(context, '_temp', arg);
        }
        if ([TokenType.OP_DEREFERENCE].includes(type)) {
            if (!this.right) {
                throwError(new TokenParserError(token, `Expected right arg for DEREFERENCE OP`));
            }
            const arg = this.right.eval({ is_lvalue: false, can_be_decl: true });
            const ptr_type: PtrType = arg.valueType instanceof PtrType ? arg.valueType as PtrType : throwError(new TokenParserError(token, `Trying to dereference Non-Pointer type ${arg.valueType}`));
            return ptr_type.asm_dereference(context, '_temp', arg, is_lvalue);
        }
        if ([TokenType.NUM_INT].includes(type)) {
            const new_value = IntType.getInstance().asm_from_literal(this.context, '_temp', token.text, token.pos, true);
            return new_value;
        }
        if ([TokenType.STRING_LITERAL].includes(type)) {
            this.context.addStringLiteral(token.text);
            const new_value = ArrayType.getArrayInstance(CharType.getInstance(), null).asm_from_literal(this.context, '_temp', token.text, token.pos, true);
            return new_value;
        }
        if ([TokenType.CHAR_LITERAL].includes(type)) {
            const new_value = CharType.getInstance().asm_from_literal(this.context, '_temp', token.text, token.pos, true);
            return new_value;
        }
        if ([TokenType.NAME].includes(type)) {
            if (this.left || this.right) {
                TODO(`UNKNOWN EXPR: ${this}`);
            }
            return this.context.hasValue(token.text) ?? throwError(new TokenParserError(token, `Using undeclared var name [${token.text}]`));
        }
        TODO(`unhandeled: ${token}`);
    }
}