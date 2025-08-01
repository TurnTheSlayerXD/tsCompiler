import { Context } from "./context";
import { getMatchingBracket, splitBy, throwError, TokenParserError, TODO, ParserError, RulesError } from "./helper";
import { Position, Token } from "./lexer";
import { is_op_token_type, OP_TOKENS, TokenType } from "./token_type";
import { Value, FunctionType, VoidType, IntType, PtrType, CharType } from "./value_types";


export class SemicolonExprParser {

    private ALLOWED_TOKENS = [TokenType.O_PAREN, TokenType.C_PAREN, ...OP_TOKENS];

    constructor(public context: Context, public tokens: Token[]) {
    }

    static getPriority(type: TokenType): number {
        if (type === TokenType.OP_ASSIGNMENT) {
            return 0;
        }
        if (type === TokenType.OP_PLUS || type === TokenType.OP_MINUS) {
            return 1;
        }
        if (type === TokenType.OP_MULTIPLY || type === TokenType.OP_DIVIDE) {
            return 2;
        }
        if (type === TokenType.OP_DEREFERENCE || type === TokenType.OP_REFERENCE) {
            return 3;
        }
        TODO("UNREACHABLE");
    }


    static get_index_of_op_token(tokens: Token[]): number {
        let paren_count = 0;
        const types = tokens.map(t => t.type);
        const indexes_by_priorities: number[] = [-1, -1, -1, -1];
        for (let i = tokens.length - 1; i > -1; --i) {
            if (types[i] === TokenType.C_PAREN) {
                paren_count += 1;
            }
            else if (types[i] === TokenType.O_PAREN) {
                paren_count -= 1;
            }
            else if (paren_count === 0 && OP_TOKENS.includes(types[i]!)) {
                indexes_by_priorities[this.getPriority(types[i]!)] = i;
            }
        }
        return indexes_by_priorities.find((ind) => ind !== -1) ?? -1;
    }

