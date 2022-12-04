
// IMPORTS

import methods from "../modules/methods";
import terminal from "../modules/terminal";

// CODE

class Vehicles {
    public static list = new Array();

    public static addInList(vehicle:Vehicle) {
        terminal.debugDetailed('Vehicles.addInList();');
        if(this.hasInListByID(vehicle.id)) return terminal.error(`[Vehicle] Нельзя создать автомобиль с одинаковым ID`, vehicle.id);
        this.list.push(vehicle);
    }

    private static getIndexInListByID(id:number) {
        terminal.debugDetailed('Vehicles.getIndexInListByID();');
        return this.list.findIndex((element:Vehicle) => element.id == id);
    }

    public static getInListByID(id:number) {
        terminal.debugDetailed('Vehicles.getInListByID();');
        return this.list.find((element:Vehicle) => element.id == id);
    }

    public static hasInListByID(id:number) {
        terminal.debugDetailed('Vehicles.hasInListByID();');
        return !!this.getInListByID(id);
    }

    public static generateID(plus?:boolean):number {
        terminal.debugDetailed('Vehicles.generateID();');
        let _id = this.list.length;
        if(plus) _id++;

        if(this.hasInListByID(_id)) return this.generateID(true);
        return _id;
    }

    public static delete(id:number):boolean {
        terminal.debugDetailed('Vehicles.delete();');

        let _vehicle = this.getInListByID(id);
        if(_vehicle !== undefined) {
            let index = this.getIndexInListByID(id);
            this.list.splice(index, 1);
            return true;
        }

        terminal.error(`[Vehicles] Ошибка при удалении автомобиля`, id);
        return false;
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
    }

    // SETTERS

    // todo Нужно доделать функцию на клиенте меняющая альфу
    public setAlpha(number:number = 255) {
        if(number < 0) return; // todo Нужно обработать ошибку
        // this._handle.alpha = number;
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

        this._tick();
    }

    private async _tick() {
        await methods.sleep(1000);
        if(this._type == 'admin') return; // todo Нужно обработать ошибку

        this.remove(0.001);
        terminal.log(this.get());

        this._tick();
    }

    // SETTERS

    public set(number:number) {
        if(number > this._maxBank) return; // todo Нужно обработать ошибку
        this._bank = number;
    }

    public setType<K extends keyof TBoston.Vehicles.Fuel.types>(type?:K) {
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