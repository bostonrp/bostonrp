
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
    public getFPS() {
        return FPS.get();
    }

    public callServer(eventName:string, ...args:any[]) {
        AntiCheat.callServer('server.anticheat:events:call', eventName, User.secret, ...args);
    }

    public async sleep(ms:number) {
        return new Promise(res => setTimeout(res, ms));
    }

    public distanceToPos2D(v1:Vector3, v2:Vector3) {
        return Math.abs(Math.sqrt(Math.pow(v2.x - v1.x, 2) + Math.pow(v2.y - v1.y, 2)));
    };
};

const methods = new Methods();
export default methods;