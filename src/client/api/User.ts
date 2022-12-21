
// IMPORTS

import methods from "../modules/methods";
import Weather from "../systems/weather";

// CODE

class User {
    public static secret:string|undefined;

    public static startGettingWeather() {
        setInterval(async () => {
            let _weather = await mp.events.callRemoteProc('server.weather:category:get:by:zone', Weather.getZoneName());
            if(_weather != null) {
                Weather.setCurrent(_weather);
            }
        }, 1500);
    }
}

User.startGettingWeather();

//? EVENT
mp.events.add('client.user:secret:update', (secret:string) => {
    User.secret = secret;
});

export default User;