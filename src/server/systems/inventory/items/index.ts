import InventoryItems from "modules/database/models/inventory_items";
import methods from "modules/methods";
import { List } from "modules/methods";
import terminal from "modules/terminal";
import Item from "./Item";

export default class Items {
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

    public static getInListByID(id:number): Item {
        return this.list.getByID(id);
    }
}