import { AstBracketNode } from "./ast_bracket_node";
import { AstNode } from "./ast_node";
import { Context } from "./context";
import { throwError, TODO, TokenParserError, UNREACHABLE } from "./helper";
import { DebugPosition, Token } from "./lexer";
import { TokenType } from "./token_type";
import { Value } from "./value";
import { ArrayType } from "./value_types/array_type";
import { FunctionType } from "./value_types/function_type";
import { PtrType } from "./value_types/ptr_type";
import { ValueType } from "./value_types/value_type";

type ONLY_TYPE = { has_name: false, type: ValueType };
type WITH_NAME = { has_name: true, type: ValueType, name: string };

type PARSE_TYPE_RES = ONLY_TYPE | WITH_NAME;

export function parse_type_from_ast_node(context: Context, root: AstNode): PARSE_TYPE_RES {
    if (root.type !== TokenType.DECL_TYPENAME) {
        UNREACHABLE();
    }
    let variable_name: string | undefined;
    const nodes = collect_all_nodes_sorted_backwards(root);
    if (nodes.length === 0) {
        UNREACHABLE();
    }
    if (nodes[0]!.type !== TokenType.DECL_TYPENAME) {
        UNREACHABLE();
    }
    let final_type: ValueType = context.getTypeFromTypename(nodes[0]!.order.tok.text) ?? UNREACHABLE();
    if (nodes.at(-1)!.type === TokenType.NAME) {
        variable_name = nodes.at(-1)!.order.tok.text;
    }
    let type_modifiers = nodes.slice(1, !!variable_name ? nodes.length - 1 : nodes.length);

    function get_type(index: number) {
        for (let i = index; i < type_modifiers.length; ++i) {
            const node = type_modifiers[i]!;
            if (node.type === TokenType.O_SQR) {
                const bracket_node = node as AstBracketNode;
                let array_size: number = 0;
                if (bracket_node.middle) {
                    if (bracket_node.middle.type !== TokenType.NUM_INT) {
                        throwError(new TokenParserError(bracket_node.order.tok, `Expected constant expression inside Array size qualifier. Found: ${bracket_node.middle.order.tok}`))
                    }
                    array_size = parseInt(bracket_node.middle.order.tok.text);
                    if (!Number.isFinite(array_size)) {
                        throwError(new TokenParserError(bracket_node.middle.order.tok, `Expected Integer expression`));
                    }
                }
                get_type(i + 1);
                if (array_size === 0) {
                    UNREACHABLE();
                }

                final_type = ArrayType.getArrayInstance(final_type, array_size);
                return;
            }
            else if (node.type === TokenType.O_PAREN) {
                const bracket_node = node as AstBracketNode;
                if (bracket_node.middle) {
                    if (bracket_node.middle.type === TokenType.OP_DEREFERENCE) {
                        if (i + 1 >= type_modifiers.length || type_modifiers[i + 1]!.type !== TokenType.O_PAREN) {
                            throwError(new TokenParserError(bracket_node.order.tok, `Expected O_PAREN IN PTR TO FUNCTION TYPE DECLARATION`));
                        }
                        const fun_param_types: ValueType[] = [];
                        let comma_node = (type_modifiers[i + 1]! as AstBracketNode).middle;
                        while (comma_node && comma_node.type === TokenType.COMMA) {
                            const param_type = parse_type_from_ast_node(context, comma_node.left ?? throwError(new TokenParserError(comma_node.order.tok, `Expected type`)));
                            fun_param_types.push(param_type.has_name ? UNREACHABLE() : param_type.type);
                            comma_node = comma_node.right;
                        }
                        if (comma_node) {
                            const param_type = parse_type_from_ast_node(context, comma_node.left ?? throwError(new TokenParserError(comma_node.order.tok, `Expected type`)));
                            fun_param_types.push(param_type.has_name ? UNREACHABLE() : param_type.type);
                        }
                        final_type = PtrType.getInstance(FunctionType.getInstance(final_type, fun_param_types));
                    }
                    else {
                        throwError(new TokenParserError(bracket_node.order.tok, `EXPECTED EXPR INSIDE BRACES`))
                    }
                }
            }
            else if (node.type === TokenType.OP_DEREFERENCE) {
                final_type = PtrType.getInstance(final_type);
            }
            else {
                TODO(`parse type: ${node.order.tok}`);
            }
        }
    }
    get_type(0);

    return variable_name ? { type: final_type, has_name: true, name: variable_name } : { type: final_type, has_name: false };
}

