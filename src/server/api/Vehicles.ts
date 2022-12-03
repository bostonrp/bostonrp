
// IMPORTS

// CODE

class Vehicles {
    public static list = new Map();
}

export class Vehicle {
    private _handle:VehicleMp;

    constructor(modelName:string, position:Vector3, options?:TBoston.Vehicles.createOptions) {
        this._handle = mp.vehicles.new(mp.joaat(modelName), position);
    }

    // SETTERS

    // todo Нужно доделать функцию на клиенте меняющая альфу
    public setAlpha(number:number = 255) {
        if(number < 0) return;
        // this._handle.alpha = number;
    }


    // GETTERS

    get handle() {
        return this._handle;
    }

    // OTHERS
}

new Vehicle('oracle', new mp.Vector3(12, 12, 71));

export default Vehicles;