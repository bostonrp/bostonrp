
// IMPORTS

import { DataTypes } from 'sequelize'
import { DBModel } from '../index';

// CODE

const WorldTime = new DBModel('world_time', {
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2010
    },

    month: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },

    day: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },

    hour: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 8
    },

    minute: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
});

setTimeout(() => {
    WorldTime.methods?.findOrCreate({ where: { id: 1 } });
}, 1000);

export default WorldTime;