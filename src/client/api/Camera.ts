
// IMPORTS

import * as enums from '../../shared/enums/client/api/cameras';
import methods from "modules/methods";
import config from '../../shared/configs/client.json';

// CODE

export let activeCamera = undefined as Camera | undefined;
const localPlayer = mp.players.local;

export class CameraMethods {
    private static _oldSceneID:number;

    public static generateRandomCameraScene() {
        setTimeout(() => {
            mp.game.cam.doScreenFadeIn(600);

            let _scene = enums.camerasScene[methods.randomInt(0, enums.camerasScene.length)];
            if(!_scene) return;

            this._startCameraScene(_scene.to.position, _scene.to.pointAtCoord, _scene.from.position, _scene.from.pointAtCoord, config.scenes.time);
        }, 1100);
    }

    private static _startCameraScene(toPosition:Vector3, toPointAtCoord:Vector3, fromPosition:Vector3, fromPointAtCoord:Vector3, time:number) {
        let _camera = new Camera('default', toPosition, new mp.Vector3(0, 0, 0), 60, {
            pointAtCoord: toPointAtCoord
        });

        _camera.smoothToPosition(fromPosition, fromPointAtCoord, time * 1000);

        let _interval:any = setInterval(() => {
            let _positionPlayer = _camera.getPosition();
            localPlayer.position = new mp.Vector3(_positionPlayer.x, _positionPlayer.y, _positionPlayer.z + 5);

            if (!activeCamera) return clearInterval(_interval)
        }, 100);

        setTimeout(() => {
            mp.game.cam.doScreenFadeOut(250);

            setTimeout(() => {
                clearInterval(_interval);
                _interval = undefined;
                this.generateRandomCameraScene();
            }, 300);
        }, (time * 1000) - 200);
    }
}

class Camera {
    private _handle:CameraMp;

    constructor(name:string, position:Vector3, rotation:Vector3, fov:number, options?:TBoston.API.Cameras.createOptions) {
        this._handle = mp.cameras.new(name, position, rotation, fov);

        if(options?.pointAtCoord) this.setPointAtCoord(options?.pointAtCoord);
        if(options?.active) this.setActive(options?.active);

        this.setRender(false);

        activeCamera = this
    }

    // SETTERS

    public setRender(render:boolean, ease:boolean = false, easeTime:number = 0, p3:boolean = true, p4:boolean = false, p5:number = 0) {
        mp.game.cam.renderScriptCams(render, ease, easeTime, p3, p4, p5);
    }

    public setPosition(position:Vector3) {
        this._handle.setCoord(position.x, position.y, position.z);
    }

    public setPointAtCoord(position:Vector3) {
        this._handle.pointAtCoord(position.x, position.y, position.z);
    }

    public setActive(status:boolean) {
        this._handle.setActive(status);
        this.setRender(status);

        if (status) {
            activeCamera = this;
        } else {
            activeCamera = undefined;
        }
    }

    // GETTERS

    get handle() {
        return this._handle;
    }

    public getPosition() {
        return this._handle.getCoord();
    }

    // OTHERS

    public shake(type:string, amplitude:number) {
        this._handle.shake(type, amplitude);
    }

    public smoothToPosition(position:Vector3, pointAtCoord:Vector3, time:number) {
        let _targetCamera = mp.cameras.new('default', position, this._handle.getRot(0), this._handle.getFov());
        _targetCamera.pointAtCoord(pointAtCoord.x, pointAtCoord.y, pointAtCoord.z);
        this._handle.setActiveWithInterp(_targetCamera.handle, time, 0, 0);
        this.setRender(true);
    }

    public pointingAt(distance:number) {
        let direction = this._handle.getDirection();
        const farAway = new mp.Vector3((direction.x * distance) + (this.getPosition().x), (direction.y * distance) + (this.getPosition().y), (direction.z * distance) + (this.getPosition().z));
    
        const result = mp.raycasting.testPointToPoint(this.getPosition(), farAway);
        if (result === undefined) {
            return 'undefined';
        }
        return result;
    }

    public destroy() {
        this.setActive(false);
        // this._handle.destroy();
    }
}

export class OrbitalCamera {
    private _handle:Camera;

    private _position:Vector3;
    private _rotation:number = 0;
    private _height:number;
    private _maxRadius:number;
    private _fov:number;

    constructor(position:Vector3, height:number, maxRadius:number = 100, fov:number = 20) {
        mp.game.streaming.requestCollisionAtCoord(position.x, position.y, position.z);

        this._handle = new Camera('default', new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0), fov, {
            pointAtCoord: position,
            active: false
        });

        this._position = position;
        this._height = height;
        this._maxRadius = maxRadius;
        this._fov = fov;

        this._createOrbitalCamera(position);
    }

    // SETTERS

    public setRotation(number:number) {
        this._rotation = number;
    }

    public setPosition(position:Vector3) {
        this._position = this._getOrbital(new mp.Vector3(position.x, position.y, position.z + this._height), this._rotation, this._maxRadius);
        this._handle.setPosition(this._position);
    }

    // GETTERS

    public getRotation() {
        return this._rotation;
    }

    get handle() {
        return this._handle;
    }

    // OTHERS

    private _getOrbital(position:Vector3, rotation:number = 0, range:number = 100) {
        return new mp.Vector3(range * Math.sin(rotation) + position.x, range * Math.cos(rotation) + position.y, position.z);
    }

    private _createOrbitalCamera(position:Vector3) {
        // if(methods.distanceToPos2D(new mp.Vector3(-66.66476, -802.0474, 44.22729), position) < 700) this._height = 250;
        this.setPosition(new mp.Vector3(position.x, position.y, position.z + this._height));
        this._handle.setActive(true);
    }
}

export default Camera;