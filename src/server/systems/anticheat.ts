
// IMPORTS

import User from "api/users/user";
import { ignoreEvents } from "../../shared/enums/server/anticheat";
import Events from "../api/Events";
import Users from "../api/users/index";
import { LogFile } from "../modules/logs";

// CODE

const logs = new LogFile('anticheat_events');

class AntiCheat {
    
}

//? EVENT
mp.events.add('server.anticheat:events:call', (player:PlayerMp, eventName:any, secret:string, ...args:any) => {
    let _user:User = Users.list.getAll().find((_player:User) => _player.dynamicID == player.id);
    if(!_user) return;

    if(_user.secret === secret) {
        _user.generateSecret();

        let event = ignoreEvents.find(_name => _name == eventName);
        if(event == undefined) logs.write(`Игрок ${_user.getName()} (ID: ${_user.staticID}) вызвал ивент '${eventName}' с аргументами: ${JSON.stringify(args)}`);
        
        Events.call(player, eventName, ...args);
    } else {
        logs.write(`Игрок ${_user.getName()} (ID: ${_user.staticID}) попытался вызвать инвент '${eventName}' с аргументами: ${JSON.stringify(args)} с неверным/без секретным ключем\nКлюч: ${secret}`);
        // player.kickSilent();
    }
});

export default AntiCheat;