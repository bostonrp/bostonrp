
// IMPORTS

import InventoryItems from "@database/inventory_items";
import methods from "src/server/modules/methods";
import { List } from "src/server/modules/methods";
import terminal from "src/server/modules/terminal";

// CODE

// todo Нужно сделать айтемы для инвентаря
class Items {
    public static list = new List('InventoryItems');

    public static async loadAll() {
        terminal.debugDetailed('InventoryItems.loadAll();');
        
        try {
            let _items = await InventoryItems.methods?.findAll();
            let _count = 0;

            let _perfomance = methods.getPerfomance(() => {
                _items?.forEach((element:any) => {
                    new Item(element.type, element.name,{
                        id: element.id,
                        description: element.description,
                        durability: element.durability,
                        image: element.image,
                        interaction: element.interaction,
                        maxStack: element.maxStack,
                        subtype: element.subtype,
                        weight: element.weight
                    });

                    _count++;
                });
            });

            terminal.done(`[InventoryItems] Было загружено ${_count} предметов`, `${_perfomance}ms`);
        } catch(e) { terminal.error(e); }
    }

    public static getInListByID(id:number):Item {
        return this.list.getByID(id);
    }
}

export class Item {
    private _id?:number;
    private _name:string = '';
    private _type:number = 0;
    private _subtype?:number;
    private _description?:string;
    private _image?:string;
    private _maxStack?:number;
    private _weight?:number;
    private _interaction?:string;
    private _durability?:number;
    
    constructor(type:number, name:string, options?:TBoston.Systems.Inventory.Items.createOptions) {
        this._id = options?.id;

        this.setName(name);
        this.setType(type);
        this.setSubType(options?.subtype);;
        this.setDescription(options?.description);
        this.setMaxStack(options?.maxStack);
        this.setWeight(options?.weight);
        this.setInteraction(options?.interaction);
        this.setDurability(options?.durability);

        Items.list.add(this);
    }

    // SETTERS

    public setDurability(number?:number) {
        this._durability = number;
    }

    public setInteraction(functionName?:string) {
        this._interaction = functionName;
    }

    public setWeight(number?:number) {
        this._weight = number;
    }

    public setMaxStack(number?:number) {
        this._maxStack = number;
    }

    public setDescription(text?:string) {
        this._description = text;
    }
    
    public setImage(name?:string) {
        this._image = name;
    }

    public setName(text:string) {
        this._name = text;
    }

    public setType(number:number) {
        this._type = number;
    }

    public setSubType(number?:number) {
        this._subtype = number;
    }

    // GETTERS

    get id() {
        return this._id;
    }

    getName() {
        return this._name;
    }

    getType() {
        return this._type;
    }

    getSubType() {
        return this._subtype;
    }

    getDescription() {
        return this._description;
    }

    getImageURL() {
        return this._image;
    }

    getMaxStack() {
        return this._maxStack;
    }

    getWeight() {
        return this._weight;
    }

    getInteraction() {
        return this._interaction;
    }

    getDurability() {
        return this._durability;
    }

    // OTHERS
}

export default Items;