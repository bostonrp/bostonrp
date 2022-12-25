
// IMPORTS

import { DataTypes } from 'sequelize';
import { DBModel } from '../index';

// CODE

const WhiteList = new DBModel('whitelist', {
    socialClub: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

export default WhiteList;