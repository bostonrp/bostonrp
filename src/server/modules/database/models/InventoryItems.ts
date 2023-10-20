
// IMPORTS

import { DataTypes } from 'sequelize';
import { BaseModel } from '../index';

// CODE

const InventoryItems = new BaseModel('inventory_items', {
    name: {
        type: DataTypes.CHAR({ length: 25 }),
        allowNull: false
    },

    type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },

    subtype: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },

    description: {
        type: DataTypes.CHAR({ length: 70 }),
        allowNull: true
    },

    image: {
        type: DataTypes.CHAR({ length: 20 }),
        allowNull: true,
        defaultValue: null
    },

    maxStack: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },

    weight: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0
    },

    interaction: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    },

    durability: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
});

export default InventoryItems;