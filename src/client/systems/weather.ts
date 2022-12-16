
// IMPORTS

// CODE

class Weather {
    public static current:string;
    public static zone:string;

    public static setCurrent(weatherName:string) {
        this.current = weatherName;
    }

    public static getZoneName() {
        let _position = mp.players.local.position;
        return mp.game.zone.getNameOfZone(_position.x, _position.y, _position.z);
    }
}

export default Weather;