// IMPORTS

import terminal from "../modules/terminal";

// CODE

export class NewEvents {
    private _debug = false;
    private _events = new Map();

    private _add(eventName:string, callback: (player: PlayerMp, ...args: any[]) => void) {
        let eventList = [];

        if(this._events.has(eventName)) eventList = this._events.get(eventName);
        eventList.push(callback);
        this._events.set(eventName, eventList);
    }

    private _remove(eventName:string, callback:void) {
        if(this._events.has(eventName)) {
            let eventList = [];

            if(callback != undefined) {
                eventList = this._events.get(eventName);

                for(let i = 0; i < eventList.length; i++) {
                    if(eventList[i] === callback) {
                        eventList.splice(i, 1);
                        break;
                    }
                }
            }

            if(eventList.length) {
                this._events.set(eventName, callback);
            } else {
                this._events.delete(eventName);
            }
        }
    }

    private _call(player:PlayerMp, eventName:string, ...args:any) {
        if(this._debug) terminal.log(eventName, JSON.stringify(args));
        if(this._events && this._events.has(eventName)) {
            this._events.get(eventName).forEach((callback:any) => {
                try {
                    callback(player, ...args);
                } catch(e) { console.log(e); }
            });
        }
    }

    // CONSTRUCTOR
    constructor(debug = false) {
        this._debug = debug;
    }

    public add(eventName:string, callback: (player: PlayerMp, ...args: any[]) => void) {
        this._add(eventName, callback);
    }

    public remove(eventName:string) {
        this._remove(eventName);
    }

    public call(player:PlayerMp, eventName:string, ...args:any) {
        this._call(player, eventName, ...args);
    }
}

const Events = new NewEvents(false);
export default Events;