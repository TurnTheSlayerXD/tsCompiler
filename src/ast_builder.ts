import { Context } from "./context";
import { get_rax_i } from "./converter";
import { Category, get_token_category, prettyHtml, replace_ambigous_token_types, throwError, TODO, TokenParserError, UNREACHABLE } from "./helper";
import { Token } from "./lexer";
import { OP_TOKENS, TokenType } from "./token_type";
import { AddrType, CharType, FunctionType, IntType, MOV_I, PtrType, REG_I, Value, ValueType, VoidType } from "./value_types";



export class AstNode {
    constructor(public order: OrderedToken, public left: AstNode | null, public right: AstNode | null, public context: Context) {
    }
    insert_node(node: AstNode) {
        AstNode._insert_node(this, node);
    }
    static _insert_node(root: AstNode | null, node: AstNode): AstNode {
        if (!root) {
            return node;
        }

        if (node.order.pos < root.order.pos) {
            root.left = this._insert_node(root.left, node);
        }
        else if (node.order.pos > root.order.pos) {
            root.right = this._insert_node(root.right, node);
        }
        else {
            UNREACHABLE();
        }
        return root;
    }

    eval(is_lvalue: boolean): Value {
        const type = this.order.tok.type;
        const token = this.order.tok;
        const { context } = this;

        if ([TokenType.OP_ASSIGNMENT, TokenType.OP_ASSIGNMENT_PLUS, TokenType.OP_ASSIGNMENT_MINUS, TokenType.OP_ASSIGNMENT_MULTIPLY, TokenType.OP_ASSIGNMENT_DIVIDE].includes(type)) {
            if (!this.left || !this.right)
                throwError(new TokenParserError(token, `Expected left and right args for ASSIGNMENT OP`));

            if (is_declaration_from_ast_node(this.left)) {
                TODO('');
            }
            const l_value = this.left.eval(true);
            const r_value = this.right.eval(false);

            switch (token.type) {
                case TokenType.OP_ASSIGNMENT_PLUS: {
                    const new_value = l_value.valueType.asm_from_plus(context, l_value, r_value);
                    l_value.valueType.asm_copy(context, l_value, new_value);
                    return new_value;
                }
                case TokenType.OP_ASSIGNMENT_MINUS: {
                    const new_value = l_value.valueType.asm_from_minus(context, l_value, r_value);
                    l_value.valueType.asm_copy(context, l_value, new_value);
                    return new_value;
                }
                case TokenType.OP_ASSIGNMENT_MULTIPLY: {
                    const new_value = l_value.valueType.asm_from_multiply(context, l_value, r_value);
                    l_value.valueType.asm_copy(context, l_value, new_value);
                    return new_value;
                }
                case TokenType.OP_ASSIGNMENT_DIVIDE: {
                    const new_value = l_value.valueType.asm_from_divide(context, l_value, r_value);
                    l_value.valueType.asm_copy(context, l_value, new_value);
                    return new_value;
                }
                case TokenType.OP_ASSIGNMENT: {
                    l_value.valueType.asm_copy(context, l_value, r_value);
                    return r_value;
                }
                default:
                    TODO();
            }
        }
        if ([TokenType.OP_AND, TokenType.OP_OR,].includes(type)) {
            if (!this.left || !this.right)
                throwError(new TokenParserError(token, `Expected left and right args for ASSIGNMENT OP`));

            const left = this.left.eval(false);
            const right = this.right.eval(false);

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
            const left = this.left.eval(false);
            const right = this.right.eval(false);
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
            let left: Value, right: Value = this.right.eval(false);
            if (!this.left) {
                left = right.valueType.asm_from_literal(context, '_temp', '0', token.pos);
            }
            else {
                left = this.left.eval(false);
            }
            return token.type === TokenType.OP_PLUS ? left.valueType.asm_from_plus(context, left, right) : left.valueType.asm_from_minus(context, left, right);
        }

        if ([TokenType.OP_MULTIPLY, TokenType.OP_DIVIDE].includes(type)) {
            if (!this.left || !this.right)
                throwError(new TokenParserError(token, `Expected left and right args for MUL/DIV OP`));
            const left = this.left.eval(false);
            const right = this.right.eval(false);

            return token.type === TokenType.OP_DIVIDE ? left.valueType.asm_from_divide(context, left, right) : left.valueType.asm_from_multiply(context, left, right);
        }
        if ([TokenType.OP_PERCENT].includes(type)) {
            if (!this.left || !this.right)
                throwError(new TokenParserError(token, `Expected left and right args for PERCENT OP`));
            const left = this.left.eval(false);
            const right = this.right.eval(false);
            return left.valueType.asm_from_percent(context, left, right);
        }
        if ([TokenType.OP_REFERENCE].includes(type)) {
            if (!this.right) {
                throwError(new TokenParserError(token, `Expected right arg for REFERENCE OP`));
            }
            const arg = this.right.eval(true);
            return PtrType.getInstance(arg.valueType).asm_take_reference_from(context, '_temp', arg);
        }
        if ([TokenType.OP_DEREFERENCE].includes(type)) {
            if (!this.right) {
                throwError(new TokenParserError(token, `Expected right arg for DEREFERENCE OP`));
            }
            const arg = this.right.eval(false);
            const ptr_type = arg.valueType instanceof PtrType ? arg.valueType as PtrType : throwError(new TokenParserError(token, `Trying to dereference Non-Pointer type ${arg.valueType}`));
            return ptr_type.asm_dereference(context, '_temp', arg, is_lvalue);
        }
        // if ([TokenType.FUNC_CALL].includes(type)) {
        //     if (!this.right) {
        //         throwError(new TokenParserError(token, `Expected left and right args for ASSIGNMENT OP`));
        //     }
        //     let params = [];
        //     let comma_token: AstNode | null = this.right;
        //     while (!!comma_token && comma_token.order.tok.type === TokenType.COMMA) {
        //         if (!comma_token.left) {
        //             throwError(new TokenParserError(comma_token.order.tok, 'Expected expression before comma'));
        //         }
        //         params.push(comma_token.left.eval(false));
        //         comma_token = comma_token.right;
        //     }
        //     if (!!comma_token) {
        //         params.push(comma_token.eval(false));
        //     }
        //     const fun_name = token.text;
        //     const fun_value = context.hasValueOrThrow(fun_name);
        //     if (!(fun_value.valueType instanceof FunctionType)) {
        //         throwError(new TokenParserError(token, `Calling not callable obj [${fun_value}]`));
        //     }
        //     if (fun_value.name === 'print') {
        //         this.context.addAssembly(`
        //                 \rmovl $4294967285, %ecx
        //                 \rcallq *__imp_GetStdHandle(%rip)
        //                 \rmovq %rax, ${context.pushStack(8)}(%rsp)
        //                 \rmovl $0, ${context.pushStack(4)}(%rsp)
        //                 \rmovq ${context.stackPtr + 4}(%rsp), %rcx
        //                 \rleaq ${context.stackPtr}(%rsp), %r9
        //                 `);

        //         this.context.addAssembly(`
        //                 \rmovq  ${params[0]!.stack_addr(context)}(%rsp), %rdx
        //             `);
        //         this.context.addAssembly(`
        //                 \rmovl  ${params[1]!.stack_addr(context)}(%rsp), %r8d
        //             `);
        //         this.context.addAssembly(`
        //                 \rcallq	 *__imp_WriteConsoleA(%rip)
        //             `);
        //         return new Value('_temp', VoidType.getInstance(), token.pos, null, AddrType.Indirect);
        //     }
        //     else {
        //         let in_stack: Value;
        //         const { paramTypes } = fun_value.valueType;
        //         if (paramTypes.length !== params.length) {
        //             throwError(`Unmatched parameter count\nExpected: ${paramTypes}\nFound: ${params}`);
        //         }
        //         for (let i = 0; i < paramTypes.length; ++i) {
        //             in_stack = paramTypes[i]!.asm_from_literal(context, '_param', null, params[i]!.pos);
        //             in_stack.valueType.asm_copy(context, in_stack, params[i]!);
        //         }
        //         if (params.length > 0) {
        //             context.addAssembly(`
        //                 \r#__parameter_offset_pass
        //                 \rleaq ${in_stack!.stack_addr(context)}(%rsp), %rcx
        //             `);
        //         }
        //         context.addAssembly(`
        //                 \rcallq ${fun_name}
        //             `);
        //         const [reg, mov] = get_rax_i(fun_value.valueType.returnType.size);
        //         context.addAssembly(`   
        //                 \r${MOV_I[mov]} %${REG_I[reg]}, ${context.pushStack(fun_value.valueType.returnType.size)}(%rsp)
        //             `);
        //         return new Value('_temp', fun_value.valueType.returnType, token.pos, context.stackPtr, AddrType.Stack);
        //     }
        // }
        if ([TokenType.NUM_INT].includes(type)) {
            const new_value = IntType.getInstance().asm_from_literal(this.context, '_temp', token.text, token.pos);
            return new_value;
        }
        if ([TokenType.STRING_LITERAL].includes(type)) {
            this.context.addStringLiteral(token.text);
            const new_value = PtrType.getInstance(CharType.getInstance())
                .asm_from_literal(this.context, '_temp', token.text, token.pos);
            return new_value;
        }
        if ([TokenType.CHAR_LITERAL].includes(type)) {
            const new_value = CharType.getInstance().asm_from_literal(this.context, '_temp', token.text, token.pos);
            return new_value;
        }

        if ([TokenType.NAME].includes(type)) {
            return this.context.hasValue(token.text) ?? throwError(new TokenParserError(token, `Using undeclared var name [${token.text}]`));
        }
        TODO(`${token}`);

    }
}

