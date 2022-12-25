
// IMPORTS

import { RGB } from "../modules/methods";
import terminal from "../modules/terminal";
import { Marker } from "./Markers";

// CODE

class Methods {
    public static createWithType(id:number, position:Vector3, range:number):ColshapeMp {
        switch(id) {
            case 0: return mp.colshapes.newSphere(position.x, position.y, position.z, range);
        }

        return mp.colshapes.newSphere(0, 0, 0, 0.1, 0);
    }
}

class Colshape {
    private _voidsEnter = new Array();
    private _voidsQuit = new Array();
    private _handle:ColshapeMp;
    private _handleMarker:Marker|null = null;

    constructor(type:number, position:Vector3, range:number, options?:TBoston.API.Colshapes.createOptions) {
        this._handle = Methods.createWithType(type, position, range);

        this.setDimension(options?.dimension);

        if(options?.marker) {
            let markerPosition = position;
            markerPosition.z = markerPosition.z - 1;

            this._handleMarker = new Marker(options.marker.type, markerPosition, options.marker.scale, {
                color: options.marker.color
            });
        }

        this._createEvents();
    }

    // SETTERS

    public setDimension(number:number = 0) {
        this._handle.dimension = number;
    }

    // GETTERS

    public getDimension() {
        return this._handle.dimension;
    }

    // OTHERS

    public onEnter(handle:(player:PlayerMp) => void):void {
        this._voidsEnter.push(handle);
    }

    public onExit(handle:(player:PlayerMp) => void):void {
        this._voidsQuit.push(handle);
    }

    public clearVoids() {
        this._voidsEnter = new Array();
    }

    private _createEvents() {
        mp.events.add('playerEnterColshape', (player, colshape) => {
            if(colshape == this._handle) {
                this._voidsEnter.forEach((_function:Function) => {
                    try {
                        _function(player);
                    } catch(e) { terminal.log(e); }
                });
            }
        });

        mp.events.add('playerExitColshape', (player, colshape) => {
            if(colshape == this._handle) {
                this._voidsQuit.forEach((_function:Function) => {
                    try {
                        _function(player);
                    } catch(e) { terminal.log(e); }
                });
            }
        });
    }
}

// let colshape = new Colshape(0, new mp.Vector3(0, 0, 71), 2, {
//     marker: {
//         type: 1,
//         color: new RGB(252, 252, 252)
//     }
// });

// colshape.onEnter((player) => {
//     terminal.log(player.name + ' entered colshape');
// });

export default Colshape;