
// IMPORTS

import '@shared/configs/server.json';

// CODE

class Browsers {
    public static list = new Array();
}

export class Browser {
    private _name:string;
    private _handle:BrowserMp;

    constructor(name:string, path:string, options?:TBoston.Browsers.options) {
        this._handle = mp.browsers.new(path);

        this._name = name;
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
}

let browser = new Browser('default', 'http://26.96.119.45:8080/', {
    active: true
});

export default Browsers;