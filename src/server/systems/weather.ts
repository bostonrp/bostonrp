
// IMPORTS

import WorldWeather from "@database/world_weather";
import methods from "../modules/methods";
import terminal from "../modules/terminal";
import * as enums from '@shared/enums/server/weather/index';
import Time from "./time";

// CODE

class Category {
    private _current:keyof TBoston.Weather.names|'NONE' = 'NONE';

    public name:string;

    constructor(name:string, weather:keyof TBoston.Weather.names|'NONE' = 'NONE') {
        this.name = name;
        this.setCurrent(weather.trim() as keyof TBoston.Weather.names|'NONE');

        if(this._current != 'NONE') return;
        this.generate();
    }

    // SETTERS

    public setCurrent(weather:keyof TBoston.Weather.names|'NONE') {
        this._current = weather;
    }

    // GETTERS

    public getName() {
        return this.name;
    }

    public getCurrentWeather() {
        return this._current;
    }

    // OTHERS

    public async save() {
        try {
            let name = this.name;

            await WorldWeather.methods?.update({
                [name]: this._current
            }, { where: { id: 1 } });
        } catch(e) { terminal.warning(e); }
    }

    public generate() {
        try {
            let _currentSeason = Time.getSeasonName();
        
            if(_currentSeason !== null) {
                let _weathers = enums.getWeatherBySeasons(_currentSeason);

                if(_weathers) {
                    let _weather = this._generateWeather(_weathers);
                    this._current = _weather;

                    this.save();
                }
            }
        } catch(e) { terminal.error(e); }
    }

    //? Генерирует погоду если она еще не определена в базе
    private _generateWeather(weathers:Array<keyof TBoston.Weather.names>):keyof TBoston.Weather.names {
        return enums.weatherTypes[methods.randomInt(0, (weathers.length - 1))];
    }
}

class Weather {
    public static south_ls:Category;
    public static central_ls:Category;
    public static north_ls:Category;
    public static beaches_ls:Category;
    public static eastern_valley:Category;
    public static beaches_costal:Category;
    public static north_ls_hills:Category;
    public static grand_senora_desert:Category;
    public static northern_mountains:Category;
    public static zancudo:Category;
    public static paleto:Category;

    public static async load() {
        terminal.debugDetailed('Weather.load();');
        await WorldWeather.methods?.findOrCreate({ where: { id: 1 } });

        try {
            let _weather:any = await WorldWeather.methods?.findOne({ where: { id: 1 } });

            if(_weather) {
                this.south_ls = new Category('south_ls', _weather.south_ls);
                this.central_ls = new Category('central_ls', _weather.central_ls);
                this.north_ls = new Category('north_ls', _weather.north_ls);
                this.beaches_ls = new Category('beaches_ls', _weather.beaches_ls);
                this.eastern_valley = new Category('eastern_valley', _weather.eastern_valley);
                this.beaches_costal = new Category('beaches_costal', _weather.beaches_costal);
                this.north_ls_hills = new Category('north_ls_hills', _weather.north_ls_hills);
                this.grand_senora_desert = new Category('grand_senora_desert', _weather.grand_senora_desert);
                this.northern_mountains = new Category('northern_mountains', _weather.northern_mountains);
                this.zancudo = new Category('zancudo', _weather.zancudo);
                this.paleto = new Category('paleto', _weather.paleto);
            } else {
                terminal.error(`[Weather] Погода не смогла загрузиться из-за недостатка данных в бд`);
            }
        } catch(e) { terminal.error(e); }
    }

    public static generateNewWeather() {
        this.south_ls.generate();
        this.central_ls.generate();
        this.north_ls.generate();
        this.beaches_ls.generate();
        this.eastern_valley.generate();
        this.beaches_costal.generate();
        this.north_ls_hills.generate();
        this.grand_senora_desert.generate();
        this.northern_mountains.generate();
        this.zancudo.generate();
        this.paleto.generate();
    }

    public static async save() {
        terminal.debugDetailed('Weather.save();');

        try {
            await WorldWeather.methods?.update({
                south_ls: this.south_ls.getCurrentWeather(),
                central_ls: this.central_ls.getCurrentWeather(),
                north_ls: this.north_ls.getCurrentWeather(),
                beaches_ls: this.beaches_ls.getCurrentWeather(),
                eastern_valley: this.eastern_valley.getCurrentWeather(),
                beaches_costal: this.beaches_costal.getCurrentWeather(),
                north_ls_hills: this.north_ls_hills.getCurrentWeather(),
                grand_senora_desert: this.grand_senora_desert.getCurrentWeather(),
                northern_mountains: this.northern_mountains.getCurrentWeather(),
                zancudo: this.zancudo.getCurrentWeather(),
                paleto: this.paleto.getCurrentWeather(),
            }, { where: { id: 1 } });
        } catch(e) { terminal.error(e); }
    }

    public static getWeatherByCategory(name:string) {
        switch(name) {
            case 'SLS': return this.south_ls.getCurrentWeather();
            case 'CLS': return this.central_ls.getCurrentWeather();
            case 'NLS': return this.north_ls.getCurrentWeather();
            case 'LSB': return this.beaches_ls.getCurrentWeather();
            case 'EV': return this.eastern_valley.getCurrentWeather();
            case 'CB': return this.beaches_costal.getCurrentWeather();
            case 'NLSH': return this.north_ls_hills.getCurrentWeather();
            case 'GSD': return this.grand_senora_desert.getCurrentWeather();
            case 'NM': return this.northern_mountains.getCurrentWeather();
            case 'ZANCUDO': return this.zancudo.getCurrentWeather();
            case 'PALETO': return this.paleto.getCurrentWeather();

            default: return;
        }
    }
}

export default Weather;