type OrderedToken = {
    tok: Token;
    pos: number;
    depth: number;
};

type OperToken = OrderedToken & Category;

export class AstBuilder {


    O_BRACES = [TokenType.O_PAREN, TokenType.O_CURL, TokenType.O_SQR];
    C_BRACES = [TokenType.C_PAREN, TokenType.C_CURL, TokenType.C_SQR];

    constructor(private tokens: Token[], private context: Context) {
        replace_ambigous_token_types(context, tokens);
    }

    is_paren_correct(): { ok: boolean, err: Error | null } {
        const arr: Token[] = [];

        for (let i = 0; i < this.tokens.length; ++i) {
            const tok = this.tokens[i]!;
            if (this.O_BRACES.includes(tok.type)) {
                arr.push(tok);
            }
            else if (this.C_BRACES.includes(tok.type)) {
                let popped = arr.pop() ?? throwError(new TokenParserError(tok, `Unmatched bracket (`));
                if (tok.type === TokenType.C_PAREN && popped.type !== TokenType.O_PAREN) {
                    return { ok: false, err: new TokenParserError(tok, `Unmatched bracket )`) };
                }
                if (tok.type === TokenType.C_CURL && popped.type !== TokenType.O_CURL) {
                    return { ok: false, err: new TokenParserError(tok, `Unmatched bracket }`) };
                }
                if (tok.type === TokenType.C_SQR && popped.type !== TokenType.O_SQR) {
                    return { ok: false, err: new TokenParserError(tok, `Unmatched bracket ]`) }
                }
            }
        }
        if (arr.length !== 0) {
            return { ok: false, err: new TokenParserError(arr.pop()!, `Unmatched bracket ${TokenType[arr.at(-1)!.type]}`) };
        }
        return { ok: true, err: null };
    }


