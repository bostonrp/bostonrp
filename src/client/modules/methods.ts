
// IMPORTS

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

const callServer = mp.events.callRemote;
mp.events.callRemote = () => {
    mp.console.logError('[AntiCheat] Вы не можете использовать executor на этом сервере :3');
};

mp.events.callRemote('test', 'gdf');

//? METHODS
let methods = {
    getFPS():number {
        return FPS.get();
    },

    callServer(eventName:string, ...args:any[]) {
        callServer(eventName, ...args);
    }
};

export default methods;