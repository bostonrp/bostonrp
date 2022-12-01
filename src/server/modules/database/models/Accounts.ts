
// IMPORTS

import { DataTypes } from 'sequelize'
import { DBModel } from '../index';

// CODE

const Accounts = new DBModel('accounts', {
    email: {
        type: DataTypes.CHAR({ length: 50 }),
        allowNull: false
    },
    
    username: {
        type: DataTypes.CHAR({ length: 25 }),
        allowNull: false
    },

    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    socialID: {
        type: DataTypes.CHAR({ length: 50 }),
        allowNull: false
    },

    socialName: {
        type: DataTypes.CHAR({ length: 50 }),
        allowNull: false
    },

    hwid: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    reg_ip: {
        type: DataTypes.CHAR({ length: 25 }),
        allowNull: false
    },
    
    last_ip: {
        type: DataTypes.CHAR({ length: 25 }),
        allowNull: false
    },

    reg_date: {
        type: DataTypes.BIGINT,
        allowNull: true,
        defaultValue: Date.now()
    },

    last_date: {
        type: DataTypes.BIGINT,
        allowNull: true,
        defaultValue: Date.now()
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