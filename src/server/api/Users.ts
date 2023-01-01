
// IMPORTS

import methods, { List } from "../modules/methods";
import terminal from "../modules/terminal";

// CODE

class Users {
    public static list = new List('Users');

    public static getByStaticID(staticID:number):User {
        return this.list.getByID(staticID);
    }

    public static getByDynamicID(id:number) {
        return mp.players.at(id);
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
    public social_id:number;
    public username:string;
    public socialName:string;
    public ip?:string;

    private _secret:string = 'none';
    private _isLoging:boolean = false;

    constructor(options:TBoston.Users.createOptions) {
        this.dynamicID = options.dynamic_id;
        this.username = options.username;
        this.social_id = options.social_id;
        this.socialName = options.social_name;
        this.ip = options.ip;

        Users.list.add(this);
    }

    // SETTERS

    public setFreeze(status:boolean) {
        this.callClient('client.user:freeze:set', status);
    }

    public setHealth(number:number) {
        if(number < 0 || number > 100) return terminal.warning(`[Player] `);
        let _player = Users.getByDynamicID(this.dynamicID);
        if(_player) _player.health = number;
    }

    public setArmour(number:number) {
        if(number < 0 || number > 100) return terminal.warning(`[Player] `);
        let _player = Users.getByDynamicID(this.dynamicID);
        if(_player) _player.armour = number;
    }

    public setDimension(id:number) {
        let _player = Users.getByDynamicID(this.dynamicID);
        if(_player) _player.dimension = id;
    }

    public setMeta(key:string, value:any) {
        let _player = Users.getByDynamicID(this.dynamicID);
        if(_player) _player.setVariable(key, value);
    }

    public setLoging() {
        this._isLoging = true;
    }

    // GETTERS

    public getPosition() {
        let _player = Users.getByDynamicID(this.dynamicID);
        if(_player) return _player.position;
    }

    public getMeta(key:string) {
        let _player = Users.getByDynamicID(this.dynamicID);
        if(_player) _player.getVariable(key);
    }

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

    public kick() {
        let _player = Users.getByDynamicID(this.dynamicID);
        if(_player) _player.kickSilent();
    }

    public giveWeapon(weaponName:string, bulletCount:number) {
        let _player = Users.getByDynamicID(this.dynamicID);
        if(_player) _player.giveWeapon(mp.joaat(weaponName), bulletCount);
    }

    public takeWeapon(weaponName:string) {
        let _player = Users.getByDynamicID(this.dynamicID);
        if(_player) _player.removeWeapon(mp.joaat(weaponName));
    }

    public callClient(eventName:string, ...args:any[]) {
        let _player = mp.players.at(this.dynamicID);
        if(_player) _player.call(eventName, [...args]);
    }

    public quit() {
        // todo Нужно реализовать сохранение данных игрока при выходе из сервера
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
            return _player.call('client.init', [this._secret]);
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