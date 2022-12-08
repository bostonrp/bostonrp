
// IMPORTS

import { List, RGB } from "../modules/methods";
import terminal from "../modules/terminal";

// CODE

class Markers {
    public static list = new List('Markers');
}

export class Marker {
    private _handle:MarkerMp;
    private _color:TBoston.Methods.RGB = new RGB(0, 0, 0);

    constructor(options:TBoston.Markers.createOptions = { type: 0, position: new mp.Vector3(0, 0, 0), scale: 1 }) {
        this._handle = mp.markers.new(options.type, options.position, options.scale);
        this.setColor(options.color);

        Markers.list.add(this);
    }

    // SETTERS

    setColor(rgb:TBoston.Methods.RGB = new RGB(0, 0, 0)) {
        this._color = rgb;
        this._handle.setColor(this._color.get().r, this._color.get().g, this._color.get().b, this._color.get().a);
    }

    // GETTERS

    getColor() {
        return this._color.get();
    }

    // OTHERS
}

let m = new Marker({
    type: 0,
    position: new mp.Vector3(0, 0, 71),
    scale: 1,
    color: new RGB(37, 66, 109)
});

export default Markers;