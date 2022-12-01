
// CODE

declare namespace TBoston.Terminal {
    interface Root {
        log(text:any, ...args:any[]):void;
        warning(text:any, ...args:any[]):void;
        error(text:any, ...args:any[]):void;
        debug(text:any, ...args:any[]):void;
        debugDetailed(text:any, ...args:any[]):void;
        // clear?():void;
    }
}