
// IMPORTS

import methods, { List } from "../modules/methods";
import terminal from "../modules/terminal";

// CODE

class Users {
    public static list = new List('Users');

    public static getByID(id:number):User {
        return this.list.getByID(id);
    }

    public static getSecretExists(secret:string) {
        let _result = this.list.getAll().find((_player:User) => _player.secret == secret);

        if(_result != undefined) return true;
        return false;
    }

    // todo Возможно не будет использоваться
    public static exists(id:number):boolean {
        let _player = mp.players.at(id);
        if(_player !== null) return true;
        return false;
    }
}

export class User {
    public dynamicID:number;
    public staticID:number|null = null;
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

    public setLoging() {
        this._isLoging = true;
    }

    // GETTERS

    public getName() {
        return this.username;
    }

    public isLoging() {
        return this._isLoging;
    }

    get secret() {
        return this._secret;
    }

    get id() {
        return this.dynamicID;
    }

    // OTHERS

    public quit() {
        Users.list.removeByID(this.dynamicID);
    }

    private _generateSecret() {
        return methods.createCryptoHash(`BostonRolePlay`, 'sha256') + methods.createCryptoHash(methods.createCryptoHash(methods.generatedCode(26), 'sha256'), 'md5');
    }

    public generateSecret() {
        let _secret = this._generateSecret();

        if(!Users.getSecretExists(_secret)) {
            let _player = mp.players.at(this.dynamicID);
            this._secret = _secret;
            return _player.call('client.user:secret:update', [this._secret]); // todo нужно реализовать
        }

        this.generateSecret();
    }

    public putInToVehicle(vehicle:VehicleMp, seat:number) {
        if(!Users.exists(this.dynamicID)) return;
        let _player = mp.players.at(this.dynamicID);
        _player.putIntoVehicle(vehicle, seat);
    }
}

export default Users;