"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_token_category = get_token_category;
const token_type_1 = require("./token_type");
function get_token_category(type) {
    let _inc = -1;
    let inc = () => ++_inc;
    inc();
    if ([token_type_1.TokenType.COMMA].includes(type))
        return { exec_order: 'left', imp: _inc };
    inc();
    if ([token_type_1.TokenType.OP_ASSIGNMENT, token_type_1.TokenType.OP_ASSIGNMENT_PLUS, token_type_1.TokenType.OP_ASSIGNMENT_MINUS, token_type_1.TokenType.OP_ASSIGNMENT_MULTIPLY, token_type_1.TokenType.OP_ASSIGNMENT_DIVIDE].includes(type))
        return { exec_order: 'left', imp: _inc };
    inc();
    if ([token_type_1.TokenType.DECL_TYPENAME].includes(type))
        return { exec_order: 'right', imp: _inc };
    inc();
    if ([token_type_1.TokenType.OP_OR].includes(type))
        return { exec_order: 'right', imp: _inc };
    inc();
    if ([token_type_1.TokenType.OP_AND].includes(type))
        return { exec_order: 'right', imp: _inc };
    inc();
    if ([token_type_1.TokenType.OP_COMP_GREATER, token_type_1.TokenType.OP_COMP_EQ, token_type_1.TokenType.OP_COMP_NOT_EQ, token_type_1.TokenType.OP_COMP_GREATER_EQ, token_type_1.TokenType.OP_COMP_LESS, token_type_1.TokenType.OP_COMP_LESS_EQ,].includes(type))
        return { exec_order: 'right', imp: _inc };
    inc();
    if ([token_type_1.TokenType.OP_PLUS, token_type_1.TokenType.OP_MINUS].includes(type)) {
        return { exec_order: 'right', imp: _inc };
    }
    inc();
    if ([token_type_1.TokenType.OP_MULTIPLY, token_type_1.TokenType.OP_DIVIDE].includes(type))
        return { exec_order: 'right', imp: _inc };
    inc();
    if ([token_type_1.TokenType.OP_PERCENT].includes(type))
        return { exec_order: 'right', imp: _inc };
    inc();
    if ([token_type_1.TokenType.OP_REFERENCE, token_type_1.TokenType.OP_DEREFERENCE].includes(type))
        return { exec_order: 'left', imp: _inc };
    inc();
    if ([token_type_1.TokenType.O_PAREN, token_type_1.TokenType.O_CURL, token_type_1.TokenType.O_SQR].includes(type))
        return { exec_order: 'left', imp: _inc };
    inc();
    if ([token_type_1.TokenType.NAME, token_type_1.TokenType.NUM_INT, token_type_1.TokenType.NUM_FLOAT, token_type_1.TokenType.CHAR_LITERAL, token_type_1.TokenType.STRING_LITERAL].includes(type))
        return { exec_order: 'right', imp: _inc };
    return null;
}
