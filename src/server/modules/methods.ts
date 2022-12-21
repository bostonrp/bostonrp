
// IMPORTS

import terminal from "./terminal";
import * as crypto from 'crypto';

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

    public set(r:number, g:number, b:number, a:number = 255) {
        this._r = r;
        this._g = g;
        this._b = b;
        this._a = a;
    }

    // GETTERS

    public get() {
        return { r: this._r, g: this._g, b: this._b, a: this._a };
    }

    public getArray() {
        return [ this._r, this._g, this._b ];
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
    private _name?:string;

    constructor(name?:string) {
        this._name = name;
        this._listID = List._generateID();

        List._add(this);
    }

    // SETTERS

    // GETTERS

    public getName() {
        return this._name;
    }

    public getAll() {
        return this._list;
    }

    public getByID(id:number):any {
        return this._list.find(_element => _element.id == id);
    }

    public getIndexByID(id:number) {
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

    public deleteList() {
        List._remove(this._listID);
    }

    public hasByID(id:number) {
        return !!this.getByID(id);
    }

    public add(element:any):boolean {
        if(this.hasByID(element.id)) return false;

        try {
            this._list.push(element);
            return true;
        } catch(e) {
            terminal.log(e);
            return false;
        }
    }

    public removeByID(id:number) {
        if(!this.hasByID(id)) return false;

        try {
            let _index = this.getIndexByID(id);
            this._list.splice(_index, 1);
            return true;
        } catch(e) {
            terminal.log(e);
            return false;
        }
    }

    public generateID():any {
        let _id = this._list.length + 1;
        if(!this.getByID(_id)) {
            return _id;
        }

        return this.generateID();
    }
}

class Methods {
    public getRealTimeToSec() {
        let _date = new Date();
        return `${this.digitFormat(_date.getHours())}:${this.digitFormat(_date.getMinutes())}:${this.digitFormat(_date.getSeconds())}`;
    }

    public randomInt(min:number, max:number) {
        return parseInt((Math.random() * (max - min) + min).toFixed(0));
    }

    public async sleep(ms:number) {
        return new Promise(res => setTimeout(res, ms));
    }

    public digitFormat(number:number) {
        return ("0" + number).slice(-2);
    }

    public getPerfomance(callback:Function) {
        try {
            let startTime = Date.now();
            callback();
            let endTime = Date.now();
            return endTime - startTime;
        } catch(e) {
            return terminal.error(e);
        }
    }

    public createCryptoHash(text:any, algorithm:keyof TBoston.Methods.crypto) {
        return crypto.createHash(algorithm).update(`${text}`).digest('hex');
    }

    public getRealTime() {
        let date = new Date();
        return `${this.digitFormat(date.getHours())}:${this.digitFormat(date.getMinutes())}`;
    }

    public getRealDate() {
        let date = new Date();
        return `${this.digitFormat(date.getDate())}/${this.digitFormat(date.getMonth() + 1)}`;
    }

    public generatedCode(length:number) {
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';

        for(let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        return result;
    }
}

const methods = new Methods();
export default methods;