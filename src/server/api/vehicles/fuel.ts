
// IMPORTS

import terminal from "modules/terminal";

// CODE

class Fuel {
    private _type:keyof TBoston.API.Vehicles.Fuel.types = 'none';

    private _bank:number = 0.000;
    private _maxBank:number = 0.000;

    constructor(options?:TBoston.API.Vehicles.Fuel.creationOptions) {
        this.setMaxBank(options?.maxBank);
        this.set(options?.bank);
        this.setType(options?.type);
    }

    // SETTERS

    public set(number:number = 1) {
        if(number > this._maxBank) return terminal.warning(`Нельзя установить топлива больше чем места в баке`);
        this._bank = number;
    }

    public setType(type?:keyof TBoston.API.Vehicles.Fuel.types) {
        this._type = type ? type : 'none';
    }

    public setMaxBank(float:number = 1) {
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
        if(number > this._maxBank) return terminal.warning(`Нельзя залить топлива больше чем места в баке`);
        let _oldBank = this._bank;
        let _newBank = (_oldBank + number).toFixed(3);
        this._bank = parseInt(_newBank);
    }

    public remove(number:number) {
        if(this._bank <= 0) return terminal.warning(`Невозможно удалить топливо из авто, так как оно на нуле`);
        let _oldBank = this._bank;
        let _newBank = (_oldBank - number).toFixed(3);
        this._bank = parseFloat(_newBank);
    }
}

export default Fuel;