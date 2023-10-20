
// IMPORTS

import { DataTypes } from 'sequelize';
import { BaseModel } from '../index';

// CODE

// todo Нужно описать модель таблицы для персонажей
const Characters = new BaseModel('characters', {
    account_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    name: {
        type: DataTypes.CHAR({ length: 25 }),
        allowNull: false
    },

    surname: {
        type: DataTypes.CHAR({ length: 25 }),
        allowNull: false
    },

    birth_date: {
        type: DataTypes.DATE,
        allowNull: false
    },

    money: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },

    faction_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    faction_department: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },

    faction_rank: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    job_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    admin_level: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    food_satiety: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

    water_satiety: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

    health: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

    armour: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

    jailed_time: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    jailed_reason: {
        type: DataTypes.CHAR({ length: 150 }),
        allowNull: false
    },

    ban: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },

    ban_expires_at: {
        type: DataTypes.TIME,
        allowNull: false
    },

    ban_reason: {
        type: DataTypes.CHAR({ length: 150 }),
        allowNull: false
    },

    warn: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    customization: {
        type: DataTypes.JSON,
        allowNull: false
    },

    skills: {
        type: DataTypes.JSON,
        allowNull: false
    },

    licenses: {
        type: DataTypes.JSON,
        allowNull: false
    },

    settings: {
        type: DataTypes.JSON,
        allowNull: false
    },

    is_online: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },

    played_time: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    },

    date_create: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: Date.now()
    },

    date_last_login: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: Date.now()
    },
});

export default Characters;