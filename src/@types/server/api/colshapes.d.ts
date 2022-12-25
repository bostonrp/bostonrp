
// CODE

declare namespace TBoston.API.Colshapes {
    interface createOptions {
        marker:{
            type:number;
            scale?:number;
            color?:TBoston.Methods.RGB;
        };

        dimension?:number;
    }
}