
// IMPORTS

import rpc from '@aspidemon/rage-rpc'

// CODE

// const callServer = mp.events.callRemote;
// mp.events.callRemote = () => {
//     mp.console.logError('[AntiCheat] Вы не можете использовать executor на этом сервере :3');
// };

class AntiCheat {
    public static callServer(eventName:string, ...args:any[]) {
        rpc.emitServer(eventName, ...args);
    }
}
export default AntiCheat;