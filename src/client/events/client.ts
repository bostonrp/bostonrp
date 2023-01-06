
// IMPORTS

import client from "../api/Client";

// CODE

//? Ивент, который инициализирует клиентку игрока
mp.events.add('client.init', () => {
    client.init();
});

//? Ивент, через который передается ключ для ивентов
mp.events.add('client.secret:set', (secretKey) => {
    client.setSecretCode(secretKey);
});

mp.events.add('client.send:server:notify', (text) => {
    mp.game.graphics.notify(text);
});