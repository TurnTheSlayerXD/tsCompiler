import { TokenType } from "./token_type";

export type Category = { exec_order: 'left' | 'right', imp: number }
export function get_token_category(type: TokenType): Category | null {

    let _inc = -1;
    let inc = () => ++_inc;

    inc();
    if ([TokenType.COMMA].includes(type)) return { exec_order: 'left', imp: _inc };
    inc();
    if ([TokenType.OP_ASSIGNMENT, TokenType.OP_ASSIGNMENT_PLUS, TokenType.OP_ASSIGNMENT_MINUS, TokenType.OP_ASSIGNMENT_MULTIPLY, TokenType.OP_ASSIGNMENT_DIVIDE].includes(type)) return { exec_order: 'left', imp: _inc };

    inc();
    if ([TokenType.DECL_TYPENAME].includes(type)) return { exec_order: 'right', imp: _inc };

    inc();
    if ([TokenType.OP_OR].includes(type)) return { exec_order: 'right', imp: _inc };
    inc();
    if ([TokenType.OP_AND].includes(type)) return { exec_order: 'right', imp: _inc };
    inc();
    if ([TokenType.OP_COMP_GREATER, TokenType.OP_COMP_EQ, TokenType.OP_COMP_NOT_EQ, TokenType.OP_COMP_GREATER_EQ, TokenType.OP_COMP_LESS, TokenType.OP_COMP_LESS_EQ,].includes(type))
        return { exec_order: 'right', imp: _inc }
    inc();
    if ([TokenType.OP_PLUS, TokenType.OP_MINUS].includes(type)) { return { exec_order: 'right', imp: _inc }; }
    inc();
    if ([TokenType.OP_MULTIPLY, TokenType.OP_DIVIDE].includes(type)) return { exec_order: 'right', imp: _inc };
    inc();
    if ([TokenType.OP_PERCENT].includes(type)) return { exec_order: 'right', imp: _inc };
    inc();
    if ([TokenType.OP_REFERENCE, TokenType.OP_DEREFERENCE].includes(type)) return { exec_order: 'left', imp: _inc };

    inc();
    if ([TokenType.O_PAREN, TokenType.O_CURL, TokenType.O_SQR].includes(type)) return { exec_order: 'right', imp: _inc };
    inc();
    if ([TokenType.NAME, TokenType.NUM_INT, TokenType.NUM_FLOAT, TokenType.CHAR_LITERAL, TokenType.STRING_LITERAL].includes(type)) return { exec_order: 'right', imp: _inc };
    return null;
}
