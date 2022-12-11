
// IMPORTS

import { List } from "src/server/modules/methods";
import terminal from "src/server/modules/terminal";
import Items, { Item } from "./items";

// CODE

class Inventory {
    private _itemsList = new List();
    private _userID:number;

    constructor(userID:number, options?:TBoston.Systems.Inventory.createOptions) {
        this._userID = userID;
        
        options?.items.forEach((element) => {
            this._itemsList.add(element);
        });
    }

    // SETTERS

    // GETTERS

    getItemByID(id:number):TBoston.Systems.Inventory.itemObject {
        return this._itemsList.getByID(id);
    }

    getItemCountByID(id:number) {
        return this.getItemByID(id).count;
    }

    // OTHERS

    // todo Если нужно то, реализовать функционал стаков для предметов
    addItem(item:TBoston.Systems.Inventory.itemObject):any {
        if(!Items.getInListByID(item.id)) return terminal.error(`[Intentory] Вы не можете выдать игроку ${this._userID} предмет с ID ${item.id} так как её не существует`);
        this._itemsList.add(item);
    }
}

new Item(0, 'Хуй', {
    id: 1
});

let inv = new Inventory(0, {
    items: [
        { id: 1, count: 5 }
    ]
});

terminal.log(JSON.stringify(inv.getItemByID(1)));

export default Inventory;