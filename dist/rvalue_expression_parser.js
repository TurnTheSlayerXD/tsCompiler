"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemicolonExprParser = void 0;
const ast_builder_1 = require("./ast_builder");
class SemicolonExprParser {
    context;
    tokens;
    constructor(context, tokens) {
        this.context = context;
        this.tokens = tokens;
    }
    parse_with_ast(is_l_value, can_include_declaration) {
        const builder = new ast_builder_1.AstBuilder(this.tokens, this.context);
        const root = builder.build();
        let value_type;
        return root.eval({ is_lvalue: false, can_be_decl: true });
    }
}
exports.SemicolonExprParser = SemicolonExprParser;
