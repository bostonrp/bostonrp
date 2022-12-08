
// IMPORTS

import { DataTypes } from 'sequelize'
import { DBModel } from '../index';

// CODE

const InventoryItems = new DBModel('inventory_items', {
    // todo Нужно спроэектировать таблицу для айтемов в инвентаре
});

export default InventoryItems;