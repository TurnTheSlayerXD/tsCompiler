import { Context } from "./context";
import { get_rax_i, get_rdx_i } from "./converter";
import { Category, get_token_category, prettyHtml, replace_ambigous_token_types, RulesError, throwError, TODO, TokenParserError, UNREACHABLE } from "./helper";
import { Token } from "./lexer";
import { C_BRACES, O_BRACES, OP_TOKENS, TokenType } from "./token_type";
import { parse_declaration_from_tokens } from "./type_parsing";
import { AddrType, CharType, FunctionType, IntType, MOV_I, PtrType, REG_I, Value, ValueType, VoidType } from "./value_types";

export class AstNode {
    constructor(public order: OrderedToken, public left: AstNode | null, public right: AstNode | null, public context: Context) {
    }

    get type(): TokenType {
        return this.order.tok.type;
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

            const r_value = this.right.eval(false);

            let new_value;
            if (!!(new_value = handle_declaration_case(this.left))) {
                if (type !== TokenType.OP_ASSIGNMENT) {
                    throwError(new TokenParserError(token, `Only basic assignment can be used with var type declaration`));
                }
                if (r_value.valueType.isSameType(new_value.type)) {
                    r_value.name = new_value.name;
                    context.addScopeValue(r_value);
                    return r_value;
                }
                const l_value = new_value.type.asm_from_literal(context, new_value.name, null, this.left.order.tok.pos);
                l_value.valueType.asm_copy(context, l_value, r_value);
                context.addScopeValue(l_value)
                return l_value;
            }

            const l_value = this.left.eval(true);
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
            const ptr_type: PtrType = arg.valueType instanceof PtrType ? arg.valueType as PtrType : throwError(new TokenParserError(token, `Trying to dereference Non-Pointer type ${arg.valueType}`));
            return ptr_type.asm_dereference(context, '_temp', arg, is_lvalue);
        }
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
            let ret;
            if (this.left || this.right) {
                TODO(`UNKNOWN EXPR: ${this}`);
            }
            return this.context.hasValue(token.text) ?? throwError(new TokenParserError(token, `Using undeclared var name [${token.text}]`));
        }
        if ([TokenType.O_PAREN].includes(type)) {
            //handle function call case
            if (this.left) {
                const fun_obj = this.left.eval(false);
                let params = [];
                let comma_token: AstNode | null = this.right;
                while (comma_token && comma_token.type === TokenType.COMMA) {
                    if (!comma_token.left) {
                        throwError(new TokenParserError(comma_token.order.tok, 'Expected expression before comma'));
                    }
                    params.push(comma_token.left.eval(false));
                    comma_token = comma_token.right;
                }
                if (!!comma_token) {
                    params.push(comma_token.eval(false));
                }
                const fun_name = fun_obj.name;
                if (!(fun_obj.valueType instanceof FunctionType)) {
                    throwError(new TokenParserError(token, `Calling not callable obj [${fun_obj}]`));
                }
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
            // empty brackets returns void
            if (!this.right) {
                return new Value('_temp', VoidType.getInstance(), token.pos, null, AddrType.Stack);
            }
            //otherwise it is just for operation ordering
            return this.right.eval(false);
        }
        if ([TokenType.O_SQR].includes(type)) {
            if (!this.left || !this.right) {
                throwError(new TokenParserError(token, `OP square brackets requires both LEFT and right args`));
            }
            const ind_val = this.right.eval(false);
            const ptr_val = this.left.eval(false);
            const applied = ptr_val.valueType.asm_from_plus(context, ptr_val, ind_val);
            const applied_type = applied.valueType as PtrType ?? throwError(new TokenParserError(token, 'Expected PTR type'));
            const res = applied_type.asm_dereference(context, '_temp', applied, is_lvalue);
            return res;
        }
        if ([TokenType.O_CURL].includes(type)) {
            const params = [];
            let comma_token: AstNode | null = this.right;
            while (comma_token && comma_token.type === TokenType.COMMA) {
                if (!comma_token.left) {
                    throwError(new TokenParserError(comma_token.order.tok, 'Expected expression before comma'));
                }
                params.push(comma_token.left.eval(false));
                comma_token = comma_token.right;
            }
            if (!!comma_token) {
                params.push(comma_token.eval(false));
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
type OrderedToken = {
    tok: Token;
    pos: number;
    depth: number;
};

type OperToken = OrderedToken & Category;

export class AstBuilder {
    constructor(private tokens: Token[], private context: Context) {
        replace_ambigous_token_types(context, tokens);
    }

    is_paren_correct(): { ok: boolean, err: Error | null } {
        const arr: Token[] = [];

        for (let i = 0; i < this.tokens.length; ++i) {
            const tok = this.tokens[i]!;
            if (O_BRACES.includes(tok.type)) {
                arr.push(tok);
            }
            else if (C_BRACES.includes(tok.type)) {
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
            if (O_BRACES.includes(tok.type)) {
                res.push({ tok, pos: i, depth: cur_depth, });
                cur_depth += 1;
            }
            else if (C_BRACES.includes(tok.type)) {
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


function gather_nodes_in_order(root: AstNode): AstNode[] {
    const nodes: AstNode[] = [];
    const in_order = (v: AstNode | null) => {
        if (v === null) {
            return;
        }
        in_order(v.left);
        nodes.push(v);
        in_order(v.right);
    };
    in_order(root);
    return nodes;
}

export function handle_declaration_case(root: AstNode): { type: ValueType, name: string } | null {
    if (root.right || root.order.tok.type !== TokenType.NAME) {
        return null;
    }
    let left: AstNode | null = root;
    const toks: Token[] = [];
    while (!!left && [TokenType.NAME, TokenType.TYPE_PTR, TokenType.TYPE_REF].includes(left.order.tok.type)) {
        toks.push(left.order.tok);
        left = left.left;
    }
    if (toks.length === 1) {
        return null;
    }
    toks.reverse();
    return parse_declaration_from_tokens(root.context, toks);
}
