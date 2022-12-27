
// IMPORTS

// CODE

export let activeCamera:Camera;

class Camera {
    private _handle:CameraMp;

    constructor(name:string, position:Vector3, rotation:Vector3, fov:number, options?:TBoston.API.Cameras.createOptions) {
        this._handle = mp.cameras.new(name, position, rotation, fov);

        if(options?.pointAtCoord) this.setPointAtCoord(options?.pointAtCoord);
        if(options?.active) this.setActive(options?.active);

        this.setRender(false);
    }

    // SETTERS

    public setPosition(position:Vector3) {
        this._handle.setCoord(position.x, position.y, position.z);
    }

    public setPointAtCoord(position:Vector3) {
        this._handle.pointAtCoord(position.x, position.y, position.z);
    }

    public setActive(status:boolean) {
        this._handle.setActive(status);
        this.setRender(status);

        activeCamera = this;
    }

    // GETTERS

    get handle() {
        return this._handle;
    }

    public getPosition() {
        return this._handle.getCoord();
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

    // OTHERS

    public destroy() {
        this.setActive(false);
        // this._handle.destroy();
    }

    public setRender(render:boolean, ease:boolean = false, easeTime:number = 0, p3:boolean = true, p4:boolean = false, p5:number = 0) {
        mp.game.cam.renderScriptCams(render, ease, easeTime, p3, p4, p5);
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