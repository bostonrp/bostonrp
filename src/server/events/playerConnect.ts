
// IMPORTS

import { User } from "../api/Users";
import terminal from "../modules/terminal";

// CODE

function playerConnect(player:PlayerMp) {
    // player.spawn(new mp.Vector3(0, 0, 71));

    player.setClothes(2, 57, 0, 0);
    player.setClothes(4, 1, 0, 0);
    player.setClothes(6, 1, 0, 0);
    player.setClothes(8, 15, 0, 0);
    player.setClothes(11, 22, 0, 0);

    let user = new User({
        id: player.id,
        username: player.name,
        socialID: parseInt(player.rgscId),
        socialName: player.socialClub,
        ip: player.ip
    });
}

mp.events.add('playerJoin', playerConnect);