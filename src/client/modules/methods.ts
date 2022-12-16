
// IMPORTS

import User from "../api/User";
import AntiCheat from "../systems/anticheat";

// CODE

class FPS {
    private static _enabled = false;
    private static _count:number = 0;

    private static initCalculateFrame() {
        if(!this._enabled) return;
        let _fps = this.getFPS();

        setInterval(() => {
            this._count = this.getFPS() - _fps;
            _fps = this.getFPS();
        }, 1000);
    }

    private static getFPS():number {
        return mp.game.invoke('0xFC8202EFC642E6F2') as number;
    }

    public static get():number {
        return this._count;
    }

    public static setEnabled(status:boolean) {
        this._enabled = status;
        if(status) this.initCalculateFrame();
        else this._count = 0;
    }
}

//? METHODS
class Methods {
    getFPS() {
        return FPS.get();
    }

    callServer(eventName:string, ...args:any[]) {
        AntiCheat.callServer('server.anticheat:events:call', eventName, User.secret, ...args);
    }

    async sleep(ms:number) {
        return new Promise(res => setTimeout(res, ms));
    }
};

const methods = new Methods();
export default methods;