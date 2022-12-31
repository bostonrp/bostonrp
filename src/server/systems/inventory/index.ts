
// IMPORTS

import { List } from "modules/methods";
import terminal from "modules/terminal";
import Items from "./items";

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

    setCountItemByID(id:number, count:number) {
        let _item = this.getItemByID(id);
    }

    // GETTERS

    getItemByID(id:number):TBoston.Systems.Inventory.itemObject {
        return this._itemsList.getByID(id);
    }

    getItemCountByID(id:number) {
        return this.getItemByID(id).count;
    }

    // OTHERS

    // todo Если нужно то, реализовать функционал стаков для предметов
    addItem(item:TBoston.Systems.Inventory.itemObject):void {
        if(!Items.getInListByID(item.id)) return terminal.error(`[Intentory] Вы не можете выдать игроку ${this._userID} предмет с ID ${item.id} так как его не существует`);
        this._itemsList.add(item);
    }

    addItems(items:Array<TBoston.Systems.Inventory.itemObject>) {
        if(!items) return;
        items.forEach(element => {
            this._itemsList.add(element);
        });
    }

    // todo Когда будет функция со стаками, нужно будет дописать
    deleteItemByID(id:number) {
        this._itemsList.removeByID(id);
    }

    deleteItemsByIDs(ids:Array<number>) {
        if(!ids) return;
        ids.forEach(id => {
            this._itemsList.removeByID(id);
        });
    }
}

export default Inventory;