    static replace_ambigous_token_types(tokens: Token[]) {
        for (let i = 0; i < tokens.length; ++i) {
            if (tokens[i]!.type === TokenType.OP_ASTERISK) {
                if ((i - 1 > -1 && is_op_token_type(tokens[i - 1]!.type)) || i - 1 < 0) {
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

    parse(): Value | null {
        let { context, tokens } = this;

        if (tokens.length === 0) {
            return null;
        }

        if (tokens.length > 0 && tokens[0]!.type === TokenType.O_PAREN) {
            const c_paren_pos = getMatchingBracket(tokens, 0, TokenType.O_PAREN, TokenType.C_PAREN);
            if (c_paren_pos === tokens.length - 1) {
                tokens = tokens.slice(1, tokens.length - 1);
            }
        }

        let op_index;
        if ((op_index = SemicolonExprParser.get_index_of_op_token(tokens)) && op_index !== -1) {

            const token = tokens[op_index]!;
            if (token.type === TokenType.OP_ASSIGNMENT) {
                let valueType;
                const name = op_index - 1 < 0 ? throwError(new TokenParserError(token, `No name in assignment`)) :
                    tokens[op_index - 1]!.type !== TokenType.NAME ? throwError(new TokenParserError(token, `Can't be lvalue`)) :
                        tokens[op_index - 1]!.text;

                let l_value = context.getValueByName(name);

                let is_declaration = false;
                if (op_index - 2 > -1) {
                    // then it should be declaration
                    if (tokens[op_index - 2]!.type !== TokenType.NAME || !(valueType = context.isFamiliarTypename(tokens[op_index - 2]!.text))) {
                        throwError(new TokenParserError(token, `No such type in assignment ${tokens[op_index - 2]!.text}`));
                    }
                    is_declaration = true;
                }
                if (is_declaration) {
                    if (!!l_value) {
                        throwError(new RulesError(token.pos, `Reassignment of Variable with name ${name}`))
                    }
                    l_value = valueType!.asm_create_from_literal(context, name, null, tokens[op_index - 1]!.pos);
                }
                else {
                    if (!l_value) {
                        throwError(new RulesError(tokens[op_index - 1]!.pos, `Referencing variable with name [${name}], but it does not exist`));
                    }
                }
                const r_value = new SemicolonExprParser(context, tokens.slice(op_index + 1,)).parse() ?? throwError(new TokenParserError(token, 'Nothing assigned in assignment'));
                l_value.valueType.asm_copy(context, r_value, l_value);
                return l_value;
            }

            if (token.type === TokenType.OP_PLUS || token.type === TokenType.OP_MINUS) {
                let left: Value, right: Value;
                if (op_index - 1 < 0) {
                    right = new SemicolonExprParser(context, tokens.slice(op_index + 1,)).parse() ?? throwError(new TokenParserError(token, `No argument for ${TokenType[token.type]}`));
                    left = right.valueType.asm_create_from_literal(context, '_temp', '0', token.pos);
                }
                else {
                    left = new SemicolonExprParser(context, tokens.slice(0, op_index - 1)).parse() ?? throwError(new TokenParserError(token, `No argument for ${TokenType[token.type]}`));
                    right = new SemicolonExprParser(context, tokens.slice(op_index + 1,)).parse() ?? throwError(new TokenParserError(token, `No argument for ${TokenType[token.type]}`));
                }
                return token.type === TokenType.OP_PLUS ? left.valueType.asm_create_from_plus(context, right) : left.valueType.asm_create_from_minus(context, right);
            }
            if (token.type === TokenType.OP_MULTIPLY || token.type === TokenType.OP_DIVIDE) {
                const left = new SemicolonExprParser(context, tokens.slice(0, op_index - 1)).parse() ?? throwError(new TokenParserError(token, `No argument for ${TokenType[token.type]}`));
                const right = new SemicolonExprParser(context, tokens.slice(op_index + 1,)).parse() ?? throwError(new TokenParserError(token, `No argument for ${TokenType[token.type]}`));
                return token.type === TokenType.OP_DIVIDE ? left.valueType.asm_create_from_divide(context, right) : left.valueType.asm_create_from_multiply(context, right);
            }
            if (token.type === TokenType.OP_DEREFERENCE || token.type === TokenType.OP_AMPERSAND) {
                const operand = new SemicolonExprParser(context, tokens.slice(op_index + 1,)).parse() ?? throwError(new TokenParserError(token, `No argument for ${TokenType[token.type]}`));
                return token.type === TokenType.OP_DEREFERENCE ? operand.valueType.asm_dereference(context, right) : left.valueType.asm_create_from_multiply(context, right);
            }
        }
        if (tokens.length >= 3 && tokens[0]!.type === TokenType.NAME && tokens[1]!.type === TokenType.O_PAREN) {
            const c_parent_pos = getMatchingBracket(tokens, 1, TokenType.O_PAREN, TokenType.C_PAREN);
            const fun_name = tokens[0]!.text;
            const splitted = splitBy(tokens.slice(2, c_parent_pos), t => t.type === TokenType.COMMA);

            const params = splitted.map(s => new SemicolonExprParser(this.context, s).parse()
                ?? throwError(new TokenParserError(tokens[0]!, "Void params are not allowed")));

            const actual_type = FunctionType.getInstance(VoidType.getInstance(), params.map(p => p.valueType));
            const fun_value = context.getValueWithTypeOrThrow(fun_name, actual_type);

            if (fun_value.name === 'print') {
                this.context.addAssembly(`
                        \rmovl  $4294967285, %ecx
                        \rcallq	*__imp_GetStdHandle(%rip)
                        \rmovq	%rax, ${context.pushStack(8)}(%rsp)
                        \rmovl	$0, ${context.pushStack(4)}(%rsp)
                        \rmovq	${context.stackPtr + 4}(%rsp), %rcx
                        \rleaq	${context.stackPtr}(%rsp), %r9
                        `);

                this.context.addAssembly(`
                        \rleaq  ${params[0]!.address}(%rsp), %rdx
                    `);
                this.context.addAssembly(`
                        \rmovl  ${params[1]!.address}(%rsp), %r8d
                    `);
                this.context.addAssembly(`
                        \rcallq	 *__imp_WriteConsoleA(%rip)
                    `);
                return null;
            } else {
                TODO();
            }
        }
        if (tokens.length === 1 && tokens[0]!.type === TokenType.NUM_INT) {
            const new_value = IntType.getInstance().asm_create_from_literal(this.context, '_temp', tokens[0]!.text, tokens[0]!.pos);
            return new_value;
        }
        if (tokens.length === 1 && tokens[0]!.type === TokenType.STRING_LITERAL) {
            this.context.addStringLiteral(tokens[0]!.text);
            const new_value = PtrType.getInstance(CharType.getInstance()).asm_create_from_literal(this.context, '_temp', tokens[0]!.text, tokens[0]!.pos);
            return new_value;
        }
        if (tokens.length === 1 && tokens[0]!.type === TokenType.NAME) {
            this.context
        }

        TODO(`token type ${tokens}`);
    }

}
