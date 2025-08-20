import { AstBuilder } from "./ast_builder";
import { Context } from "./context";
import { Token } from "./lexer";


export class SemicolonExprParser {
    constructor(public context: Context, public tokens: Token[]) {
    }
    parse_with_ast(is_l_value: boolean, can_include_declaration: boolean) {
        const builder = new AstBuilder(this.tokens, this.context);
        const root = builder.build();
        let value_type;
        return root.eval({ is_lvalue: false, can_be_decl: true });
    }

}

