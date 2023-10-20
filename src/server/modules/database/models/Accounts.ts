
// IMPORTS

import { DataTypes } from 'sequelize';
import { BaseModel } from '../index';

// CODE

const Accounts = new BaseModel('accounts', {
    email: {
        type: DataTypes.CHAR({ length: 35 }),
        allowNull: false
    },
    
    username: {
        type: DataTypes.CHAR({ length: 12 }),
        allowNull: false
    },

    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    social_id: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    social_name: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    hwid: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    reg_ip: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    
    last_ip: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    reg_date: {
        type: DataTypes.BIGINT,
        allowNull: false
    },

    last_date: {
        type: DataTypes.BIGINT,
        allowNull: true
    },

    developer: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },

    referal_code: {
        type: DataTypes.CHAR({ length: 25 }),
        allowNull: true
    },

    donate: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },

    is_black_list: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

export default Accounts;