
// IMPORTS

import User from "api/users/user";
import Users from "../api/users/index";

// CODE

function playerDisconnect(player:PlayerMp) {
    let _user:User = Users.list.getAll().find((_player:User) => _player.dynamicID == player.id);
    _user.quit();
}

mp.events.add('playerQuit', playerDisconnect);