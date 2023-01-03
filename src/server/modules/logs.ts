// IMPORTS

import * as fs from "fs";
import methods from "./methods";
import Methods from "./methods";
import terminal from "./terminal";

// CODE

class Log {

}

export class LogFile {
    public static list = new Array();

    public static createDirectory() {
        if(fs.existsSync('logs')) return false;
        fs.mkdir('logs', (err:any) => { terminal.debugDetailed(err == null ? `[Logs] Директория logs успешно создана` : err) });
        return true;
    }

    // CONSTRUCTOR
    public path:string;

    constructor(public name:string) {
        this.path = `logs/${this.name}.log`;

        if(!fs.existsSync(`logs/${this.name}.log`)) {
            fs.appendFile(`logs/${this.name}.log`, '', (err:any) => { terminal.debugDetailed(err == null ? `[Logs] ${this.name}.log создан` : err); });
        }

        LogFile.list.push(this);
    }

    public write(text:string) {
        let file = fs.createWriteStream(this.path, {
            flags: 'a'
        });

        file.write(`${methods.getRealDate()} | ${Methods.getRealTime()} | ${text}\n`);
    }
}

LogFile.createDirectory();

export default Log;