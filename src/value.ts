import { Context } from "./context";
import { TEMP_NAME, throwError, UNREACHABLE } from "./helper";
import { Position } from "./lexer";
import { AddrType, REG_I, ValueType } from "./value_types";


export enum temp_t { t };
type var_name = string | temp_t;

export class Value {
    public _address: number | null = null;
    public name: string;
    constructor(name: var_name, public valueType: ValueType, public pos: Position, address: number | null = null, public addr_type: AddrType) {
        this._address = address;
        if (name === '_temp') {
            UNREACHABLE('temp');
        }
        this.name = typeof name === 'string' ? name : TEMP_NAME;
    }

    public toString = (): string => {
        return `Value {\n\rName: [${this.name}]\n\rType: [${this.valueType.toString()}]\n\rAddress: ${this.real_addr}(%rsp)\n\raddr_type: ${AddrType[this.addr_type]}\n\r}`
    }
    stack_addr(context: Context): number {
        if (this.addr_type === AddrType.Indirect) {
            context.addAssembly(`
                \rmovq ${this._address}(%rsp), %rax
                \rmovl (%rax), %${REG_I[this.valueType.reg_i]}
                \rmovl %${REG_I[this.valueType.reg_i]}, ${context.pushStack(this.valueType.size)}(%rsp)
            `);
            return context.stackPtr;
        } else {
            return this.real_addr;
        }
    }



    get real_addr(): number {
        return this._address ?? throwError(new Error('Accessed before assigned'));
    }
}
