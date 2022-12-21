
// IMPORTS

// CODE

class Mileage {
    private _count = 0.0;

    constructor(options?:TBoston.API.Vehicles.Mileage.creationOptions) {
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
        // console.log(`KM: ${this.getWithKM()}`, " | ", `MPH: ${this.getWithMPH()}`);
    }

    public remove(float:number) {
        if(this._count <= 0) return; // todo Нужно обработать ошибку
        let _oldMileage = this._count;
        this._count = _oldMileage - float;
    }
}

export default Mileage;