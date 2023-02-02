
// IMPORTS

import rpc from "@aspidemon/rage-rpc";

// CODE

class Browsers {
    public static list = new Array();
}

export class Browser {
    private _handle:BrowserMp;

    constructor(private _name: string, path:string, options?:TBoston.Browsers.options) {
        this._handle = mp.browsers.new(path);
        this.setActive(options?.active);
    }

    // GETTERS

    get handle():BrowserMp {
        return this._handle;
    }

    get name():string {
        return this._name;
    }

    get path():string {
        return this._handle.url;
    }

    // SETTERS

    public setActive(status:boolean = false) {
        this._handle.active = status;
    }

    // OTHERS

    call(eventName:string, ...args:any[]) {
        this._handle.execute(`rpc.emit('${eventName}', ${JSON.stringify(args)})`);
    }
}

export let mainBrowser = new Browser('default', 'http://localhost:8080/');
mainBrowser.setActive(true);

rpc.on('client.browser:main:emit', (eventName:string, ...args:any[]) => {
    mainBrowser.call(eventName, ...args);
});

export default Browsers;