type STATE =
    'typename' |
    'ptr' |
    'o_sqr' |
    'o_paren' |
    'var_name' |
    'end' |
    'o_paren_params';

type StateMachineReturnType = { state: STATE, valueType: ValueType, varName: string | undefined };

type StateMachineType = Record<STATE, (type: ValueType, nodeIter: Generator<AstNode, void, any>, varName: string | undefined)
    => StateMachineReturnType>;

class TypeParsingError extends Error {
    static earlyDone(state: STATE): TypeParsingError {
        return new TypeParsingError(`Type declaration cannot end with STATE [${state}]`);
    }
    static cannotFollow(state: STATE, next_token: TokenType): TypeParsingError {
        return new TypeParsingError(`TOKEN [${next_token}] cannot follow STATE [${state}]`);
    }
}

function parseArrayTypeFrom_O_SQR_Node(node: AstNode, baseType: ValueType): ArrayType {
    if (node.type !== TokenType.O_SQR) {
        UNREACHABLE();
    }
    const bracket_node = node as AstBracketNode;
    let array_size: number = 0;
    if (bracket_node.middle) {
        if (bracket_node.middle.type !== TokenType.NUM_INT) {
            throwError(new TokenParserError(bracket_node.order.tok, `Expected constant expression inside Array size qualifier. Found: ${bracket_node.middle.order.tok}`))
        }
        array_size = parseInt(bracket_node.middle.order.tok.text);
        if (!Number.isFinite(array_size)) {
            throwError(new TokenParserError(bracket_node.middle.order.tok, `Expected Integer expression`));
        }
    }
    if (array_size === 0) {
        UNREACHABLE('array_size === 0 CANNOT BE');
    }

    return ArrayType.getArrayInstance(baseType, array_size);

}

class FunctionTypeBuilder extends ValueType {
    override toString: () => string = () => "FunctionTypeBuilder";
    override isSameType(type: ValueType): boolean {
        UNREACHABLE();
    }
    override get size(): number {
        return 0;
    }
    override from_literal(context: Context, literal: string, pos: DebugPosition): Value {
        UNREACHABLE();
    }


    private paramTypes: ValueType[] = [];

    private returnType?: ValueType;

    setReturnType(type: ValueType): FunctionTypeBuilder {
        this.returnType = type;
        return this;
    }

    addParamType(type: ValueType): FunctionTypeBuilder {
        this.paramTypes.push(type);
        return this;
    }

    build(): FunctionType {
        if (!this.returnType) {
            UNREACHABLE();
        }
        return FunctionType.getInstance(this.returnType, this.paramTypes);
    }
}
function* getIteratorFromNode(nodes: AstNode[]) {
    for (const node of nodes) {
        yield node;
    }
}

function parseWithStateMachine(context: Context, root: AstNode): { type: ValueType, name: string } {
    const nodes = collect_all_nodes_sorted_backwards(root);
    const nodeIterator = getIteratorFromNode(nodes);

    const { done, value: firstNode } = nodeIterator.next();

    if (done) {
        UNREACHABLE();
    }
    if (firstNode.type !== TokenType.DECL_TYPENAME) {
        UNREACHABLE();
    }
    const typeBase: ValueType = context.getTypeFromTypename(nodes[0]!.order.tok.text) ?? UNREACHABLE();

    let state: STATE = 'typename';
    let var_name: string | undefined;
    let var_type: ValueType = typeBase;
    while (true) {
        const r: StateMachineReturnType = stateMachine[state](var_type, nodeIterator, var_name);
        console.log('StateMachineReturnType', r);
        state = r.state;
        var_name = r.varName;
        var_type = r.valueType;
        if (state === 'end') {
            break;
        }
    }

    if (!var_name || !var_type) {
        UNREACHABLE();
    }

    return { type: var_type, name: var_name };
}

