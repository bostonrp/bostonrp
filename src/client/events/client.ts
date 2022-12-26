
// IMPORTS

import client from "../api/Client";

// CODE

//? Ивент, который инициализирует клиентку игрока
mp.events.add('client.init', (secretKey) => {
    client.init(secretKey);
});

//? Ивент отдающий позицию метки на карте
// mp.events.addProc('client.waypoint:position:get', () => {
//     return client.getWaypointPosition();
// });

//? Ивент позволяющий узнать координату Z у земли (работает только если земля стримиться игроку)
// mp.events.addProc('client.ground:position:z:get', (position) => {
//     return client.getGroundZCoord(position);
// });