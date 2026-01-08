import { filterIndexes, findIndex, LexerError, ParserError, RulesError, throwError, TODO, TokenParserError, toReversed, UNREACHABLE } from "./helper";
import { Lexer } from "./lexer";
import * as fs from 'fs';
import { Scope, TypeofScope } from "./scope";
import { NamedValue, Value } from "./value";
import { CharType } from "./value_types/char_type";
import { FunctionType } from "./value_types/function_type";
import { IntType } from "./value_types/int_type";
import { PtrType } from "./value_types/ptr_type";
import { ValueType } from "./value_types/value_type";
import { VoidType } from "./value_types/void_type";
import { StructType } from "./value_types/struct_type";
import { SCANF_DECL } from "./imp_scanf";
import { Instruction, MarkToJump } from "./instruction/instruction";
import { StackLoc } from "./instruction/mem_location";

export class Context {

    BUILT_IN_TYPES = {
        int: IntType.constructor,
        char: CharType.constructor,
    };
    custom_types: StructType[] = [];

    private literals: string[] = [];

    scopes: Scope[] = [];

    constructor(public lexer: Lexer) { }

    getTypeFromTypename(typename: string): ValueType | null {
        switch (typename) {
            case 'int': return IntType.getInstance();
            case 'char': return CharType.getInstance();
            case 'void': return VoidType.getInstance();
            default: {
                let struct_type;
                if (struct_type = this.custom_types.find(v => v.struct_name === typename)) {
                    return struct_type ?? null;
                }
                return null;
            }
        }
    }

    pushScope(typeofScope: TypeofScope) {

    }

    popScope(): Scope {

    }

    getCurrentScope(): Scope {
        return this.scopes.at(-1) ?? UNREACHABLE();
    }

    addGlobalStructType(type: StructType) {
        if (this.custom_types.find(t => t.struct_name === type.struct_name)) {
            throwError(new Error(`Redefinition of type that already exists\nType: ${type}`));
        }
        this.custom_types.push(type);
    }

    addStringLiteral(literal: string): string {
        if (!this.literals.includes(literal)) {
            this.literals.push(literal);
        }
        return `"_${this.literals.indexOf(literal)}_literal"`;
    }

    addInstruction(instruction: Instruction): void {
        this.getCurrentScope().addInstruction(instruction);
    }

    addNewVarValue(val: NamedValue): void {
        this.getCurrentScope().addNewVarValue(val);
    }

    getNewMemLocation(valueType: ValueType): StackLoc {
        return this.getCurrentScope().getNewMemLocation(valueType);
    }

    getNewMarkToJump(): MarkToJump {
        return this.getCurrentScope().getNewMarkToJump();
    }

}


