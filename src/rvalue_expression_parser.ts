import { Context } from "./context";
import { getMatchingBracket, splitBy, throwError, TokenParserError, TODO, ParserError, RulesError } from "./helper";
import { Position, Token } from "./lexer";
import { is_op_token_type, OP_TOKENS, TokenType } from "./token_type";
import { parse_type_from_tokens } from "./type_parsing";
import { Value, FunctionType, VoidType, IntType, PtrType, CharType, ValueType, AddrType } from "./value_types";


export class SemicolonExprParser {

    private ALLOWED_TOKENS = [TokenType.O_PAREN, TokenType.C_PAREN, ...OP_TOKENS];

    constructor(public context: Context, public tokens: Token[]) {
        if (tokens.length > 0 && tokens[0]!.type === TokenType.O_PAREN) {
            const c_paren_pos = getMatchingBracket(tokens, 0, TokenType.O_PAREN, TokenType.C_PAREN);
            if (c_paren_pos === tokens.length - 1) {
                tokens = tokens.slice(1, tokens.length - 1);
            }
        }
        SemicolonExprParser.replace_ambigous_token_types(context, tokens);
        this.tokens = tokens;
    }

    static get_index_of_types(tokens: Token[], target_types: TokenType[], forward: boolean): number {
        let paren_count = 0;
        const types = tokens.map(t => t.type);
        let index = -1;
        if (forward) {
            for (let i = 0; i < tokens.length; ++i) {
                if (types[i] === TokenType.O_PAREN) {
                    paren_count += 1;
                }
                else if (types[i] === TokenType.C_PAREN) {
                    paren_count -= 1;
                }
                else if (paren_count === 0 && target_types.includes(types[i]!)) {
                    index = i;
                }
            }
        } else {
            for (let i = tokens.length - 1; i > -1; --i) {
                if (types[i] === TokenType.C_PAREN) {
                    paren_count += 1;
                }
                else if (types[i] === TokenType.O_PAREN) {
                    paren_count -= 1;
                }
                else if (paren_count === 0 && target_types.includes(types[i]!)) {
                    index = i;
                }
            }
        }
        return index;
    }

    static replace_ambigous_token_types(context: Context, tokens: Token[]) {
        let paren_count = 0;
        for (let i = 0; i < tokens.length; ++i) {
            if (tokens[i]!.type === TokenType.O_PAREN) {
                paren_count += 1;
            }
            else if (tokens[i]!.type === TokenType.C_PAREN) {
                paren_count -= 1;
            }
            else if (paren_count === 0) {
                if (tokens[i]!.type === TokenType.OP_ASTERISK) {
                    if ((i - 1 > -1 && (is_op_token_type(tokens[i - 1]!.type) || tokens[i - 1]!.type === TokenType.NAME && !!context.hasTypename(tokens[i - 1]!.text)))
                        || i - 1 < 0) {
                        // then asterics is dereference
                        tokens[i]!.type = TokenType.OP_DEREFERENCE;
                    }
                    else {
                        // then asterics is multiply
                        tokens[i]!.type = TokenType.OP_MULTIPLY;
                    }
                }
                if (tokens[i]!.type === TokenType.OP_AMPERSAND) {
                    if ((i - 1 > -1 && is_op_token_type(tokens[i - 1]!.type)) || i - 1 < 0) {
                        // then ampersand is reference
                        tokens[i]!.type = TokenType.OP_REFERENCE;
                    }
                    else {
                        // then ampersand is logical "plus"
                        tokens[i]!.type = TokenType.OP_LOGICAL_PLUS;
                    }
                }
            }
        }
    }


    parse_declaration(tokens: Token[]): Value {
        const { context } = this;
        let typename, l_value;

        if (tokens.length === 0) {
            throwError(new Error('Expected lvalue expression'));
        }
        if (tokens.at(-1)!.type !== TokenType.NAME) {
            throwError(new Error('Expected variable name in lvalue expression'));
        }
        const value_name = tokens.at(-1)!.text;
        if (tokens.length >= 2 && tokens[0]!.type === TokenType.NAME && !!(typename = context.hasTypename(tokens[0]!.text))) {
            // then it is declaration of variable
            if (!!context.hasValue(value_name)) {
                throwError(new TokenParserError(tokens.at(-1)!, `Redeclaration of variable with name ${value_name}`));
            }
            const value_type = parse_type_from_tokens(context, tokens.slice(0, tokens.length - 1));
            l_value = value_type.asm_from_literal(context, value_name, null, tokens.at(-1)!.pos);
            context.addScopeValue(l_value);
            return l_value;
        }
        TODO();
    }

