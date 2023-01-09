
// IMPORTS

import { DataTypes } from 'sequelize';
import { DBModel } from '../index';

// CODE

// todo Нужно описать модель таблицы для персонажей
const Characters = new DBModel('characters', {
    accountID: {
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

    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    age_months: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

    money: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },

    faction: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    faction_rank: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    job: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    adminLevel: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    helperLevel: {
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

    jailed: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },

    jailed_time: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    jailed_reason: {
        type: DataTypes.CHAR({ length: 150 }),
        allowNull: false
    },

    ban: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },

    ban_time: {
        type: DataTypes.TEXT,
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
        allowNull: false
    },

    played_time: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

    date_create: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    date_last_login: {
        type: DataTypes.TEXT,
        allowNull: false
    },
});

export default Characters;