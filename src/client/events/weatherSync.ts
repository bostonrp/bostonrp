
// IMPORTS

import Weather from "../systems/weather";

// CODE

//? Ивент который, позволяет изменять текущую погоду на клиенте
mp.events.add('client.weather:set', (weatherName:string) => {
    Weather.setCurrent(weatherName);
});

//? Ивент который, отдает текущую район в котором находится человек
mp.events.addProc('client.weather:zone:get', () => {
    let _zoneName = Weather.getZoneName();
    return _zoneName;
});

setInterval(async () => {
    let _weather = await mp.events.callRemoteProc('server.weather:category:get:by:zone', Weather.getZoneName());
    if(_weather != null) {
        Weather.setCurrent(_weather);
    }
}, 1500);