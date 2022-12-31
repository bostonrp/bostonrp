
// IMPORTS

import Users from "api/Users";
import Vehicles, { Vehicle } from "api/vehicles";
import { RGB } from "modules/methods";
import terminal from "modules/terminal";
import Weather from "../weather";
import * as enums from '../../../shared/enums/server/weather/index';
import WhiteList from "../whitelist";
import Time from "../time";

import './commands';

// CODE

class Admin {
    public static createVehicle(playerID:number, modelName:string) {
        // todo Доделать создание автомобиля
        let _player = mp.players.at(playerID);
        let _vehicle = new Vehicle(modelName, _player.position, {
            fuelType: 'infinity'
        });

        _vehicle.setColor(new RGB(31, 87, 84), new RGB(31, 87, 84));
        _player.putIntoVehicle(_vehicle.handle, 0);
    }

    public static deleteVehicle(vehicleID:number) {
        let _vehicle = Vehicles.getByID(vehicleID);
        if(_vehicle) _vehicle.delete();
    }

    public static setVehicleNumberPlate(vehicleID:number, text:string) {
        let _vehicle = Vehicles.getByID(vehicleID);
        if(_vehicle) _vehicle.setNumberPlateText(text);
    }

    public static teleportToVehicle(playerID:number, vehicleID:number) {
        let _user = Users.getByStaticID(playerID);
        let _vehicle = Vehicles.getByID(vehicleID);

        if(_user) {
            if(_vehicle) {
                let _player = mp.players.at(_user.dynamicID);
                _player.spawn(_vehicle.position);
            }
        }
    }

    public static setPlayerDimension(playerID:number, dimensionID:number) {
        let _user = Users.getByStaticID(playerID);
        if(_user) _user.setDimension(dimensionID);
    }

    public static getPosition(playerID:number) {
        let _user = Users.getByStaticID(playerID);
        if(_user) return `${_user.getPosition()?.x.toFixed(4)}, ${_user.getPosition()?.y.toFixed(4)}, ${_user.getPosition()?.z.toFixed(4)}`;
    }

    public static getCameraPosition(playerID:number) {
        let _player = mp.players.at(playerID);
        if(_player) _player.call('client.camera:position:get', ['default']);
    }

    public static teleportVehicleToMe(playerID:number, vehicleID:number) {
        let _user = Users.getByStaticID(playerID);
        let _veh = Vehicles.getByID(vehicleID);

        if(_user) {
            if(_veh) {
                let _player = mp.players.at(_user.dynamicID);
                let _vehicle = mp.vehicles.at(_veh.id);
                _vehicle.spawn(_player.position, _player.heading);
            }
        }
    }

    public static revive(playerID:number) {
        let _user = Users.getByStaticID(playerID);

        if(_user) {
            let _player = mp.players.at(_user.dynamicID);
            if(_player) _player.spawn(_player.position);
        }
    }

    public static async setWeather(playerID:number, weather:string) {
        let _user = Users.getByStaticID(playerID);
        
        try {
            let _player = mp.players.at(_user.dynamicID);
            if(_player) {
                let _zone = await _player.callProc('client.weather:zone:get');
                let _category = enums.getCategoryNameByZoneName(_zone);
                if(_category) Weather.setWeatherByCategory(_category, weather);
            }
            
        } catch(e) { terminal.error(e); }
    }

    public static setWorldTime(playerID:number, hour:number = 12, minute:number = 0) {
        Time.set(hour, minute);
    }

    public static repairVehicle(vehicleID:number) {
        let _vehicle = Vehicles.getByID(vehicleID);
        if(_vehicle) _vehicle.repair();
    }

    public static setFreeze(playerID:number, status:boolean) {
        let _user = Users.getByStaticID(playerID);
        if(_user) _user.setFreeze(status);
    }

    public static teleportToPosition(playerID:number, position:Vector3) {
        let _user = Users.getByStaticID(playerID);

        if(_user) {
            let _player = mp.players.at(_user.dynamicID);
            if(_player) _player.spawn(position);
        }
    }

    public static async teleportToWaypoint(playerID:number) {
        try {
            let _user = Users.getByStaticID(playerID);
            if(_user) _user.callClient('client.user:waypoint:spawn');
        } catch(e) { terminal.error(e); }
    }

    public static teleportToPlayer(playerID:number, targetID:number) {
        let _user = Users.getByStaticID(playerID);
        let _userTarget = Users.getByStaticID(targetID);

        if(_user) {
            if(_userTarget) {
                let _player = mp.players.at(_user.dynamicID);
                let _target = mp.players.at(_userTarget.dynamicID);
                _player.spawn(_target.position);
            }
        }
    }

    public static teleportPlayerToMe(playerID:number, targetID:number) {
        let _user = Users.getByStaticID(playerID);
        let _userTarget = Users.getByStaticID(targetID);

        if(_user) {
            if(_userTarget) {
                let _player = mp.players.at(_user.dynamicID);
                let _target = mp.players.at(_userTarget.dynamicID);
                _target.spawn(_player.position);
            }
        }
    }

    public static addInWhiteList(playerID:number) {
        let _user = Users.getByStaticID(playerID);
        if(_user) {
            if(!WhiteList.has(_user.socialName)) return;
            WhiteList.add(_user.socialName);
        }
    }

    public static removeInWhiteList(playerID:number) {
        let _user = Users.getByStaticID(playerID);
        if(_user) {
            if(!WhiteList.has(_user.socialName)) return;
            WhiteList.remove(_user.socialName);
        }
    }

    // todo Нужно сделать лог
    public static kick(playerID:number, reason:string) {
        let _user = Users.getByStaticID(playerID);
        if(_user) _user.kick();
    }

    public static setHealth(playerID:number, number:number) {
        let _user = Users.getByStaticID(playerID);
        if(_user) _user.setHealth(number);
    }

    public static giveWeapon(playerID:number, weaponName:string, bulletCount:number) {
        let _user = Users.getByStaticID(playerID);
        if(_user) _user.giveWeapon(weaponName, bulletCount);
    }

    public static slap(playerID:number) {
        // let _user = Users.getByID(staticID);

        // if(_user) {
            let _player = mp.players.at(playerID); // _user.dynamicID
            if(_player) _player.position = new mp.Vector3(_player.position.x, _player.position.y, _player.position.z + 5.0);
        // }
    }

    public static setInvisible(playerID:number, status:boolean) {
        // let _user = Users.getByStaticID(staticID);

        // if(_user) {
            // _user.callClient('client.player:alpha:set', status ? 0 : 255);
            // _user.setMeta("invisible", status);
        // }

        let _player = mp.players.at(playerID);
        if(_player) _player.call('client.user:visible:set', [status]);
    }

    public static setInvincible(playerID:number, status:boolean) {
        // let _user = Users.getByStaticID(staticID);

        // if(_user) {
            // _user.callClient('client.player:invincible:set', status);
            // _user.setMeta("invisible", status);
        // }

        let _player = mp.players.at(playerID);
        if(_player) _player.call('client.user:invincible:set', [status]);
    }
}

export default Admin;