let stateMachine: StateMachineType = {
    'typename': (type: ValueType, nodeIter: Generator<AstNode, void, any>, varName: string | undefined) => {
        const { done, value: node } = nodeIter.next();
        if (done) {
            throwError(TypeParsingError.earlyDone('typename'))
        }
        if (node.type === TokenType.OP_DEREFERENCE) {
            return { state: 'ptr', valueType: PtrType.getInstance(type), varName };
        }
        if (node.type === TokenType.O_SQR) {
            return { state: 'o_sqr', valueType: parseArrayTypeFrom_O_SQR_Node(node, type), varName };
        }
        if (node.type === TokenType.O_PAREN) {
            const bracket_node = node as AstBracketNode;
            if (bracket_node.middle?.type === TokenType.OP_DEREFERENCE) {
                return { state: 'o_paren', valueType: new FunctionTypeBuilder().setReturnType(type), varName };
            }
            throwError(new TypeParsingError(`Expected PTR for function type inside braces`));
        }
        if (node.type === TokenType.NAME) {
            return { state: 'var_name', valueType: type, varName: node.order.tok.text };
        }
        throwError(TypeParsingError.cannotFollow('typename', node.type));
    },

    'ptr': (type: ValueType, nodeIter: Generator<AstNode, void, any>, varName: string | undefined) => {
        const { done, value: node } = nodeIter.next();
        if (done) {
            throwError(TypeParsingError.earlyDone('ptr'))
        }
        if (node.type === TokenType.OP_DEREFERENCE) {
            return { state: 'ptr', valueType: PtrType.getInstance(type), varName };
        }
        if (node.type === TokenType.O_SQR) {
            return { state: 'o_sqr', valueType: parseArrayTypeFrom_O_SQR_Node(node, type), varName };
        }
        if (node.type === TokenType.O_PAREN) {
            return { state: 'o_paren', valueType: type, varName };
        }
        if (node.type === TokenType.NAME) {
            return { state: 'var_name', valueType: type, varName: node.order.tok.text };
        }
        throwError(TypeParsingError.cannotFollow('ptr', node.type));
    },
    'o_sqr': (type: ValueType, nodeIter: Generator<AstNode, void, any>, varName: string | undefined) => {
        const { done, value: node } = nodeIter.next();
        if (done) {
            return { state: 'end', valueType: type, varName };
        }
        throwError(TypeParsingError.cannotFollow('o_sqr', node.type));
    },
    'o_paren': (type: ValueType, nodeIter: Generator<AstNode, void, any>, varName: string | undefined) => {
        const { done, value: node } = nodeIter.next();
        if (done) {
            throwError(TypeParsingError.earlyDone('o_paren'))
        }
        if (node.type === TokenType.O_PAREN) {
            return { state: 'o_paren_params', valueType: type, varName, };
        }
        throwError(TypeParsingError.cannotFollow('o_paren', node.type));
    },
    'o_paren_params': (type: ValueType, nodeIter: Generator<AstNode, void, any>, varName: string | undefined) => {
        const { done, value: node } = nodeIter.next();
        if (done) {
            throwError(TypeParsingError.earlyDone('o_paren_params'))
        }
        if (node.type === TokenType.NAME) {
            return { state: 'var_name', valueType: type, varName: node.order.tok.text };
        }
        throwError(TypeParsingError.cannotFollow('o_paren_params', node.type));
    },
    'var_name': (type: ValueType, nodeIter: Generator<AstNode, void, any>, varName: string | undefined) => {
        const { done, value: node } = nodeIter.next();
        if (done) {
            return { state: 'end', valueType: type, varName };
        }
        if (node.type === TokenType.O_SQR) {
            // console.log('node.type === TokenType.O_SQR', node);
            return { state: 'o_sqr', valueType: parseArrayTypeFrom_O_SQR_Node(node, type), varName };
        }
        throwError(TypeParsingError.cannotFollow('var_name', node.type));
    },
    'end': (type: ValueType, nodeIter: Generator<AstNode, void, any>, varName: string | undefined) => {
        return { state: 'end', valueType: type, varName }
    }
};


export function parse_declaration_from_ast_node(context: Context, root: AstNode): { type: ValueType, name: string } {
    return parseWithStateMachine(context, root);
    // const res = parse_type_from_ast_node(context, root);
    // if (!res.has_name) {
    //     throwError(new TokenParserError(root.order.tok, `Expected Name after type declaration`));
    // }
    // return { type: res.type, name: res.name };
}

function collect_all_nodes_sorted_backwards(root: AstNode): AstNode[] {
    const nodes: AstNode[] = [];
    const recurs = (node: AstNode | null) => {
        if (node === null) {
            return;
        }
        nodes.push(node);
        recurs(node.left);
        recurs(node.right);
    };
    recurs(root);
    nodes.sort((lhs, rhs) => lhs.order.pos < rhs.order.pos ? -1 : lhs.order.pos === rhs.order.pos ? 0 : 1);
    return nodes;
}
