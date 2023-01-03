
// IMPORTS

import methods from "modules/methods";
import Weather from "../systems/weather";
import * as enums from '../../shared/enums/client/api/cameras';
import user from "./User";
import Camera from "./Camera";

// CODE

class Client {
    public init(secretKey:string) {
        user.secret = secretKey;
        
        Weather.startGettingInZone();

        this._generateCameraScene();
    }

    public spawnToWaypoint() {
        let _waypointPosition = this._getWaypointPosition();

        if (_waypointPosition) {
            mp.players.local.freezePosition(true);
            mp.game.cam.doScreenFadeOut(250);
            
            setTimeout(() => {
                if(_waypointPosition) {
                    let _groundPos = this._getGroundZCoord(_waypointPosition, 10);

                    if (_groundPos) {
                        let _localPlayer = mp.players.local;

                        if(_localPlayer.vehicle) _localPlayer.vehicle.setCoords(_groundPos.x, _groundPos.y, _groundPos.z, false, false, false, false);
                        else _localPlayer.position = _groundPos;

                        mp.game.streaming.setFocusArea(_groundPos.x, _groundPos.y, _groundPos.z, 0, 0, 0);
                        mp.game.streaming.clearFocus();
                        
                        setTimeout(() => {
                            mp.players.local.freezePosition(false);
                            mp.game.cam.doScreenFadeIn(250);
                        }, 200);
                    }
                }
            }, 300);
        }
    }

    private _generateCameraScene() {
        setTimeout(() => {
            mp.gui.chat.show(false);
            mp.gui.chat.activate(false);
            mp.game.ui.displayRadar(false);
            mp.players.local.freezePosition(true);
            mp.game.cam.doScreenFadeOut(1000);

            setTimeout(() => {
                mp.game.cam.doScreenFadeIn(600);

                let _targetPosition = enums.camerasScene[methods.randomInt(0, enums.camerasScene.length)];
                let _camera = new Camera('default', _targetPosition.from.position, new mp.Vector3(0, 0, 0), 60);
                _camera.smoothToPosition(_targetPosition.from.position, _targetPosition.from.pointAtCoord, 360 * 1000);
                _camera.shake('VIBRATE_SHAKE', 5);

                setInterval(() => {
                    mp.events.add('render', () => {
                        mp.game.ui.hideHudComponentThisFrame(1); // Wanted Stars
                        mp.game.ui.hideHudComponentThisFrame(2); // Weapon Icon
                        mp.game.ui.hideHudComponentThisFrame(3); // Cash
                        mp.game.ui.hideHudComponentThisFrame(4); // MP Cash
                        mp.game.ui.hideHudComponentThisFrame(6); // Vehicle Name
                        mp.game.ui.hideHudComponentThisFrame(7); // Area Name
                        mp.game.ui.hideHudComponentThisFrame(8);// Vehicle Class
                        mp.game.ui.hideHudComponentThisFrame(9); // Street Name
                        mp.game.ui.hideHudComponentThisFrame(13); // Cash Change
                        mp.game.ui.hideHudComponentThisFrame(17); // Save Game
                        mp.game.ui.hideHudComponentThisFrame(20); // Weapon Stats
                    });
                    let _positionPlayer = _camera.getPosition();
                    mp.players.local.position = new mp.Vector3(_positionPlayer.x, _positionPlayer.y, _positionPlayer.z + 5);
                }, 100);
            }, 1100);
        }, 100);
    }

    private _getGroundZCoord(position:Vector3, tries:number) {
        let _groundZ;

        for (let i = 0; i < tries; ++i) {
            _groundZ = mp.game.gameplay.getGroundZFor3dCoord(position.x, position.y, 1000, false, false);
            if (_groundZ) return new mp.Vector3(position.x, position.y, _groundZ + 1);

            for (let z = 1500; z >= 0; z -= 100) {
                mp.game.streaming.setFocusArea(position.x, position.y, z, 0, 0, 0);
                mp.game.streaming.requestCollisionAtCoord(position.x, position.y, z);
                mp.game.invoke('0xC9156DC11411A9EA', position.x, position.y, z);
                mp.game.wait(0);
            }

            _groundZ = mp.game.gameplay.getGroundZFor3dCoord(position.x, position.y, 1000, false, false);
            if (_groundZ) return new mp.Vector3(position.x, position.y, _groundZ + 1);
        }
    }

    private _getWaypointPosition() {
        try {
            let _waypoint = mp.game.ui.getFirstBlipInfoId(8);
            if(mp.game.ui.doesBlipExist(_waypoint)) return mp.game.ui.getBlipInfoIdCoord(_waypoint);
        } catch(e) { mp.console.logError(`${e}`); }
    }
}

const client = new Client();
export default client;