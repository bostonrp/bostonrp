
// IMPORTS

import Events from "../api/Events";

// CODE

class AntiCheat {
    
}

//? EVENT
mp.events.add('server.anticheat:events:call', (player:PlayerMp, eventName:string, secret:string, ...args:any[]) => {
    // todo Сделать проверку на правильность клиентского токена, и если все совпадает тогда вызвать нужный ивент

    Events.call(eventName, ...args);
});

export default AntiCheat;