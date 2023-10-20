
// IMPORTS

import { DataTypes } from 'sequelize';
import { BaseModel } from '../index';

// CODE

const WhiteList = new BaseModel('whitelist', {
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