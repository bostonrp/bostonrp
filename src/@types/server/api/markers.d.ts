
// CODE

declare namespace TBoston.Markers {
    interface createOptions {
        type:number;
        position:Vector3;
        scale:number;
        direction?:Vector3;
        rotation?:Vector3;
        color?:TBoston.Methods.RGB;
        visible?:boolean;
        dimension?:number;
    }
}