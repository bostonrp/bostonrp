
// IMPORTS

// CODE

class Weather {
    private static _interval:NodeJS.Timer|null = null;

    public static current:string = 'NONE';
    public static zone:string;

    public static setCurrent(weatherName:string) {
        if(this.current == weatherName) return;
        this.current = weatherName;
        this.updateWeather(this.current);
    }

    public static updateWeather(weather:string) {
        mp.game.gameplay.setWeatherTypeOverTime(weather, 3);
    }

    public static getZoneName() {
        let _position = mp.players.local.position;
        return mp.game.zone.getNameOfZone(_position.x, _position.y, _position.z);
    }

    public static startGetting() {
        if(this._interval != null) return;
        this._interval = setInterval(async () => {
            try {
                let _weather = await mp.events.callRemoteProc('server.weather:category:get:by:zone', Weather.getZoneName());
                if(_weather != null) {
                    Weather.setCurrent(_weather);
                }
            } catch(e) { mp.console.logError(`${e}`); }
        }, 1500);
    }

    public static stopGetting() {
        if(this._interval == null) return;
        clearInterval(this._interval);
        this._interval = null;
    }
}

export default Weather;