
// IMPORTS

// CODE

class Fuel {
    private _type:string = 'none';

    private _bank:number = 0.000;
    private _maxBank:number = 0.000;

    constructor(options?:TBoston.API.Vehicles.Fuel.creationOptions) {
        this.setMaxBank(options?.maxBank);
        this.setType(options?.type);
    }

    // SETTERS

    public set(number:number) {
        if(number > this._maxBank) return; // todo Нужно обработать ошибку
        this._bank = number;
    }

    public setType(type?:keyof TBoston.API.Vehicles.Fuel.types) {
        this._type = type ? type : 'none';
    }

    public setMaxBank(float:number = 0) {
        this._maxBank = float;
    }

    // GETTERS

    public get() {
        return this._bank;
    }

    public getMaxBank() {
        return this._maxBank;
    } 

    public getType() {
        return this._type;
    }

    // OTHERS

    public add(number:number) {
        if(number > this._maxBank) return; // todo Нужно обработать ошибку
        let _oldBank = this._bank;
        let _newBank = (_oldBank + number).toFixed(3);
        this._bank = parseInt(_newBank);
    }

    public remove(number:number) {
        if(this._bank <= 0) return; // todo Нужно обработать ошибку
        let _oldBank = this._bank;
        let _newBank = (_oldBank - number).toFixed(3);
        this._bank = parseFloat(_newBank);
    }
}

export default Fuel;