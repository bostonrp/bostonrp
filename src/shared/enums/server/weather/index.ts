
// IMPORTS

// CODE

export const weatherTypes:Array<keyof TBoston.Weather.names> = [
    "CLEAR",
    "EXTRASUNNY",
    "CLOUDS",
    "OVERCAST",
    "RAIN",
    "CLEARING",
    "THUNDER",
    "SMOG",
    "FOGGY",
    "XMAS",
    "SNOWLIGHT",
    "BLIZZARD"
];

export const getCategoryNameByZoneName = (name:string) => {
    return getCategoryNameByID(zones[`${name}`]);
}

//? Возвращает все погодные условия для определенного времени года
export const getWeatherBySeasons = (name:string):Array<keyof TBoston.Weather.names>|undefined => {
    switch(name) {
        case 'winter': return [ 'EXTRASUNNY', 'CLOUDS', 'SMOG', 'SNOWLIGHT' ];
        case 'summer': return [ 'EXTRASUNNY', 'CLEAR', 'CLEARING' ];
        case 'spring': return [ 'EXTRASUNNY', 'CLEAR', 'CLEARING', 'SMOG', 'CLOUDS', 'FOGGY', 'RAIN', 'THUNDER' ];
        case 'autumn': return [ 'FOGGY', 'CLEAR', 'SMOG', 'RAIN', 'THUNDER', 'CLOUDS', 'NEUTRAL' ];

        default: return;
    }
}

//? Возвращает имя категории исходя из полученного ид
export const getCategoryNameByID = (number:number) => {
    switch(number) {
        case 0: return 'SLS'; // South Los Santos
        case 1: return 'CLS'; // Central Los Santos
        case 2: return 'NLS'; // North Los Santos
        case 3: return 'LSB'; // Los Santos Beaches
        case 4: return 'EV'; // Eastern Valley
        case 5: return 'CB'; // Costal Beaches
        case 6: return 'NLSH'; // North Los Santos Hills
        case 7: return 'GSD'; // Grand Senora Desert
        case 8: return 'NM'; // Northem Mountains
        case 9: return 'ZANCUDO'; // Zancudo
        case 10: return 'PALETO'; // Paleto

        default: return;
    }
};

//? Возвращает соприкасающиеся категории с отправленной категорией районов
export const getTouchingCategories = (name:keyof TBoston.Weather.categoryNames) => {
    switch(name) {
        case 'SLS': return [ 'LSB', 'CLS', 'EV' ];
        case 'CLS': return [ 'SLS', 'EV', 'NLS', 'LSB' ];
        case 'NLS': return [ 'CLS', 'LSB', 'NLSH', 'EV'];
        case 'LSB': return [ 'CB', 'NLS', 'CLS', 'SLS'];
        case 'EV': return [ 'GSD', 'NLSH', 'NLS', 'CLS', 'SLS' ];
        case 'NLSH': return [ 'NLS', 'EV', 'GSD', "ZANCUDO", "CB" ];
        case 'CB': return [ 'LSB', 'NLS', 'ZANCUDO' ];
        case 'GSD': return [ 'EV', 'NLSH', 'ZANCUDO', 'NM' ];
        case 'ZANCUDO': return [ 'CB', 'NLSH', "GSD", 'NM', "PALETO" ];
        case 'PALETO': return [ 'ZANCUDO', 'NM' ];
        case 'NM': return [ 'PALETO', 'ZANCUDO', 'GSD' ];

        default: return [];
    }
};

//? Список районов с ид категории к которой они относятся
export const zones:any = {
    "AIRP": 0,
    "ALAMO": 7,
    "ALTA": 2,
    "ARMYB": 9,
    "BANHAMC": 5,
    "BANNING": 0,
    "BEACH": 3,
    "BHAMCA": 5,
    "BRADP": 8,
    "BRADT": 8,
    "BURTON": 2,
    "CALAFB": 7,
    "CANNY": 9,
    "CCREAK": 9,
    "CHAMH": 0,
    "CHIL": 6,
    "CHU": 5,
    "CMSW": 10,
    "CYPRE": 0,
    "DAVIS": 0,
    "DELBE": 3,
    "DELPE": 2,
    "DELSOL": 0,
    "DESRT": 7,
    "DOWNT": 2,
    "DTVINE": 2,
    "EAST_V": 2,
    "EBURO": 4,
    "ELGORL": 8,
    "ELYSIAN": 0,
    "GALFISH": 8,
    "GOLF": 2,
    "GRAPES": 7,
    "GREATC": 6,
    "HARMO": 7,
    "HAWICK": 2,
    "HORS": 2,
    "HUMLAB": 7,
    "JAIL": 7,
    "KOREAT": 1,
    "LACT": 2,
    "LAGO": 9,
    "LDAM": 2,
    "LEGSQU": 1,
    "LMESA": 1,
    "LOSPUER": 0,
    "MIRR": 2,
    "MORN": 2,
    "MOVIE": 2,
    "MTCHIL": 8,
    "MTGORDO": 8,
    "MTJOSE": 9,
    "MURRI": 1,
    "NCHU": 9,
    "NOOSE": 4,
    "OCEANA": 10,
    "PALCOV": 10,
    "PALETO": 10,
    "PALFOR": 10,
    "PALHIGH": 4,
    "PALMPOW": 7,
    "PBLUFF": 3,
    "PBOX": 1,
    "PROCOB": 10,
    "RANCHO": 0,
    "RGLEN": 6,
    "RICHM": 2,
    "ROCKF": 2,
    "RTRAK": 7,
    "SANAND": 0,
    "SANCHIA": 7,
    "SANDY": 7,
    "SKID": 1,
    "SLAB": 7,
    "STAD": 0,
    "STRAW": 0,
    "TATAMO": 4,
    "TERMINA": 0,
    "TEXTI": 1,
    "TONGVAH": 5,
    "TONGVAV": 6,
    "VCANA": 3,
    "VESP": 3,
    "VINE": 0,
    "WINDF": 7,
    "WVINE": 2,
    "ZANCUDO": 0,
    "ZP_ORT": 0,
    "ZQ_UAR": 7,
    "PROL": 0,
    "ISHeist": 0
};