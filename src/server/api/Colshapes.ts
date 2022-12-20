
// IMPORTS

import terminal from "../modules/terminal";

// CODE

class Functions {
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

    constructor(type:number, position:Vector3, range:number, dimension:number = 0) {
        this._handle = Functions.createWithType(type, position, range);

        this.setDimension(dimension)

        this._createEvents();
    }

    // SETTERS

    public setDimension(number:number) {
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

// let colshape = new Colshape(0, new mp.Vector3(0, 0, 71), 2);

// colshape.onEnter((player) => {
//     terminal.log(player.name + ' entered colshape');
// });

export default Colshape;