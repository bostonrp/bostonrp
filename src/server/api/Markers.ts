
// IMPORTS

import { List, RGB } from "../modules/methods";
import terminal from "../modules/terminal";

// CODE

class Markers {
    public static list = new List('Markers');
}

export class Marker {
    private _handle:MarkerMp;

    constructor(type:number, position:Vector3, scale:number, options?:TBoston.Markers.createOptions) {
        this._handle = mp.markers.new(type, position, scale);

        this.setColor(options?.color);
        this.setDimension(options?.dimension);
        this.setDirection(options?.direction);
        this.setRotation(options?.rotation);
        this.setVisible(options?.visible);

        Markers.list.add(this);
    }

    // SETTERS

    setDimension(id:number = 0) {
        this._handle.dimension = id;
    }

    setVisible(status:boolean = true) {
        this._handle.visible = status;
    }

    setRotation(vector3:Vector3 = new mp.Vector3(0, 0, 0)) {
        this._handle.rotation = vector3;
    }

    setDirection(vector3:Vector3 = new mp.Vector3(0, 0, 0)) {
        this._handle.direction = vector3;
    }

    setScale(number:number) {
        this._handle.scale = number;
    }

    setPosition(vector3:Vector3) {
        this._handle.position = vector3;
    }

    setColor(rgb:TBoston.Methods.RGB = new RGB(0, 0, 0)) {
        let _color = rgb.get();
        this._handle.setColor(_color.r, _color.g, _color.b, _color.a);
    }

    // GETTERS

    getColor() {
        let _color = this._handle.getColor();
        return new RGB(_color[0], _color[1], _color[2], _color[3]).get();
    }

    getType() {
        return this._handle.type;
    }

    getPosition() {
        return this._handle.position;
    }

    getScale() {
        return this._handle.scale;
    }

    getDirection() {
        return this._handle.direction;
    }

    getRotation() {
        return this._handle.rotation;
    }

    getDimension() {
        return this._handle.dimension;
    }

    getVisible() {
        return this._handle.visible;
    }

    // OTHERS
}

// let m = new Marker({
//     type: 0,
//     position: new mp.Vector3(0, 0, 71),
//     scale: 1,
//     color: new RGB(37, 66, 109)
// });

export default Markers;