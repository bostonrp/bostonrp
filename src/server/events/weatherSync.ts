
// IMPORTS

import Weather from "../systems/weather";
import * as enums from '../../shared/enums/server/weather/index';
import terminal from "../modules/terminal";
import rpc from "@aspidemon/rage-rpc";

// CODE

//? Функция которая возвращает погоду в определенном районе
rpc.onClientProc('server.weather:category:get:by:zone', (player, zone) => {
    let _category = enums.getCategoryNameByZoneName(zone);
    if(_category) return Weather.getWeatherByCategory(_category);
    return null;
});