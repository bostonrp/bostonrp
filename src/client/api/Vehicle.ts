
// IMPORTS

import methods from "../modules/methods";
import enums from '../../shared/enums//server/vehicles/index';

// CODE

let localPlayer = mp.players.local;
let _interval:any = null;

class Vehicle {
    private static _mileageNewPosition:Vector3;
    private static _mileageOldPosition:Vector3;

    public static startTickMileage() {
        if(!localPlayer.vehicle) return;
        let _vehicle = localPlayer.vehicle;

        this._mileageOldPosition = localPlayer.vehicle.position;

        _interval = setTimeout(() => {
            if(_vehicle && _vehicle.getSpeed() > 0) {
                this._mileageNewPosition = _vehicle.position;
                
                let _distance = 0;
                if(_vehicle.isOnAllWheels()) {
                    _distance = mp.game.gameplay.getDistanceBetweenCoords(
                        this._mileageOldPosition.x,
                        this._mileageOldPosition.y,
                        this._mileageOldPosition.z,
                        this._mileageNewPosition.x,
                        this._mileageNewPosition.y,
                        this._mileageNewPosition.z,
                        true
                    );
                }

                methods.callServer('server.vehicle:mileage:add', _vehicle.getVariable('server.id'), _distance);
            }

            this.startTickMileage();
        }, 950);
    }

    public static stopTickMileage() {
        clearInterval(_interval);
        _interval = null;
    }
}

export default Vehicle;