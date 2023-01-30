
// IMPORTS

import VehiclesInfo from "../../modules/database/models/vehicles_info";
import enums from "../../../shared/enums/server/vehicles/index";
import methods, { List, RGB } from "../../modules/methods";
import terminal from "../../modules/terminal";
import Users from "../users/index";
import Fuel from "./fuel";
import Mileage from "./mileage";

// CODE

class Vehicles {
    public static list = new List('Vehicles');
    public static infos = new Map();

    public static getByID(id:number):Vehicle {
        return this.list.getByID(id);
    }

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

    private _driverID:number = -1;

    constructor(modelName:string, position:Vector3, options?:TBoston.API.Vehicles.createOptions) {
        this._handle = mp.vehicles.new(mp.joaat(modelName), position);
        this._id = Vehicles.generateID();

        this._mileage = new Mileage({
            mileage: options?.mileage
        });

        this._fuel = new Fuel({
            type: options?.fuelType,
            bank: options?.fuel,
            maxBank: options?.fuelMax
        });

        this._handle.setVariable('server.id', this._id);

        this._createEvents();
        Vehicles.list.add(this);
        
        this._tickFuel();
    }

    //? Логика топлива
    private async _tickFuel() {
        await methods.sleep(1000);

        if(this._fuel.get() <= 0) return;
        if(this._fuel.getType() == 'infinity') return;
        let _fuelType = this.fuel.getType();

        try {
            if(_fuelType != 'none' && this._driverID != -1) {
                let _coefficient = enums.fuel.coefficient[`${_fuelType}`];
                let _player = this._handle.getOccupant(enums.seatNumbers.driver);
    
                if(_player && Users.exists(_player.id)) {
                    let _speed = await _player.callProc('client.vehicle:speed:get');
                    if(_speed != null) _coefficient += 0.001 * _speed;
                }

                if(_fuelType == 'electro') _coefficient = enums.fuel.coefficient.electro;
    
                this._fuel.remove(_coefficient);
                // terminal.log(`${_coefficient} / ${this._fuel.get()}`);
            } else {
                let _coefficient = enums.fuel.coefficient[`${_fuelType}`];
                this._fuel.remove(_coefficient);
            }
        } catch(e) {
            let _coefficient = enums.fuel.coefficient[`${_fuelType}`];
            this._fuel.remove(_coefficient);

            terminal.error(e);
        }

        this._tickFuel();
    }

    // SETTERS

    public setNumberPlateText(text:string) {
        this._handle.numberPlate = text;
    }

    public setNumberPlateType(type:number) {
        this._handle.numberPlateType = type;
    }

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

    public getEngineStatus() {
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

    public getDriverID() {
        return this._driverID;
    }

    // OTHERS

    public repair() {
        this._handle.repair();
    }

    public delete() {
        Vehicles.list.removeByID(this._id);
        this._handle.destroy();
    }

    private _createEvents() {
        mp.events.add('playerEnterVehicle', (player, vehicle) => {
            if(vehicle === this._handle) {
                let _user = Users.getByDynamicID(player.id);
                if(_user) this._driverID = player.id;
                else this._driverID = -1;
            }
        });

        mp.events.add('playerExitVehicle', (player, vehicle) => {
            if(vehicle === this._handle) {
                this._driverID = -1;
            }
        });
    }
}

export default Vehicles;