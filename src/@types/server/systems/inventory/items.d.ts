
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

declare namespace TBoston.Systems.Inventory {
    interface itemObject {
        id:number;
        count:number;
    }

    interface createOptions {
        items:Array<itemObject>;
    }
}