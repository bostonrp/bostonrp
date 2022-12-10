
// IMPORTS

import VehiclesInfo from "@database/vehicles_info";
import enums from "@enums/server/vehicles/index";
import { List } from "../modules/methods";
import terminal from "../modules/terminal";

// CODE

class Vehicles {
    public static list = new List('Vehicles');
    public static infos = new Map();

    public static async loadInfos() {
        terminal.debugDetailed('Vehicles.loadInfos();');

        try {
            let _infos = await VehiclesInfo.methods?.findAll();
            _infos?.forEach((element:any) => {
                this.infos.set(element.id, element);
            });
        } catch(e) { terminal.error(e); }
    }

    public static generateID(plus?:boolean):number {
        terminal.debugDetailed('Vehicles.generateID();');
        let _id = this.list.length;
        if(plus) _id++;

        if(this.list.hasByID(_id)) return this.generateID(true);
        return _id;
    }

    // todo Нужно переделать
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

    private _mileage:Mileage;
    private _fuel:Fuel;

    constructor(modelName:string, position:Vector3, options?:TBoston.Vehicles.createOptions) {
        this._handle = mp.vehicles.new(mp.joaat(modelName), position, {
            color: [[252, 252, 252], [252, 252, 252]]
        });
        this._id = Vehicles.generateID();

        this._mileage = new Mileage({
            mileage: options?.mileage
        });

        this._fuel = new Fuel({
            type: options?.fuelType,
            maxBank: options?.fuelMax
        });

        this._handle.setVariable('server.id', this._id);

        Vehicles.list.add(this);
    }

    // todo Нужно придумать логику топлива
    private _tickFuel() {
        
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

    get position() {
        return this._handle.position;
    }

    // OTHERS
}

class Fuel {
    private _type:string = 'none';

    private _bank:number = 0.000;
    private _maxBank:number = 0.000;

    constructor(options?:TBoston.Vehicles.Fuel.creationOptions) {
        this.setMaxBank(options?.maxBank);
        this.setType(options?.type);
    }

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

    getType() {
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

class Mileage {
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

    public getWithKM() {
        return parseInt((this.get() / 1000).toFixed(0));
    }

    public getWithMPH() {
        return parseInt((this.getWithKM() * 0.62137).toFixed(0));
    }

    // OTHERS

    public add(float:number) {
        let _oldMileage = this._count;
        this._count = _oldMileage + float;

        console.log(`KM: ${this.getWithKM()}`, " | ", `MPH: ${this.getWithMPH()}`);
    }

    public remove(float:number) {
        if(this._count <= 0) return; // todo Нужно обработать ошибку
        let _oldMileage = this._count;
        this._count = _oldMileage - float;
    }
}

export default Vehicles;