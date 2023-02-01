
// IMPORTS

import Users from "./index";

// CODE

class Economy {
    private _cash:number = 0;
    private _max_cash:number = 1;

    constructor(options:TBoston.Users.Economy.createOptions) {
        this._cash = options.cash;
        this._max_cash = options.max_cash;
    }

    //? SETTERS

    public set(number:number) {
        if(this._cash > this._max_cash) return; // todo Обработать ошибку
        this._cash = number;
    }

    public setMax(number:number) {
        this._max_cash = number;
    }

    //? GETTERS

    public get() {
        return this._cash;
    }

    public getMax() {
        return this._max_cash;
    }

    //? OTHERS

    public add(number:number) {
        if(number > this._max_cash) return;
        this._cash += number;
    }

    public remove(number:number) {
        if(this._cash < number) return;
        this._cash -= number;
    }

    public sendPaymentToUser(dynamicID:number, count:number) {
        let _targetUser = Users.getByDynamicID(dynamicID);
        if(this._cash < count) return;
        _targetUser.economy.add(count);
    }
}

export default Economy;