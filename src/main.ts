import * as fs from "fs";
import { throwError } from "./helper";

import { AsmGenerator } from "./asm_main"

const main = () => {
    const main_c = process.argv.slice(2)[0] ?? throwError(new Error('No input file provided'));
    const out_asm = process.argv.slice(3)[0] ?? throwError(new Error('No output file provided'));
    let programText;
    try {
        programText = fs.readFileSync(main_c).toString();
    }
    catch (err) {
        throwError(`No correct input filepath provided. Provided - ${main_c}`);
    }

    const asmGenerator = new AsmGenerator();
    fs.writeFileSync(out_asm, asmGenerator.parseProgram(programText));
};


try {
    main();
} catch (err: any) {
    console.error(err);
}

