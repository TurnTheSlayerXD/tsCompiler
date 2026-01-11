import { DebugPosError, throwError, UNREACHABLE } from "./helper";
import { Lexer } from "./lexer";
import { GlobalScope, Scope, TypeofScope } from "./scope";
import { NamedValue, Value } from "./value";
import { CharType } from "./value_types/char_type";
import { IntType } from "./value_types/int_type";
import { ValueType } from "./value_types/value_type";
import { VoidType } from "./value_types/void_type";
import { StructType } from "./value_types/struct_type";
import { Instruction, MarkToJump, PopScopeInstr, PushScopeInstr, ScopeEndInstr, ScopeStartInstr } from "./instruction/instruction";
import { StackLoc } from "./instruction/mem_location";
import { FunctionType } from "./value_types/function_type";

export class Context {

    BUILT_IN_TYPES = {
        int: IntType.constructor,
        char: CharType.constructor,
    };
    custom_types: StructType[] = [];

    private literals: string[] = [];

    _initialGlobalScope: GlobalScope;
    _currentScope: Scope;

    public currentFunction: NamedValue | null;

    constructor() {
        this._initialGlobalScope = new GlobalScope();
        this._currentScope = this._initialGlobalScope;
        this.currentFunction = null;
    }

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

    pushScope(typeofScope: TypeofScope, { withPushInstr }: { withPushInstr: boolean } = { withPushInstr: true }): Scope {
        const newScope = new Scope(
            this._currentScope,
            this._currentScope.childScopes.at(-1) ?? null,
            typeofScope,
        );

        this._currentScope.childScopes.push(newScope);

        this._currentScope.addInstruction(new ScopeStartInstr(newScope));
        this._currentScope = newScope;

        if (withPushInstr) {
            newScope.addInstruction(new PushScopeInstr(newScope));
        }

        return newScope;
    }

    popScope({ withPopInstr }: { withPopInstr: boolean } = { withPopInstr: true }): Scope {
        const prevScope = this._currentScope;
        if (withPopInstr) {
            prevScope.addInstruction(new PopScopeInstr(prevScope));

        }
        this._currentScope = prevScope?.parentScope ?? throwError(`Cannot pop global scope!`);
        this._currentScope.addInstruction(new ScopeEndInstr(prevScope));
        return prevScope;
    }

    getCurrentScope(): Scope {
        return this._currentScope;
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
    addInstructionList(instructions: Instruction[]): void {
        for (const i of instructions) {
            this.getCurrentScope().addInstruction(i);
        }
    }

    addNewVarValue(val: NamedValue): void {
        const currentScope = this.getCurrentScope();
        const doesAlreadyExist = currentScope.localVarValues.some(t => val.name === t.name);
        if (doesAlreadyExist) {
            throwError(new DebugPosError(val.pos, `Value with name (${val.name}) already exists in scope`));
        }
        currentScope.addNewVarValue(val);
    }

    getVarValue(varName: string): NamedValue {
        return this.getCurrentScope().getVarValueOrThrow(varName);
    }

    getNewMemLocation(valueType: ValueType): StackLoc {
        return this.getCurrentScope().getNewMemLocation(valueType);
    }

    getNewMemLocationFromOffset(offset: number): StackLoc {
        return this.getCurrentScope().getNewMemLocationFromOffset(offset);

    }

    getNewMarkToJump(): MarkToJump {
        return this.getCurrentScope().getNewMarkToJump();
    }

    isTypenameDefined(typename: string): boolean {
        return !!this.getTypeFromTypename(typename);
    }

    interpretInstructions(): string[] {
        if (this._initialGlobalScope !== this._currentScope) {
            UNREACHABLE();
        }
        return this._currentScope.interpretInstructions();
    }
}


