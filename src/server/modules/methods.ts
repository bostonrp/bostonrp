
// IMPORTS

// CODE

export class RGB {
    private _r:number = 0;
    private _g:number = 0;
    private _b:number = 0;
    private _a:number = 255;

    constructor(r:number, g:number, b:number, a:number = 255) {
        this._r = r;
        this._b = b;
        this._g = g;
        this._a = a;
    }

    // SETTERS

    set(r:number, g:number, b:number, a:number = 255) {
        this._r = r;
        this._b = b;
        this._g = g;
        this._a = a;
    }

    // GETTERS

    get() {
        return { r: this._r, g: this._g, b: this._b, a: this._a }
    }

    // OTHERS
}

class Methods implements TBoston.Methods.Root {
    getRealTimeToSec() {
        let _date = new Date();
        return `${this.digitFormat(_date.getHours())}:${this.digitFormat(_date.getMinutes())}:${this.digitFormat(_date.getSeconds())}`;
    }

    async sleep(ms:number) {
        return new Promise(res => setTimeout(res, ms));
    }

    digitFormat(number:number) {
        return ("0" + number).slice(-2);
    }
}

const methods = new Methods();

export default methods;