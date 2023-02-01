
// IMPORTS

import rpc from "@aspidemon/rage-rpc";
import Users from "api/users/index";
import User from "api/users/user";
import terminal from "../modules/terminal";

// CODE

async function playerConnect(player:PlayerMp) {
    // player.spawn(new mp.Vector3(0, 0, 71));

    player.setClothes(2, 57, 0, 0);
    player.setClothes(4, 1, 0, 0);
    player.setClothes(6, 1, 0, 0);
    player.setClothes(8, 15, 0, 0);
    player.setClothes(11, 22, 0, 0);

    let _user = new User({
        dynamic_id: player.id,
        username: player.name,
        social_id: parseInt(player.rgscId),
        social_name: player.socialClub,
        ip: player.ip,
    });

    _user.callClient('client.init');

    terminal.info(`Игрок ${_user.username} (ID: ${_user.dynamicID}) подключился к серверу`, _user.ip);
}

mp.events.add('playerJoin', playerConnect);