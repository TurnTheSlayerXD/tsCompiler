import { UNREACHABLE, throwError, TokenParserError, TODO, TEMP_NAME, DebugPosError } from "./helper";
import { TokenType } from "./token_type";
import { parse_declaration_from_ast_node } from "./type_parsing";
import { Context } from "./context";
import { OrderedToken } from "./ast_builder";
import { NamedValue, Value, valueToMemLoc } from "./value";
import { ArrayType } from "./value_types/array_type";
import { CharType } from "./value_types/char_type";
import { IntType } from "./value_types/int_type";
import { PtrType } from "./value_types/ptr_type";
import { StructType } from "./value_types/struct_type";
import { VoidType } from "./value_types/void_type";
import { IndirectStackLoc } from "./instruction/mem_location";

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

                    const new_value = l_value.valueType.from_plus(context, l_value, r_value);
                    l_value.valueType.copy_to(context, l_value, new_value);
                    return new_value;
                }
                case TokenType.OP_ASSIGNMENT_MINUS: {
                    const l_value = this.left.eval({ is_lvalue: true, can_be_decl: false });
                    const r_value = this.right.eval({ is_lvalue: false, can_be_decl: false });
                    const new_value = l_value.valueType.from_minus(context, l_value, r_value);
                    l_value.valueType.copy_to(context, l_value, new_value);
                    return new_value;
                }
                case TokenType.OP_ASSIGNMENT_MULTIPLY: {
                    const l_value = this.left.eval({ is_lvalue: true, can_be_decl: false });
                    const r_value = this.right.eval({ is_lvalue: false, can_be_decl: false });
                    const new_value = l_value.valueType.from_multiply(context, l_value, r_value);
                    l_value.valueType.copy_to(context, l_value, new_value);
                    return new_value;
                }
                case TokenType.OP_ASSIGNMENT_DIVIDE: {
                    const l_value = this.left.eval({ is_lvalue: true, can_be_decl: false });
                    const r_value = this.right.eval({ is_lvalue: false, can_be_decl: false });
                    const new_value = l_value.valueType.from_divide(context, l_value, r_value);
                    l_value.valueType.copy_to(context, l_value, new_value);
                    return new_value;
                }
                case TokenType.OP_ASSIGNMENT: {
                    const l_value = this.left.eval({ is_lvalue: true, can_be_decl: true, is_immediately_assigned: true });
                    const r_value = this.right.eval({ is_lvalue: false, can_be_decl: false });

                    if (!(l_value instanceof NamedValue) && !(l_value._srcMemLoc instanceof IndirectStackLoc)) {
                        throwError(new DebugPosError(token.pos, `Expected lvalue on left size of OP_ASSIGNMENT`));
                    }
                    l_value.valueType.copy_to(context, l_value, r_value);
                    return l_value;
                    // if (
                    //     l_value.valueType instanceof ArrayType &&
                    //     !l_value._address &&
                    //     r_value.valueType instanceof ArrayType &&
                    //     r_value.name === TEMP_NAME &&
                    //     r_value.valueType.array_size !== null) {

                    //     if (!l_value.valueType.array_size) {
                    //         l_value._address = r_value._address;
                    //         return r_value;
                    //     }
                    //     else if (l_value.valueType.array_size >= r_value.valueType.array_size) {
                    //         const _temp = l_value.valueType.asm_from_literal(context, temp_t.t, null, l_value.pos, true);
                    //         const _temp_type = _temp.valueType as ArrayType ?? UNREACHABLE();
                    //         for (let i = 0; i < r_value.valueType.array_size; ++i) {
                    //             const from_plus = _temp_type
                    //                 .asm_from_plus(context, _temp, IntType.getInstance()
                    //                     .asm_from_literal(context, temp_t.t, String(i), l_value.pos, true));
                    //             const deref = (from_plus.valueType as PtrType)?.asm_dereference(context, temp_t.t, from_plus, true);

                    //             const r_value_from_plus = r_value.valueType
                    //                 .asm_from_plus(context, r_value, IntType.getInstance()
                    //                     .asm_from_literal(context, temp_t.t, String(i), r_value.pos, true));
                    //             const r_value_deref = (r_value_from_plus.valueType as PtrType)?.asm_dereference(context, temp_t.t, r_value_from_plus, false);

                    //             deref.valueType.asm_copy(context, deref, r_value_deref);
                    //         }
                    //         l_value._address = _temp._address;
                    //         r_value._address = _temp._address;
                    //     }
                    //     else if (l_value.valueType.array_size < r_value.valueType.array_size) {
                    //         throwError(new TokenParserError(token, "Expected array size to be greater or equal than array size it is assigned to"))
                    //     }
                    //     else {
                    //         UNREACHABLE();
                    //     }
                    // }
                    // else if (!l_value._address && l_value.valueType.isSameType(r_value.valueType)) {
                    //     l_value._address = r_value._address;
                    // }
                    // else {
                    //     if (!l_value._address) {
                    //         const l_value_alloc = l_value.valueType.asm_from_literal(context, l_value.name, null, l_value.pos, true);
                    //         l_value._address = l_value_alloc._address;
                    //         l_value.addr_type = l_value_alloc.addr_type;
                    //     }
                    //     l_value.valueType.asm_copy(context, l_value, r_value);
                    // }
                    // return r_value;
                }
                default:
                    UNREACHABLE();
            }
        }
        if ([TokenType.DECL_TYPENAME].includes(type)) {
            if (!can_be_decl) {
                throwError(new TokenParserError(token, `Assignment forbidden in expression`));
            }
            const { type, name } = parse_declaration_from_ast_node(context, this);
            const val = new NamedValue(name, type.from_null(context, token.pos));
            context.addNewVarValue(val);
            return val;
        }

        if ([TokenType.OP_AND, TokenType.OP_OR,].includes(type)) {
            if (!this.left || !this.right) {
                throwError(new TokenParserError(token, `Expected left and right args for ASSIGNMENT OP`));
            }
            const leftVar = this.left.eval({ is_lvalue: false, can_be_decl: true });
            const rightVar = this.right.eval({ is_lvalue: false, can_be_decl: true });
            switch (type) {
                case TokenType.OP_AND:
                    return CharType.getInstance().from_AND_expr(context, leftVar, rightVar);
                case TokenType.OP_OR:
                    return CharType.getInstance().from_OR_expr(context, leftVar, rightVar);
                default:
                    UNREACHABLE();
            }
        }

        if ([
            TokenType.OP_COMP_GREATER,
            TokenType.OP_COMP_EQ,
            TokenType.OP_COMP_NOT_EQ,
            TokenType.OP_COMP_GREATER_EQ,
            TokenType.OP_COMP_LESS,
            TokenType.OP_COMP_LESS_EQ].includes(type)) {
            if (!this.left || !this.right) {
                throwError(new TokenParserError(token, `Expected left and right args for ASSIGNMENT OP`));
            }

            const leftVar = this.left.eval({ is_lvalue: false, can_be_decl: true });
            const rightVar = this.right.eval({ is_lvalue: false, can_be_decl: true });
            switch (token.type) {
                case TokenType.OP_COMP_GREATER: return leftVar.valueType.cmp_greater(context, leftVar, rightVar);
                case TokenType.OP_COMP_GREATER_EQ: return leftVar.valueType.cmp_greater_or_equal(context, leftVar, rightVar);
                case TokenType.OP_COMP_LESS: return leftVar.valueType.cmp_less(context, leftVar, rightVar);
                case TokenType.OP_COMP_LESS_EQ: return leftVar.valueType.cmp_less_or_equal(context, leftVar, rightVar);
                case TokenType.OP_COMP_EQ: return leftVar.valueType.cmp_equal(context, leftVar, rightVar);
                case TokenType.OP_COMP_NOT_EQ: return leftVar.valueType.cmp_not_equal(context, leftVar, rightVar);
                default: UNREACHABLE();
            }
        }
        if ([TokenType.OP_PLUS, TokenType.OP_MINUS].includes(type)) {
            if (!this.right) {
                throwError(new TokenParserError(token, `Expected at least right arg for PLUS-MINUS OP`));
            }
            const rightVar = this.right.eval({ is_lvalue: false, can_be_decl: true });
            const leftVar: Value = this.left
                ? this.left.eval({ is_lvalue: false, can_be_decl: true })
                : rightVar.valueType.from_null(context, token.pos);
            switch (type) {
                case TokenType.OP_PLUS: return leftVar.valueType.from_plus(context, leftVar, rightVar);
                case TokenType.OP_MINUS: return leftVar.valueType.from_minus(context, leftVar, rightVar);
                default: UNREACHABLE();
            }
        }

        if ([TokenType.OP_MULTIPLY, TokenType.OP_DIVIDE].includes(type)) {
            if (!this.left || !this.right) {
                throwError(new TokenParserError(token, `Expected left and right args for MUL/DIV OP`));
            }

            const leftVar = this.left.eval({ is_lvalue: false, can_be_decl: true });
            const rightVar = this.right.eval({ is_lvalue: false, can_be_decl: true });
            switch (type) {
                case TokenType.OP_MULTIPLY: return leftVar.valueType.from_multiply(context, leftVar, rightVar);
                case TokenType.OP_MINUS: return leftVar.valueType.from_divide(context, leftVar, rightVar);
                default: UNREACHABLE();
            }
        }
        if ([TokenType.OP_PERCENT].includes(type)) {
            if (!this.left || !this.right) {
                throwError(new TokenParserError(token, `Expected left and right args for PERCENT OP`));
            }

            const leftVar = this.left.eval({ is_lvalue: false, can_be_decl: true });
            const rightVar = this.right.eval({ is_lvalue: false, can_be_decl: true });
            return leftVar.valueType.from_percent(context, leftVar, rightVar);
        }
        if ([TokenType.OP_REFERENCE].includes(type)) {
            if (!this.right) {
                throwError(new TokenParserError(token, `Expected right arg for REFERENCE OP`));
            }
            if (this.left) {
                throwError(new TokenParserError(token, `Unexpected left arg for REFERENCE OP`));
            }

            const varToReference = this.right.eval({ is_lvalue: true, can_be_decl: true });
            return PtrType.getInstance(varToReference.valueType).take_reference_from(context, varToReference, token.pos);
        }
        if ([TokenType.OP_DEREFERENCE].includes(type)) {
            if (!this.right) {
                throwError(new TokenParserError(token, `Expected right arg for DEREFERENCE OP`));
            }
            if (this.left) {
                throwError(new TokenParserError(token, `Unexpected left arg for DEREFERENCE OP`));
            }

            const ptrToDereference = this.right.eval({ is_lvalue: false, can_be_decl: true });
            const ptrType: PtrType = ptrToDereference.valueType instanceof PtrType
                ? ptrToDereference.valueType as PtrType
                : throwError(new TokenParserError(token, `Trying to dereference Non-Pointer type ${ptrToDereference.valueType}`));
            return ptrType.dereference_from(context, ptrToDereference, token.pos);
        }
        if ([TokenType.NUM_INT].includes(type)) {
            if (this.left || this.right) {
                TODO(`UNKNOWN EXPR: ${this}`);
            }

            const new_value = IntType.getInstance().from_literal(this.context, token.text, token.pos);
            return new_value;
        }
        if ([TokenType.STRING_LITERAL].includes(type)) {
            if (this.left || this.right) {
                TODO(`UNKNOWN EXPR: ${this}`);
            }

            this.context.addStringLiteral(token.text);
            const new_value = PtrType.getInstance(CharType.getInstance()).from_literal(this.context, token.text, token.pos);
            return new_value;
        }
        if ([TokenType.CHAR_LITERAL].includes(type)) {
            if (this.left || this.right) {
                TODO(`UNKNOWN EXPR: ${this}`);
            }

            const new_value = CharType.getInstance().from_literal(this.context, token.text, token.pos);
            return new_value;
        }
        if ([TokenType.NAME].includes(type)) {
            if (this.left || this.right) {
                TODO(`UNKNOWN EXPR: ${this}`);
            }

            return this.context.getVarValue(token.text) ?? throwError(new TokenParserError(token, `Using undeclared var name [${token.text}]`));
        }
        if ([TokenType.KWD_NULLPTR].includes(type)) {
            if (this.left || this.right) {
                TODO(`UNKNOWN EXPR: ${this}`);
            }

            return PtrType.getInstance(VoidType.getInstance()).from_null(context, token.pos);
        }
        if ([TokenType.OP_DOT].includes(type)) {
            if (!this.left || !this.right) {
                TODO(`UNKNOWN EXPR: ${this}`);
            }
            const srcVar = this.left.eval({ is_lvalue, can_be_decl, is_immediately_assigned: false });

            const fieldNode = this.right;
            if (fieldNode.left || fieldNode.right) {
                throwError(new TokenParserError(fieldNode.order.tok, `Struct field cannot have subtokens\nNode: ${fieldNode}`));
            }
            const fieldToken = fieldNode.order.tok;

            if (srcVar.valueType instanceof StructType) {
                return srcVar.valueType.from_dot(context, srcVar, fieldToken.text, fieldToken.pos);
            }
            else if (srcVar.valueType instanceof PtrType && srcVar.valueType.ptrTo instanceof StructType) {
                return srcVar.valueType.ptrTo.from_ptr_dot(context, srcVar, fieldToken.text, fieldToken.pos);
            }
            else {
                throwError(new TokenParserError(this.left.order.tok, `Expected STRUCT entity or PTR TO STRUCT before OP_DOT\nActual type: ${srcVar.valueType}`));
            }
        }
        TODO(`unhandeled: ${token}`);
    }
}