
// IMPORTS

import { DataTypes } from 'sequelize'
import { DBModel } from '../index';

// CODE

// todo Нужео описать модель таблицы для персонажей
const Characters = new DBModel('characters', {
    name: {
        type: DataTypes.CHAR({ length: 25 }),
        allowNull: false
    },

    surname: {
        type: DataTypes.CHAR({ length: 25 }),
        allowNull: false
    }
});

export default Characters;