"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Value = exports.temp_t = void 0;
const helper_1 = require("./helper");
const value_type_1 = require("./value_types/value_type");
var temp_t;
(function (temp_t) {
    temp_t[temp_t["t"] = 0] = "t";
})(temp_t || (exports.temp_t = temp_t = {}));
;
class Value {
    valueType;
    pos;
    addr_type;
    _address = null;
    name;
    constructor(name, valueType, pos, address = null, addr_type) {
        this.valueType = valueType;
        this.pos = pos;
        this.addr_type = addr_type;
        this._address = address;
        if (name === '_temp') {
            (0, helper_1.UNREACHABLE)('temp');
        }
        this.name = typeof name === 'string' ? name : helper_1.TEMP_NAME;
    }
    toString = () => {
        return `Value {\n\r\tName: [${this.name}]\n\r\tType: [${this.valueType.toString()}]\n\r\tAddress: ${this.real_addr}(%rsp)\n\r\taddr_type: ${value_type_1.AddrType[this.addr_type]}\n\r}\n`;
    };
    stack_addr(context) {
        if (this.addr_type === value_type_1.AddrType.Indirect) {
            context.addAssembly(`
                \rmovq ${this._address}(%rsp), %rax
                \rmovl (%rax), %${value_type_1.REG_I[this.valueType.reg_i]}
                \rmovl %${value_type_1.REG_I[this.valueType.reg_i]}, ${context.pushStack(this.valueType.size)}(%rsp)
            `);
            return context.stackPtr;
        }
        else {
            return this.real_addr;
        }
    }
    get real_addr() {
        return this._address ?? (0, helper_1.throwError)(new Error('Accessed before assigned'));
    }
}
exports.Value = Value;
