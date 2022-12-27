
// IMPORTS

import client from "../api/Client";

// CODE

//? Ивент, который инициализирует клиентку игрока
mp.events.add('client.init', (secretKey) => {
    client.init(secretKey);
});
