
// IMPORTS

import Users, { User } from "../api/Users";

// CODE

function playerDisconnect(player:PlayerMp) {
    let _user:User = Users.list.getAll().find((_player:User) => _player.dynamicID == player.id);
    _user.quit();
}

mp.events.add('playerQuit', playerDisconnect);