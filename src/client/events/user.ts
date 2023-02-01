
// IMPORTS

import rpc from "@aspidemon/rage-rpc";
import client from "../api/Client";
import user from "../api/User";

// CODE

rpc.on('client.hud:notify:send', (text) => {
    mp.game.graphics.notify(text);
});

//? Ивент отвечающий за изменение секретного ключа для античита
rpc.on('client.user:secret:update', (secret) => {
    user.secret = secret;
});

//? Ивент дающий возможность изменять прозрачность игрока
rpc.on('client.user:alpha:set', (alpha) => {
    user.setAlpha(alpha);
});

//? Ивент дающий возможность изменять прозрачность игрока
rpc.on('client.user:visible:set', (status) => {
    user.setVisible(status);
})

//? Ивент, который включает/выключает неубиваемость (godmode) игрока
rpc.on('client.user:invincible:set', (status) => {
    user.setInvincible(status);
});

//? Ивент, который замораживает/размораживает персонажа
rpc.on('client.user:freeze:set', (status) => {
    user.setFreeze(status);
});

rpc.on('client.user:waypoint:spawn', () => {
    client.spawnToWaypoint();
});