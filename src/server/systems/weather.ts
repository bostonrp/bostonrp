
// IMPORTS

import WorldWeather from "@database/world_weather";
import methods from "../modules/methods";
import terminal from "../modules/terminal";

// CODE

class Weather {
    public static current:string;

    public static async load() {
        terminal.debugDetailed('Weather.load();');

        let _performance = methods.getPerfomance(async () => {
            let _weather = await WorldWeather.methods?.findOne({ where: { id: 1 } });

        });
    }

    private static async _tick() {

    }

    public static getCategoryNameByZoneName(name:string) {
        
    }
}

export default Weather;