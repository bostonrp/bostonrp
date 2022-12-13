
// IMPORTS

import VehiclesInfo from "@database/vehicles_info";
import enums from "@enums/server/vehicles/index";
import { List, RGB } from "../../modules/methods";
import terminal from "../../modules/terminal";
import Fuel from "./fuel";
import Mileage from "./mileage";

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

    constructor(modelName:string, position:Vector3, options?:TBoston.API.Vehicles.createOptions) {
        this._handle = mp.vehicles.new(mp.joaat(modelName), position);
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

    private _tickFuel() {
        let _fuelType = this.fuel.getType();

        if(_fuelType == 'none' || _fuelType == 'infinity') return;
        if(!this.getEngineStatus()) return;

        // todo Нужно придумать логику топлива
    }

    // SETTERS

    public setColor(primary:RGB, secondary:RGB = new RGB(252, 252, 252)) {
        let _primary = primary.get();
        let _secondary = secondary.get();
        this._handle.setColorRGB(_primary.r, _primary.g, _primary.b, _secondary.r, _secondary.g, _secondary.b);
    }

    public setAlpha(number:number = 255) {
        if(number < 0) return terminal.error(`[Vehicle] Автомобилю с ID ${this._id} не может быть назначена прозрачность менбше нуля`);
        // this._handle.alpha = number; // todo Нужно доделать функцию на клиенте меняющая альфу
    }

    public setEngineStatus(status:boolean) {
        this._handle.engine = status;
    }

    // GETTERS

    getEngineStatus() {
        return this._handle.engine;
    }

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

export default Vehicles;