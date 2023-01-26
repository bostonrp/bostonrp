
// IMPORTS

import InventoryItem from "./items/InventoryItem";

// CODE

class Inventory {
    private _itemList: Map<number, InventoryItem>;

    constructor(
        private ownerId: number,
        options?:Array<InventoryItem>
    )
    {
        this._itemList = new Map();

        options?.forEach(e => {
            this._itemList.set(e.getuID(), e);
        });
    }

    //? SETTERS

    setItemCountByID(id: number, count: number) {
        let _item = this.getItemByID(id);
    }

    //? GETTERS

    getItemByID(id: number) {
        return this._itemList.get(id)
    }

    getItemCountByID(id: number) {
        return this.getItemByID(id)?.getCount()
    }

    //? OTHERS

    addItem(id: number, item: InventoryItem) {
        this._itemList.set(id, item)
    }

    addItems(items: Array<InventoryItem>) {
        items.forEach(e => {
            this._itemList.set(e.getuID(), e)
        })
    }

    deleteItemByID(id:number) {
        this._itemList.delete(id)
    }

    deleteItemsByIDs(ids: Array<number>) {
        ids.forEach(id => {
            this._itemList.delete(id)
        })
    }

    clear() {
        this._itemList = new Map();
    }
}

export default Inventory;