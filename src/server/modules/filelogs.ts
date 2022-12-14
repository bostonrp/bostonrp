// IMPORTS

import fs from "fs";
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
        fs.mkdir('logs', (err) => { terminal.debugDetailed(err == null ? `[Logs] Директория logs успешно создана` : err) });
        return true;
    }

    // CONSTRUCTOR
    public name:string;
    public path:string;

    constructor(fileName:string) {
        this.name = fileName;
        this.path = `logs/${fileName}.log`;

        if(!fs.existsSync(`logs/${fileName}.log`)) {
            fs.appendFile(`logs/${fileName}.log`, '', (err) => { terminal.debugDetailed(err == null ? `[Logs] ${fileName}.log создан` : err); });
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