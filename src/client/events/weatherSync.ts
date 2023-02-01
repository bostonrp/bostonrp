
// IMPORTS

import rpc from '@aspidemon/rage-rpc';
import Weather from "../systems/weather";

// CODE

//? Ивент который, позволяет изменять текущую погоду на клиенте
rpc.on('client.weather:set', (weatherName) => {
    Weather.setCurrent(weatherName);
});

//? Ивент который, отдает текущую район в котором находится человек
rpc.onServerProc('client.weather:zone:get', () => {
    let _zoneName = Weather.getZoneName();
    return _zoneName;
});