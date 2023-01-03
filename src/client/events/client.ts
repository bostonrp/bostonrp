
// IMPORTS

import client from "../api/Client";

// CODE

//? Ивент, который инициализирует клиентку игрока
mp.events.add('client.init', (secretKey) => {
    client.init(secretKey);
});

mp.events.add('client.send:server:notify', (text) => {
    mp.game.graphics.notify(text);
});