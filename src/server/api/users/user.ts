
// IMPORTS

import rpc from "@aspidemon/rage-rpc";
import methods from "modules/methods";
import terminal from "modules/terminal";
import Economy from "./economy";
import Users from "./index";

// CODE

class User {
    public dynamicID:number;
    public staticID:number|null = null;
    public social_id:number;
    public username:string;
    public socialName:string;
    public ip?:string;

    public economy:Economy;

    private _secret:string = 'none';
    private _isLoging:boolean = false;

    constructor(options:TBoston.Users.createOptions) {
        this.dynamicID = options.dynamic_id;
        this.username = options.username;
        this.social_id = options.social_id;
        this.socialName = options.social_name;
        this.ip = options.ip;

        // todo Нужно доработать
        this.economy = new Economy({
            cash: 0,
            max_cash: 1
        });

        this.generateSecret();
        Users.list.add(this);
    }

    // SETTERS

    public setFreeze(status:boolean) {
        this.callClient('client.user:freeze:set', status);
    }

    public setHealth(number:number) {
        if(number < 0 || number > 100) return terminal.warning(`[Player] `);
        let _player = mp.players.at(this.dynamicID);
        if(_player) _player.health = number;
    }

    public setArmour(number:number) {
        if(number < 0 || number > 100) return terminal.warning(`[Player] `);
        let _player = mp.players.at(this.dynamicID);
        if(_player) _player.armour = number;
    }

    public setDimension(id:number) {
        let _player = mp.players.at(this.dynamicID);
        if(_player) _player.dimension = id;
    }

    public setMeta(key:string, value:any) {
        let _player = mp.players.at(this.dynamicID);
        if(_player) _player.setVariable(key, value);
    }

    public setLoging() {
        this._isLoging = true;
    }

    // GETTERS

    public getPosition() {
        let _player = mp.players.at(this.dynamicID);
        if(_player) return _player.position;
    }

    public getMeta(key:string) {
        let _player = mp.players.at(this.dynamicID);
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
        let _player = mp.players.at(this.dynamicID);
        if(_player) _player.kickSilent();
    }

    public giveWeapon(weaponName:string, bulletCount:number) {
        let _player = mp.players.at(this.dynamicID);
        if(_player) _player.giveWeapon(mp.joaat(weaponName), bulletCount);
    }

    public takeWeapon(weaponName:string) {
        let _player = mp.players.at(this.dynamicID);
        if(_player) _player.removeWeapon(mp.joaat(weaponName));
    }

    public callClient(eventName:string, ...args:any[]) {
        let _player = mp.players.at(this.dynamicID);
        if(_player) rpc.emitClient(_player, eventName, ...args);
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
            this._secret = _secret;
            return this.callClient('client.secret:set', _secret);
        }

        this.generateSecret();
    }

    public putInToVehicle(vehicle:VehicleMp, seat:number) {
        if(!Users.exists(this.dynamicID)) return;
        let _player = mp.players.at(this.dynamicID);
        _player.putIntoVehicle(vehicle, seat);
    }
}

export default User;