    parse(is_l_value: boolean): Value {
        let { context, tokens } = this;
        // console.log(`${tokens}
        //     ____________\r`);
        let op_index;

        if ((op_index = SemicolonExprParser.get_index_of_types(tokens, [TokenType.OP_ASSIGNMENT, TokenType.OP_ASSIGNMENT_PLUS, TokenType.OP_ASSIGNMENT_MINUS, TokenType.OP_ASSIGNMENT_MULTIPLY, TokenType.OP_ASSIGNMENT_DIVIDE], true)) !== -1) {
            const token = tokens[op_index]!;
            if (op_index === 0) {
                throwError(new TokenParserError(token, `Expected lvalue expression`));
            }
            const l_value = new SemicolonExprParser(context, tokens.slice(0, op_index)).parse(true);
            const r_value = new SemicolonExprParser(context, tokens.slice(op_index + 1,)).parse(false);
            // console.log(`Left = \n${l_value}`);
            // console.log(`Right = \n${r_value}`);
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
        if ((op_index = SemicolonExprParser.get_index_of_types(tokens,
            [TokenType.OP_AND,
            TokenType.OP_OR,
            ], true)) !== -1) {
            const token = tokens[op_index]!;
            if (op_index === 0) {
                throwError(new TokenParserError(token, `Expected left expression`));
            }
            const left = new SemicolonExprParser(context, tokens.slice(0, op_index)).parse(false);
            const right = new SemicolonExprParser(context, tokens.slice(op_index + 1,)).parse(false);

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


        if ((op_index = SemicolonExprParser.get_index_of_types(tokens,
            [TokenType.OP_COMP_GREATER,
            TokenType.OP_COMP_EQUAL,
            TokenType.OP_COMP_NOT_EQUAL,
            TokenType.OP_COMP_GREATER_EQ,
            TokenType.OP_COMP_LESS,
            TokenType.OP_COMP_LESS_EQ], true)) !== -1) {
            const token = tokens[op_index]!;
            if (op_index === 0) {
                throwError(new TokenParserError(token, `Expected left expression`));
            }
            const left = new SemicolonExprParser(context, tokens.slice(0, op_index)).parse(false);
            const right = new SemicolonExprParser(context, tokens.slice(op_index + 1,)).parse(false);

            switch (token!.type) {
                case TokenType.OP_COMP_GREATER: return left.valueType.asm_cmp_greater(context, left, right);
                case TokenType.OP_COMP_GREATER_EQ: return left.valueType.asm_cmp_greater_or_equal(context, left, right);
                case TokenType.OP_COMP_LESS: return left.valueType.asm_cmp_less(context, left, right);
                case TokenType.OP_COMP_LESS_EQ: return left.valueType.asm_cmp_less_or_equal(context, left, right);
                case TokenType.OP_COMP_EQUAL: return left.valueType.asm_cmp_equal(context, left, right);
                case TokenType.OP_COMP_NOT_EQUAL: return left.valueType.asm_cmp_not_equal(context, left, right);
            }

            TODO('CMP');
        }


        if (tokens.length > 0 && tokens[0]!.type === TokenType.NAME && !!context.hasTypename(tokens[0]!.text)) {
            return this.parse_declaration(tokens);
        }

        // console.log(`OP INDEX = ${op_index}`);
        if ((op_index = SemicolonExprParser.get_index_of_types(tokens, [TokenType.OP_PLUS, TokenType.OP_MINUS], true)) !== -1) {
            const token = tokens[op_index]!;
            let left: Value, right: Value;
            if (op_index - 1 < 0) {
                right = new SemicolonExprParser(context, tokens.slice(op_index + 1,)).parse(false);
                left = right.valueType.asm_from_literal(context, '_temp', '0', token.pos);
            }
            else {
                left = new SemicolonExprParser(context, tokens.slice(0, op_index)).parse(false);
                right = new SemicolonExprParser(context, tokens.slice(op_index + 1,)).parse(false);
            }
            return token.type === TokenType.OP_PLUS ? left.valueType.asm_from_plus(context, left, right) : left.valueType.asm_from_minus(context, left, right);
        }
        if ((op_index = SemicolonExprParser.get_index_of_types(tokens, [TokenType.OP_MULTIPLY, TokenType.OP_DIVIDE], true)) !== -1) {
            const token = tokens[op_index]!;
            const left = new SemicolonExprParser(context, tokens.slice(0, op_index)).parse(false);
            const right = new SemicolonExprParser(context, tokens.slice(op_index + 1,)).parse(false);

            return token.type === TokenType.OP_DIVIDE ? left.valueType.asm_from_divide(context, left, right) : left.valueType.asm_from_multiply(context, left, right);
        }
        if ((op_index = SemicolonExprParser.get_index_of_types(tokens, [TokenType.OP_PERCENT], true)) !== -1) {
            const token = tokens[op_index]!;
            const left = new SemicolonExprParser(context, tokens.slice(0, op_index)).parse(false);
            const right = new SemicolonExprParser(context, tokens.slice(op_index + 1,)).parse(false);
            return left.valueType.asm_from_percent(context, left, right);
        }

        if ((op_index = SemicolonExprParser.get_index_of_types(tokens, [TokenType.OP_REFERENCE, TokenType.OP_DEREFERENCE], false)) !== -1) {
            const token = tokens[op_index]!;
            let arg;
            if (token.type === TokenType.OP_REFERENCE) {
                arg = new SemicolonExprParser(context, tokens.slice(op_index + 1,)).parse(true);
            }
            else {
                arg = new SemicolonExprParser(context, tokens.slice(op_index + 1,)).parse(false);
                const ptr_type = arg.valueType instanceof PtrType ? arg.valueType as PtrType : throwError(new TokenParserError(token, `Trying to dereference Non-Pointer type ${arg.valueType}`));
                return ptr_type.asm_dereference(context, '_temp', arg, is_l_value);
            }
            return PtrType.getInstance(arg.valueType).asm_take_reference_from(context, '_temp', arg);
        }


        if (tokens.length >= 3 && tokens[0]!.type === TokenType.NAME && tokens[1]!.type === TokenType.O_PAREN) {
            const c_parent_pos = getMatchingBracket(tokens, 1, TokenType.O_PAREN, TokenType.C_PAREN);
            const fun_name = tokens[0]!.text;
            const splitted = splitBy(tokens.slice(2, c_parent_pos), t => t.type === TokenType.COMMA);

            const params = splitted.map(s => new SemicolonExprParser(this.context, s).parse(false)
                ?? throwError(new TokenParserError(tokens[0]!, "Void params are not allowed")));

            const actual_type = FunctionType.getInstance(VoidType.getInstance(), params.map(p => p.valueType));
            const fun_value = context.getValueWithTypeOrThrow(fun_name, actual_type);

            if (fun_value.name === 'print') {
                this.context.addAssembly(`
                        \rmovl $4294967285, %ecx
                        \rcallq *__imp_GetStdHandle(%rip)
                        \rmovq %rax, ${context.pushStack(8)}(%rsp)
                        \rmovl $0, ${context.pushStack(4)}(%rsp)
                        \rmovq ${context.stackPtr + 4}(%rsp), %rcx
                        \rleaq ${context.stackPtr}(%rsp), %r9
                        `);

                this.context.addAssembly(`
                        \rmovq  ${params[0]!.stack_addr(context)}(%rsp), %rdx
                    `);
                this.context.addAssembly(`
                        \rmovl  ${params[1]!.stack_addr(context)}(%rsp), %r8d
                    `);
                this.context.addAssembly(`
                        \rcallq	 *__imp_WriteConsoleA(%rip)
                    `);
                return new Value('_temp', VoidType.getInstance(), tokens[0]!.pos, null, AddrType.Indirect);
            }
            else if (fun_value.name === 'print_int') {
                this.context.addAssembly(`
                    \rmovq  ${params[0]!.stack_addr(context)}(%rsp), %rcx
                `);

                if (params[1]!.addr_type === AddrType.Indirect) {
                    this.context.addAssembly(`
                        \rmovq	${params[1]!.stack_addr(context)}(%rsp), %rax
                        \rmovl	(%rax), %edx
                    `);
                }
                else {
                    this.context.addAssembly(`
                        \rmovl	${params[1]!.stack_addr(context)}(%rsp), %edx
                    `);
                }

                this.context.addAssembly(`
                        \rcallq	printf
                    `);

                return new Value('_temp', VoidType.getInstance(), tokens[0]!.pos, null, AddrType.Indirect);
            }
            else {
                TODO();
            }
        }
        if (tokens.length === 1 && tokens[0]!.type === TokenType.NUM_INT) {
            const new_value = IntType.getInstance().asm_from_literal(this.context, '_temp', tokens[0]!.text, tokens[0]!.pos);
            return new_value;
        }
        if (tokens.length === 1 && tokens[0]!.type === TokenType.STRING_LITERAL) {
            this.context.addStringLiteral(tokens[0]!.text);
            const new_value = PtrType.getInstance(CharType.getInstance()).asm_from_literal(this.context, '_temp', tokens[0]!.text, tokens[0]!.pos);
            return new_value;
        }
        if (tokens.length === 1 && tokens[0]!.type === TokenType.CHAR_LITERAL) {
            const new_value = CharType.getInstance().asm_from_literal(this.context, '_temp', tokens[0]!.text, tokens[0]!.pos);
            return new_value;
        }

        if (tokens.length === 1 && tokens[0]!.type === TokenType.NAME) {
            return this.context.hasValue(tokens[0]!.text) ?? throwError(new TokenParserError(tokens[0]!, `Using undeclared var name [${tokens[0]!.text}]`));
        }
        TODO(`${tokens}, len=${tokens.length}`);
    }

}
