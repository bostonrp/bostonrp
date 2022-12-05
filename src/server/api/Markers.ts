
// IMPORTS

import { RGB } from "../modules/methods";

// CODE

class Markers {
    public static list = new Array();
}

export class Marker {
    private _handle:MarkerMp;

    constructor(options:TBoston.Markers.createOptions = { type: 0, position: new mp.Vector3(0, 0, 0), scale: 1 }) {
        this._handle = mp.markers.new(options.type, options.position, options.scale);
        this.setColor(options.color);
    }

    // SETTERS

    setColor(rgb?:TBoston.Markers.color) {
        if(!rgb) return;
        let _color = new RGB(rgb.a, rgb.b, rgb.g, rgb.a).get();
        this._handle.setColor(_color.r, _color.g, _color.b, _color.a);
    }

    // GETTERS

    // OTHERS
}

let m = new Marker({
    type: 0,
    position: new mp.Vector3(0, 0, 71),
    scale: 1,
    color: new RGB(0, 0, 0).get()
})

export default Markers;