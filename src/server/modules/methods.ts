
// IMPORTS

import terminal from "./terminal";

// CODE

export class RGB implements TBoston.Methods.RGB {
    private _r:number;
    private _g:number;
    private _b:number;
    private _a:number;

    constructor(r:number, g:number, b:number, a:number = 255) {
        this._r = r;
        this._g = g;
        this._b = b;
        this._a = a;
    }

    // SETTERS

    set(r:number, g:number, b:number, a:number = 255) {
        this._r = r;
        this._g = g;
        this._b = b;
        this._a = a;
    }

    // GETTERS

    get() {
        return { r: this._r, g: this._g, b: this._b, a: this._a };
    }

    // OTHERS
}

export class List {
    private static _list = new Array();

    private static _getByID(id:number) {
        return this._list.find(_element => _element.id == id);
    }

    private static _add(element:any) {
        if(this._getByID(element.id)) return;
        this._list.push(element);
    }

    private static _generateID(plus?:boolean):number {
        let _id = this._list.length;
        if(plus) _id++;

        if(!!this._getByID(_id)) return this._generateID(true);
        return _id;
    }

    private static _remove(id:number) {
        let _index = this._list.findIndex(_element => _element.id == id);
        this._list.splice(_index, 1);
    }

    //? CONSTRUCTOR
    private _list = new Array();
    private _listID:number;
    private _name:string;

    constructor(name:string) {
        this._name = name;
        this._listID = List._generateID();

        List._add(this);
    }

    // SETTERS

    // GETTERS

    getName() {
        return this._name;
    }

    getAll() {
        return this._list;
    }

    getByID(id:number):any {
        return this._list.find(_element => _element.id == id);
    }

    getIndex(id:number) {
        return this._list.findIndex(_element => _element.id == id);
    }

    get id() {
        return this._listID;
    }

    get name() {
        return this._name;
    }

    get length() {
        return this._list.length;
    }

    // OTHERS

    deleteList() {
        List._remove(this._listID);
    }

    has(id:number) {
        return !!this.getByID(id);
    }

    add(element:any):boolean {
        if(this.has(element.id)) return false;

        try {
            this._list.push(element);
            return true;
        } catch(e) {
            terminal.log(e);
            return false;
        }
    }

    remove(id:number) {
        if(!this.has(id)) return false;

        try {
            let _index = this.getIndex(id);
            this._list.splice(_index, 1);
            return true;
        } catch(e) {
            terminal.log(e);
            return false;
        }
    }
}

class Methods {
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