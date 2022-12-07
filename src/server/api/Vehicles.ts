
// IMPORTS

import enums from "@enums/server/vehicles/index";
import methods, { List } from "../modules/methods";
import terminal from "../modules/terminal";

// CODE

class Vehicles {
    private static _list = new List('Vehicles');

    public static getInListByID(id:number):Vehicle {
        terminal.debugDetailed('Vehicles.getInListByID();');
        return this._list.getByID(id);
    }

    public static addInList(user:Vehicle):boolean {
        terminal.debugDetailed('Vehicles.addInList();');
        return this._list.add(user);
    }

    public static hasInListByID(id:number) {
        terminal.debugDetailed('Vehicles.hasInListByID();');
        return this._list.hasByID(id);
    }

    public static removeInListByID(id:number) {
        terminal.debugDetailed('Vehicles.removeInListByID();');
        return this._list.removeByID(id);
    }

    public static generateID(plus?:boolean):number {
        terminal.debugDetailed('Vehicles.generateID();');
        let _id = this._list.length;
        if(plus) _id++;

        if(this.hasInListByID(_id)) return this.generateID(true);
        return _id;
    }

    public static exists(id:number):boolean {
        terminal.debugDetailed('Vehicles.exists();');
        let _vehicle = mp.vehicles.at(id);
        if(_vehicle !== null) return true;
        return false;
    }
}

export class Vehicle {
    private _handle:VehicleMp;
    private _id:number;

    private _mileage:Mileage
    private _fuel:Fuel

    constructor(modelName:string, position:Vector3, options?:TBoston.Vehicles.createOptions) {
        this._handle = mp.vehicles.new(mp.joaat(modelName), position);
        this._id = Vehicles.generateID();

        this._mileage = new Mileage({
            mileage: options?.mileage
        });

        this._fuel = new Fuel({
            type: options?.fuelType,
            maxBank: options?.fuelMax
        });

        this._tickMileage();
    }

    // todo Нужно придумать логику пробега и топлива
    private async _tickMileage() {
        await methods.sleep(1000);
        
        this._handle.engine = true;
        this._tickMileage();
    }

    // SETTERS

    public setAlpha(number:number = 255) {
        if(number < 0) return terminal.error(`[Vehicle] Автомобилю с ID ${this._id} не может быть назначена прозрачность менбше нуля`);
        // this._handle.alpha = number; // todo Нужно доделать функцию на клиенте меняющая альфу
    }

    public setEngineStatus(status:boolean) {
        this._handle.engine = status;
    }

    // SETTERS

    // GETTERS

    get handle():VehicleMp {
        return this._handle;
    }

    get id() {
        return this._id;
    }

    get mileage() {
        return this._mileage;
    }

    get fuel() {
        return this._fuel;
    }

    // OTHERS
}

export class Fuel {
    private _type:string = 'none';

    private _bank:number = 0.000;
    private _maxBank:number = 0.000;

    constructor(options?:TBoston.Vehicles.Fuel.creationOptions) {
        this.setMaxBank(options?.maxBank);
        this.setType(options?.type);

        // this._tick();
    }

    // private async _tick() {
    //     await methods.sleep(1000);
    //     if(this._type == 'admin') return; // todo Нужно обработать ошибку

    //     // todo Нужно придумать логику топлива
    //     this.remove(0.001);
    //     // terminal.log(this.get());

    //     this._tick();
    // }

    // SETTERS

    public set(number:number) {
        if(number > this._maxBank) return; // todo Нужно обработать ошибку
        this._bank = number;
    }

    public setType(type?:keyof TBoston.Vehicles.Fuel.types) {
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

export class Mileage {
    private _count = 0.0;

    constructor(options?:TBoston.Vehicles.Mileage.creationOptions) {
        this.set(options?.mileage);
    }

    // SETTERS

    public set(float:number = 0.0) {
        this._count = float;
    }

    // GETTERS

    public get() {
        return this._count;
    }

    // OTHERS

    public add(float:number) {
        let _oldMileage = this._count;
        this._count = _oldMileage + float;
    }

    public remove(float:number) {
        if(this._count <= 0) return; // todo Нужно обработать ошибку
        let _oldMileage = this._count;
        this._count = _oldMileage - float;
    }
}

let veh = new Vehicle('oracle', new mp.Vector3(12, 12, 71));
veh.fuel.setMaxBank(45);
veh.fuel.add(45);

mp.events.addCommand('veh', (player, _, model) => {
    let veh = new Vehicle(model, player.position);
    player.putIntoVehicle(veh.handle, 0);
});

export default Vehicles;