
// IMPORTS

import methods from "modules/methods";
import Weather from "../systems/weather";
import * as enums from '../../shared/enums/client/api/cameras';
import user from "./User";
import Camera from "./Camera";
import { mainBrowser } from "./Browser";

// CODE

const localPlayer = mp.players.local;

class Client {
    public init(secretKey:string) {
        localPlayer.position = new mp.Vector3(0, 0, 71);
        user.secret = secretKey;
        
        setTimeout(() => {
            Weather.startGettingInZone();

            setTimeout(() => {
                mainBrowser.call('cef.auth:visible:set', true);
                mainBrowser.call('cef.auth:page:set', 'login');
            }, 1000);
            
            this._generateCameraScene();
        }, 500);
    }

    public spawnToWaypoint() {
        let _waypointPosition = this._getWaypointPosition();

        if (_waypointPosition) {
            localPlayer.freezePosition(true);
            mp.game.cam.doScreenFadeOut(250);
            
            setTimeout(() => {
                if(_waypointPosition) {
                    let _groundPos = this._getGroundZCoord(_waypointPosition, 10);

                    if (_groundPos) {
                        if(localPlayer.vehicle) localPlayer.vehicle.setCoords(_groundPos.x, _groundPos.y, _groundPos.z, false, false, false, false);
                        else localPlayer.position = _groundPos;

                        mp.game.streaming.setFocusArea(_groundPos.x, _groundPos.y, _groundPos.z, 0, 0, 0);
                        mp.game.streaming.clearFocus();
                        
                        setTimeout(() => {
                            localPlayer.freezePosition(false);
                            mp.game.cam.doScreenFadeIn(250);
                        }, 200);
                    }
                }
            }, 300);
        }
    }

    private _generateCameraScene() {
        Cursor.setVisible(true);
        mp.gui.chat.show(false);
        mp.gui.chat.activate(false);
        mp.game.ui.displayRadar(false);
        localPlayer.freezePosition(true);
        mp.game.cam.doScreenFadeOut(1000);

        setTimeout(() => {
            mp.game.cam.doScreenFadeIn(600);

            let _targetPosition = enums.camerasScene[methods.randomInt(0, enums.camerasScene.length)];
            if(!_targetPosition) return;

            let _camera = new Camera('default', _targetPosition.from.position, new mp.Vector3(0, 0, 0), 60);
            _camera.smoothToPosition(_targetPosition.from.position, _targetPosition.from.pointAtCoord, 260 * 1000);

            setInterval(() => {
                let _positionPlayer = _camera.getPosition();
                localPlayer.position = new mp.Vector3(_positionPlayer.x, _positionPlayer.y, _positionPlayer.z + 5);
            }, 100);
        }, 1100);
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

    public setCursorStatus(status:boolean) {
        Cursor.setVisible(status);
    }

    public getCursorStatus() {
        return Cursor.get();
    }
}

class Cursor {
    private static status = false;

    public static setVisible(status:boolean = false) {
        this.status = status;
    }

    public static get() {
        return this.status;
    }
}

const client = new Client();
export default client;