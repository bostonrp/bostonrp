
// IMPORTS

import rpc from "@aspidemon/rage-rpc";
import client from "../api/Client";

// CODE

//? Ивент, который инициализирует клиентку игрока
rpc.on('client.init', () => {
    // client.init();
});

//? Ивент, через который передается ключ для ивентов
rpc.on('client.secret:set', (secretKey) => {
    client.setSecretCode(secretKey);
});

rpc.on('client.send:server:notify', (text) => {
    mp.game.graphics.notify(text);
});