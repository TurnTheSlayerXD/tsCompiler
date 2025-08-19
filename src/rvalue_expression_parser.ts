import { AstBuilder, handle_declaration_case } from "./ast_builder";
import { Context } from "./context";
import { Token } from "./lexer";


export class SemicolonExprParser {
    constructor(public context: Context, public tokens: Token[]) {
    }
    parse_with_ast(is_l_value: boolean, can_include_declaration: boolean) {
        const builder = new AstBuilder(this.tokens, this.context);
        const root = builder.build();
        let value_type;
        if (can_include_declaration && !!(value_type = handle_declaration_case(root))) {
            const val =  value_type.type.asm_from_literal(this.context, value_type.name, null, root.order.tok.pos);
            this.context.addScopeValue(val);
            return val;
        }
        return root.eval(false);
    }

}

