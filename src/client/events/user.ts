
// IMPORTS

import client from "../api/Client";
import user from "../api/User";

// CODE

mp.events.add('client.hud:notify:send', (text) => {
    mp.game.graphics.notify(text);
});

//? Ивент отвечающий за изменение секретного ключа для античита
mp.events.add('client.user:secret:update', (secret) => {
    user.secret = secret;
});

//? Ивент дающий возможность изменять прозрачность игрока
mp.events.add('client.user:alpha:set', (alpha) => {
    user.setAlpha(alpha);
});

//? Ивент дающий возможность изменять прозрачность игрока
mp.events.add('client.user:visible:set', (status) => {
    user.setVisible(status);
})

//? Ивент, который включает/выключает неубиваемость (godmode) игрока
mp.events.add('client.user:invincible:set', (status) => {
    user.setInvincible(status);
});

//? Ивент, который замораживает/размораживает персонажа
mp.events.add('client.user:freeze:set', (status) => {
    user.setFreeze(status);
});

mp.events.add('client.user:waypoint:spawn', () => {
    client.spawnToWaypoint();
});