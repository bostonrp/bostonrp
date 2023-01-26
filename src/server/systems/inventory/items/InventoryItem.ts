
// IMPORTS

// CODE

// todo Не совсем понятно зачем тебе два класса с абсолютно идентичным названием
class InventoryItem {
    private _uID: number;
    private _itemID: number;
    private _count: number;

    constructor(
        itemId: number,
        count: number,
    ) {
        this._itemID = itemId
        this._count = count
    }

    //? SETTERS

    //? GETTERS

    public getuID() {
        return this._uID
    }

    public getItemId() {
        return this._itemID
    }

    public getCount() {
        return this._count
    }

    //? OTHERS

    public addCount(count: number) {
        this._count += count
    }

    public subCount(count: number) {
        this._count -= count
    }
}

export default InventoryItem;