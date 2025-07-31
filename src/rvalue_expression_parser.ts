import { Context } from "./context";
import { getMatchingBracket, splitBy, throwError, TokenParserError, TODO, ParserError } from "./helper";
import { Token } from "./lexer";
import { is_op_token_type, OP_TOKENS, TokenType } from "./token_type";
import { Value, FunctionType, VoidType, IntType, PtrType, CharType } from "./value_types";


export class RValueExpressionParser {

    private ALLOWED_TOKENS = [TokenType.O_PAREN, TokenType.C_PAREN, ...OP_TOKENS];

    constructor(public context: Context, public tokens: Token[]) {
    }

    static getPriority(type: TokenType): number {
        if (type === TokenType.OP_PLUS || type === TokenType.OP_MINUS) {
            return 0;
        }
        if (type === TokenType.OP_ASTERISK || type === TokenType.OP_DIVIDE || type === TokenType.OP_AMPERSAND) {
            return 1;
        }
        if (type === TokenType.OP_PERCENT) {
            return 2;
        }
        TODO("UNREACHABLE");
    }


    static get_first_index_of_op_token(tokens: Token[]): number {
        let paren_count = 0;
        const types = tokens.map(t => t.type);
        const indexes_by_priorities: number[] = [-1, -1, -1];
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
        if ((op_index = RValueExpressionParser.get_first_index_of_op_token(tokens)) && op_index !== -1) {

            if (tokens[op_index]!.type === TokenType.OP_ASTERISK) {
                if ((op_index - 1 > -1 && is_op_token_type(tokens[op_index - 1]!.type)) || op_index - 1 < 0) {
                    // then asterics is dereference
                }
                else {
                    can_
                    // then asterics is multiply
                }

            }

        }
        if (tokens.length === ) {

        }
        else if (tokens.length >= 3 && tokens[0]!.type === TokenType.NAME && tokens[1]!.type === TokenType.O_PAREN) {
            const c_parent_pos = getMatchingBracket(tokens, 1, TokenType.O_PAREN, TokenType.C_PAREN);
            const fun_name = tokens[0]!.text;
            const splitted = splitBy(tokens.slice(2, c_parent_pos), t => t.type === TokenType.COMMA);

            const params = splitted.map(s => new RValueExpressionParser(this.context, s).parse()
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
                        \rleaq  ${params[0]!.getAddress()}(%rsp), %rdx
                    `);
                this.context.addAssembly(`
                        \rmovl  ${params[1]!.getAddress()}(%rsp), %r8d
                    `);
                this.context.addAssembly(`
                        \rcallq	 *__imp_WriteConsoleA(%rip)
                    `);
                return null;
            } else {
                TODO();
            }
        }
        else if (tokens.length === 1 && tokens[0]!.type === TokenType.NUM_INT) {
            const new_value = new Value('_temporary', IntType.getInstance(), tokens[0]!.pos);
            new_value.setValueFromLiteral(this.context, tokens[0]!.text);
            return new_value;
        }
        else if (tokens.length === 1 && tokens[0]!.type === TokenType.STRING_LITERAL) {
            const new_value = new Value('_temporary', PtrType.getInstance(CharType.getInstance()), tokens[0]!.pos);
            this.context.addStringLiteral(tokens[0]!.text);
            new_value.setValueFromLiteral(this.context, tokens[0]!.text);
            return new_value;
        }
        else if (tokens.) {

        }


        TODO(`token type ${tokens}`);
    }

}
