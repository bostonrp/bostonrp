
// IMPORTS

// CODE

class Weather {
    public static current:string = 'NONE';
    public static zone:string;

    public static setCurrent(weatherName:string) {
        if(this.current == weatherName) return;
        this.current = weatherName;
        this.updateWeather(this.current);
    }

    public static updateWeather(weather:string) {
        mp.game.gameplay.setWeatherTypeOverTime(weather, 3);
        mp.console.logInfo(`${weather}`);
    }

    public static getZoneName() {
        let _position = mp.players.local.position;
        return mp.game.zone.getNameOfZone(_position.x, _position.y, _position.z);
    }
}

export default Weather;