    map_to_ordered(): OrderedToken[] {
        let cur_depth = 0;
        const res: OrderedToken[] = [];
        for (let i = 0; i < this.tokens.length; ++i) {
            const tok = this.tokens[i]!;
            if (this.O_BRACES.includes(tok.type)) {
                res.push({ tok, pos: i, depth: cur_depth });
                cur_depth += 1;
            }
            else if (this.C_BRACES.includes(tok.type)) {
                cur_depth -= 1;
            }
            else {
                res.push({ tok, pos: i, depth: cur_depth, });
            }
        }
        return res;
    }



    build(): AstNode {
        const ordered = this.map_to_ordered();
        const ordered_tokens: OperToken[] = ordered.map(t => {
            const categ = get_token_category(t.tok.type) ?? throwError(new TokenParserError(t.tok, `AST SORTING NOT IMPL: ${t.tok}`));
            return { depth: t.depth, pos: t.pos, imp: categ.imp, exec_order: categ.exec_order, tok: t.tok };
        });
        ordered_tokens.sort((lhs: OperToken, rhs: OperToken) => {
            if (lhs.depth === rhs.depth) {

                if (lhs.imp === rhs.imp) {

                    lhs.pos !== rhs.pos || throwError(new Error(`TOKENS HAVE SAME POS: ${lhs}, ${rhs}`));
                    if (lhs.exec_order === 'left') {
                        return lhs.pos - rhs.pos;
                    }

                    return rhs.pos - lhs.pos;
                }

                return lhs.imp - rhs.imp;
            }

            return lhs.depth - rhs.depth;
        });
        console.log(ordered_tokens);
        if (ordered_tokens.length === 0) {
            UNREACHABLE();
        }
        const root: AstNode = new AstNode(ordered_tokens[0]!, null, null, this.context);
        for (const tok of ordered_tokens.slice(1)) {
            root.insert_node(new AstNode(tok, null, null, this.context));
        }
        prettyHtml(root);
        return root;
    }

}

function is_declaration_from_ast_node(root: AstNode): ValueType | null {

    TODO('TODO is_declaration_from_ast_node case');
}