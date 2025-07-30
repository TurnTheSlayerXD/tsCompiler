"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("./helper");
const fs_1 = require("fs");
const token_type_1 = require("./token_type");
const lexer_1 = require("./lexer");
const value_types_1 = require("./value_types");
const context_1 = require("./context");
class RValueExpressionParser {
    context;
    tokens;
    constructor(context, tokens) {
        this.context = context;
        this.tokens = tokens;
    }
    getMatchingRBracket(l_bracket_pos) {
        let help = 0;
        const types = this.tokens.map(t => t.type);
        for (let i = l_bracket_pos + 1; i < types.length; ++i) {
            if (types[i] === token_type_1.TokenType.O_PAREN) {
                help += 1;
            }
            else if (types[i] === token_type_1.TokenType.C_PAREN) {
                if (help === 0) {
                    return i;
                }
                help -= 1;
            }
        }
        (0, helper_1.throwError)(new helper_1.TokenParserError(this.tokens[l_bracket_pos], `Unclosed O_PAREN`));
    }
    parse() {
        const { context } = this;
        const tokens = this.tokens;
        if (tokens.length >= 3 && tokens[0].type === token_type_1.TokenType.NAME && tokens[1].type === token_type_1.TokenType.O_PAREN) {
            const c_parent_pos = this.getMatchingRBracket(1);
            const fun_name = tokens[0].text;
            const splitted = (0, helper_1.splitBy)(tokens.slice(2, c_parent_pos), t => t.type === token_type_1.TokenType.COMMA);
            const params = splitted.map(s => new RValueExpressionParser(this.context, s).parse()
                ?? (0, helper_1.throwError)(new helper_1.TokenParserError(tokens[0], "Void params are not allowed")));
            const actual_type = value_types_1.FunctionType.getInstance(value_types_1.VoidType.getInstance(), params.map(p => p.valueType));
            const fun_value = context.getValueWithTypeOrThrow(fun_name, actual_type);
            if (fun_value.name === 'print') {
                this.context.addAssembly(`
                    	\rmovl  $4294967285, %ecx               # imm = 0xFFFFFFF5
                    	\rcallq	*__imp_GetStdHandle(%rip)
                    	\rmovq	%rax, ${context.pushStack(8)}(%rsp)
                    	\rmovl	$0, ${context.pushStack(4)}(%rsp)
                    	\rmovq	${context.stackPtr + 4}(%rsp), %rcx
                    	\rleaq	${context.stackPtr}(%rsp), %r9
                        `);
                this.context.addAssembly(`
                        \rleaq  ${params[0].getAddress()}(%rsp), %rdx
                    `);
                this.context.addAssembly(`
                        \rmovl  ${params[1].getAddress()}(%rsp), %r8d
                    `);
                this.context.addAssembly(`
                        \rcallq	 *__imp_WriteConsoleA(%rip)
                    `);
                return null;
            }
            else {
                (0, helper_1.TODO)();
            }
        }
        else if (tokens.length === 1 && tokens[0].type === token_type_1.TokenType.NUM_INT) {
            const new_value = new value_types_1.Value('_temporary', value_types_1.IntType.getInstance());
            new_value.setValue(this.context, tokens[0].text);
            return new_value;
        }
        else if (tokens.length === 1 && tokens[0].type === token_type_1.TokenType.STRING_LITERAL) {
            const new_value = new value_types_1.Value('_temporary', value_types_1.PtrType.getInstance(value_types_1.CharType.getInstance()));
            this.context.addStringLiteral(tokens[0].text);
            new_value.setValue(this.context, tokens[0].text);
            return new_value;
        }
        (0, helper_1.TODO)();
    }
}
class CurlExpressionParser {
    context;
    tokens;
    constructor(context, tokens) {
        this.context = context;
        this.tokens = tokens;
    }
    parse() {
        const tokens = this.tokens;
        for (let i = 0; i < tokens.length; ++i) {
            if (tokens[i].type === token_type_1.TokenType.NAME) {
                const semi_index = tokens.slice(i + 1).findIndex(t => t.type === token_type_1.TokenType.SEMICOLON) + i + 1;
                semi_index === -1 ? (0, helper_1.throwError)(new helper_1.TokenParserError(tokens[i], "No semicolon at the of the expression")) : undefined;
                new RValueExpressionParser(this.context, tokens.slice(i, semi_index)).parse();
                i = semi_index;
            }
            else {
                (0, helper_1.TODO)();
            }
        }
        return null;
    }
}
const main = () => {
    const text = (0, fs_1.readFileSync)("./example/main.c").toString();
    const lexer = new lexer_1.Lexer(text);
    let token;
    let prev;
    let i = 0;
    const tokens = [];
    const context = new context_1.Context(lexer);
    const parseDeclarationType = (token, gen) => {
        let type;
        let isConst = false;
        while (token.type === token_type_1.TokenType.KWD_CONST) {
            isConst = true;
            token = gen.next_token_or_throw();
        }
        if (!(type = context.isFamiliarTypename(token.text))) {
            (0, helper_1.throwError)(new helper_1.LexerError(gen, `Unknown VALUE TYPE: [${token.text}]`));
        }
        while ((token = gen.next_token_or_throw()).type === token_type_1.TokenType.KWD_CONST) {
            isConst = true;
        }
        type.is_const = isConst;
        while (token.type === token_type_1.TokenType.OP_ASTERISK) {
            type = value_types_1.PtrType.getInstance(type);
            let next_token = gen.next_token_or_throw();
            if (next_token.type === token_type_1.TokenType.KWD_CONST) {
                type.is_const = true;
                next_token = gen.next_token_or_throw();
            }
            token = next_token;
        }
        return [token, type];
    };
    const parseDeclarationTypeWithName = (token, gen) => {
        const [next_token, type] = parseDeclarationType(token, gen);
        if (next_token.type !== token_type_1.TokenType.NAME || context.isFamiliarValueName(next_token.text)) {
            (0, helper_1.throwError)(new helper_1.ParserError(gen, `Token type ${token_type_1.TokenType[next_token.type]}`));
        }
        return [gen.next_token_or_throw(), new value_types_1.Value(next_token.text, type)];
    };
    while (token = lexer.next_token()) {
        let cur = token.toString();
        tokens.push(token);
        if (cur === prev) {
            throw new helper_1.LexerError(lexer, `REPETITION: cur=[${cur}] prev=[${prev}])`);
        }
        prev = cur;
        if (token.type === token_type_1.TokenType.PREPROCESSOR) {
            continue;
        }
        let decl_type;
        [token, decl_type] = parseDeclarationType(token, lexer);
        let obj;
        if (token.type === token_type_1.TokenType.NAME && !context.isFamiliarValueName(token.text)) {
            const name = token.text;
            token = lexer.next_token_or_throw();
            if (token.type === token_type_1.TokenType.O_PAREN) {
                token = lexer.next_token_or_throw();
                let val;
                const fun_params = [];
                while ([token, val] = parseDeclarationTypeWithName(token, lexer)) {
                    // console.log(toString(token), val.toString());
                    fun_params.push(val);
                    if (token.type === token_type_1.TokenType.C_PAREN) {
                        break;
                    }
                    if (token.type !== token_type_1.TokenType.COMMA) {
                        (0, helper_1.throwError)(new helper_1.ParserError(lexer, `Unexpected token in function parameters ${token}`));
                    }
                    token = lexer.next_token_or_throw();
                    if (token.type === token_type_1.TokenType.C_PAREN) {
                        break;
                    }
                }
                const decl_function = value_types_1.FunctionType.getInstance(decl_type, fun_params.map(v => v.valueType));
                const new_fun = new value_types_1.Value(name, decl_function);
                context.addScopeValue(new_fun);
                context.addAssembly(`\r.def	${new_fun.name};
                                     \r.endef
                                     \r.globl	${new_fun.name}
                                     \r${new_fun.name}:
                                     \r.seh_proc ${new_fun.name}
                                     \rsubq	$${context.stackPtr}, %rsp
                                     \r`);
                token = lexer.next_token_or_throw();
                if (token.type === token_type_1.TokenType.O_CURL) {
                    const tokens = [];
                    const error = new helper_1.TokenParserError(token, "Unmatched O_CURL");
                    while (true) {
                        token = lexer.next_token();
                        if (!token) {
                            (0, helper_1.throwError)(error);
                        }
                        if (token.type === token_type_1.TokenType.C_CURL) {
                            break;
                        }
                        tokens.push(token);
                    }
                    new CurlExpressionParser(context, tokens).parse();
                }
                context.addAssembly(`\rxor %eax, %eax
                                     \raddq	$${context.init_stack_offset}, %rsp
	                                 \rretq
	                                 \r.seh_endproc
                                     \r`);
            }
        }
    }
    // console.log(context.getAsm());
    context.asmToFile('out.asm');
};
try {
    main();
}
catch (err) {
    console.error(err);
}
