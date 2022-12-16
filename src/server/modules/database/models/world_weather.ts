
// IMPORTS

import { DataTypes } from 'sequelize';
import { DBModel } from '../index';

// CODE

const WorldWeather = new DBModel('world_weather', {
    south_ls: {
        type: DataTypes.CHAR({ length: 15 }),
        allowNull: false,
        defaultValue: 'CLEAR'
    },

    central_ls: {
        type: DataTypes.CHAR({ length: 15 }),
        allowNull: false,
        defaultValue: 'CLEAR'
    },

    north_ls: {
        type: DataTypes.CHAR({ length: 15 }),
        allowNull: false,
        defaultValue: 'CLEAR'
    },

    beaches_ls: {
        type: DataTypes.CHAR({ length: 15 }),
        allowNull: false,
        defaultValue: 'CLEAR'
    },

    fastern_valley: {
        type: DataTypes.CHAR({ length: 15 }),
        allowNull: false,
        defaultValue: 'CLEAR'
    },

    beaches_costal: {
        type: DataTypes.CHAR({ length: 15 }),
        allowNull: false,
        defaultValue: 'CLEAR'
    },

    north_ls_hills: {
        type: DataTypes.CHAR({ length: 15 }),
        allowNull: false,
        defaultValue: 'CLEAR'
    },

    grand_senora_desert: {
        type: DataTypes.CHAR({ length: 15 }),
        allowNull: false,
        defaultValue: 'CLEAR'
    },

    northern_mountains: {
        type: DataTypes.CHAR({ length: 15 }),
        allowNull: false,
        defaultValue: 'CLEAR'
    },

    zancudo: {
        type: DataTypes.CHAR({ length: 15 }),
        allowNull: false,
        defaultValue: 'CLEAR'
    },

    paleto: {
        type: DataTypes.CHAR({ length: 15 }),
        allowNull: false,
        defaultValue: 'CLEAR'
    },
});

export default WorldWeather;