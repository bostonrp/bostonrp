// IMPORTS

import terminal from "../modules/terminal";

// CODE

class NewEvents {
    #debug = false;
    #events = new Map();

    private _add(eventName:string, callback: (player: PlayerMp, ...args: any[]) => void) {
        let eventList = [];

        if(this.#events.has(eventName)) eventList = this.#events.get(eventName);
        eventList.push(callback);
        this.#events.set(eventName, eventList);
    }

    private _remove(eventName:string, callback:void) {
        if(this.#events.has(eventName)) {
            let eventList = [];

            if(callback != undefined) {
                eventList = this.#events.get(eventName);

                for(let i = 0; i < eventList.length; i++) {
                    if(eventList[i] === callback) {
                        eventList.splice(i, 1);
                        break;
                    }
                }
            }

            if(eventList.length) {
                this.#events.set(eventName, callback);
            } else {
                this.#events.delete(eventName);
            }
        }
    }

    private _call(eventName:string, ...args:any) {
        if(this.#debug) terminal.log(eventName, JSON.stringify(args));
        if(this.#events && this.#events.has(eventName)) {
            this.#events.get(eventName).forEach((callback:any) => {
                callback(...args);
            });
        }
    }

    // CONSTRUCTOR
    constructor(debug = false) {
        this.#debug = debug;
    }

    public add(eventName:string, callback: (player: PlayerMp, ...args: any[]) => void) {
        this._add(eventName, callback);
    }

    public remove(eventName:string) {
        this._remove(eventName);
    }

    public call(eventName:string, ...args:any) {
        this._call(eventName, ...args);
    }
}

const Events = new NewEvents(false);

export default Events;