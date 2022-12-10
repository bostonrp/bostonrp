
// IMPORTS

import { List } from "../modules/methods";
import terminal from "../modules/terminal";

// CODE

class Users {
    public static list = new List('Users');

    public static exists(id:number):boolean {
        terminal.debugDetailed('Users.exists();');
        let _player = mp.players.at(id);
        if(_player !== null) return true;
        return false;
    }
}

export class User {
    public dynamicID:number;
    public socialID:number;
    public username:string;
    public socialName?:string;
    public ip?:string;

    private _secret:string = 'none';
    private _isLoging:boolean = false;

    constructor(options:TBoston.Users.createOptions) {
        this.dynamicID = options.dynamicID;
        this.username = options.username;
        this.socialID = options.socialID;
        this.socialName = options.socialName;
        this.ip = options.ip;

        Users.list.add(this);
    }

    // SETTERS

    setLoging() {
        this._isLoging = true;
    }

    // GETTERS

    get isLoging() {
        return this._isLoging;
    }

    // OTHERS

    generateSecret() {
        // todo Нужно реализовать защитный секретный ключ
    }

    putInToVehicle(vehicle:VehicleMp, seat:number) {
        if(!Users.exists(this.dynamicID)) return;
        let _player = mp.players.at(this.dynamicID);
        _player.putIntoVehicle(vehicle, seat);
    }
}

export default Users;