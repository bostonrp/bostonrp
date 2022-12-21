
// IMPORTS

import { DataTypes } from 'sequelize';
import { DBModel } from '../index';

// CODE

const WorldWeather = new DBModel('world_weather', {
    south_ls: {
        type: DataTypes.CHAR({ length: 15 }),
        allowNull: false,
        defaultValue: 'NONE'
    },

    central_ls: {
        type: DataTypes.CHAR({ length: 15 }),
        allowNull: false,
        defaultValue: 'NONE'
    },

    north_ls: {
        type: DataTypes.CHAR({ length: 15 }),
        allowNull: false,
        defaultValue: 'NONE'
    },

    beaches_ls: {
        type: DataTypes.CHAR({ length: 15 }),
        allowNull: false,
        defaultValue: 'NONE'
    },

    eastern_valley: {
        type: DataTypes.CHAR({ length: 15 }),
        allowNull: false,
        defaultValue: 'NONE'
    },

    beaches_costal: {
        type: DataTypes.CHAR({ length: 15 }),
        allowNull: false,
        defaultValue: 'NONE'
    },

    north_ls_hills: {
        type: DataTypes.CHAR({ length: 15 }),
        allowNull: false,
        defaultValue: 'NONE'
    },

    grand_senora_desert: {
        type: DataTypes.CHAR({ length: 15 }),
        allowNull: false,
        defaultValue: 'NONE'
    },

    northern_mountains: {
        type: DataTypes.CHAR({ length: 15 }),
        allowNull: false,
        defaultValue: 'NONE'
    },

    zancudo: {
        type: DataTypes.CHAR({ length: 15 }),
        allowNull: false,
        defaultValue: 'NONE'
    },

    paleto: {
        type: DataTypes.CHAR({ length: 15 }),
        allowNull: false,
        defaultValue: 'NONE'
    },
});

export default WorldWeather;