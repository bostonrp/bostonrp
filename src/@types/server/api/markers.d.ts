
// CODE

declare namespace TBoston.Markers {
    interface color {
        r:number;
        g:number;
        b:number;
        a:number;
    }

    interface createOptions {
        type:number;
        position:Vector3;
        scale:number;
        direction?:Vector3;
        rotation?:Vector3;
        color?:color;
        visible?:boolean;
        dimension?:number;
    }
}