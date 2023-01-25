
// CODE

declare namespace TBoston.Systems.Inventory.Items {
    interface createOptions {
        id?:number;
        subtype?:number;
        description?:string;
        image?:string;
        maxStack?:number;
        weight?:number;
        interaction?:string;
        durability?:number;
    }
}