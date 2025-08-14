import { throwError, TokenParserError } from "./helper";
import { Token } from "./lexer";
import { TokenType } from "./token_type";



class AstNode {
}

class AstBuilder {



    constructor(private tokens: Token[]) {

    }

    is_paren_correct(): boolean {
        const arr: Token[] = [];

        for (const tok of this.tokens) {
            if ([TokenType.O_PAREN, TokenType.O_CURL, TokenType.O_SQR].includes(tok.type)) {
                arr.push(tok);
            }
            else if ([TokenType.C_PAREN, TokenType.C_CURL, TokenType.C_SQR].includes(tok.type)) {
                let popped = arr.pop() ?? throwError(new TokenParserError(tok, `Unmatched bracket (`));
                if (popped.type === TokenType.C_PAREN && tok.type !== TokenType.O_PAREN) {
                    throwError(new TokenParserError(tok, `Unmatched bracket (`));
                }
                if (popped.type === TokenType.C_CURL && tok.type !== TokenType.O_CURL) {
                    throwError(new TokenParserError(tok, `Unmatched bracket (`));
                }
                if (popped.type === TokenType.C_SQR && tok.type !== TokenType.O_SQR) {
                    throwError(new TokenParserError(tok, `Unmatched bracket (`));
                }
            }
        }

        if (arr.length !== 0) {
            throwError(new TokenParserError(arr.pop()!, `Unmatched bracket (`));
        }
    }

    build(): AstNode {





    }

}

