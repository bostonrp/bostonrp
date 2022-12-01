
// IMPORTS

// CODE

class EventManager {
    #debug = false;
    #events = new Map();

    #add(eventName, callback) {
        let eventList = [];

        if(this.#events.has(eventName)) eventList = this.#events.get(eventName);
        eventList.push(callback);
        this.#events.set(eventName, eventList);
    }

    #remove(eventName, callback) {
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

    #call(eventName, ...args) {
        // if(this.#debug) console.log(`'${eventName}'`, ...args);
        if(this.#events && this.#events.has(eventName)) {
            this.#events.get(eventName).forEach(callback => {
                callback(...args);
            });
        }
    }

    // CONSTRUCTOR
    constructor(debug = false) {
        this.#debug = debug;
    }

    on(eventName, callback) {
        this.#add(eventName, callback);
    }

    off(eventName) {
        this.#remove(eventName);
    }

    emit(eventName, ...args) {
        this.#call(eventName, ...args);
    }
}

export default EventManager;