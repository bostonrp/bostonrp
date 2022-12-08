
// IMPORTS

import methods from "../modules/methods";
import enums from '@enums/server/vehicles/index';

// CODE

let localPlayer = mp.players.local;
let _interval:any = null;

class Vehicle {
    private static _mileageNewPosition:Vector3;
    private static _mileageOldPosition:Vector3;

    public static startTickMileage() {
        if(!localPlayer.vehicle) return;

        this._mileageOldPosition = localPlayer.vehicle.position;

        _interval = setTimeout(() => {
            if(localPlayer.vehicle) {
                this._mileageNewPosition = localPlayer.vehicle.position;
                
                let _distance = 0;
                if(localPlayer.vehicle.isOnAllWheels()) {
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

                mp.console.logInfo(`${_distance}`);

                methods.callServer('server.vehicle:mileage:add', localPlayer.vehicle.getVariable('server.id'), _distance);
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