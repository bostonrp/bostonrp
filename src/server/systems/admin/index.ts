
// IMPORTS

import Users from "src/server/api/Users";
import Vehicles, { Vehicle } from "src/server/api/vehicles";
import methods, { RGB } from "src/server/modules/methods";
import terminal from "src/server/modules/terminal";
import Weather from "../weather";
import * as enums from '@shared/enums/server/weather/index';
import WhiteList from "../whitelist";
import Time from "../time";

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

    public static setWorldTime(playerID:number, hour:number, minute:number) {
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

    public static async teleportToWaypoit(playerID:number) {
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
        if(_player) _player.call('client.user:alpha:set', [status ? 0 : 255]);
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

//! Скорее всего нужно удалить будет
mp.events.addCommand('tw', (player) => {
    Admin.teleportToWaypoit(player.id);
});

mp.events.addCommand('time', (player, _, hour, minute) => {
    Admin.setWorldTime(player.id, parseInt(hour), parseInt(minute));
});

mp.events.addCommand('weather', (player, _, name) => {
    Admin.setWeather(player.id, name);
});

mp.events.addCommand('god', (player, _, id) => {
    Admin.setInvincible(parseInt(id), true);
});

mp.events.addCommand('inv', (player, _, id) => {
    Admin.setInvisible(parseInt(id), true);
});

mp.events.addCommand('slap', (player, _, id) => {
    Admin.slap(parseInt(id));
});

mp.events.addCommand('veh', (player, _, model) => {
    Admin.createVehicle(player.id, model);
});

mp.events.addCommand('revive', (player, _, id) => {
    Admin.revive(parseInt(id));
});

export default Admin;