
// CODE

declare namespace TBoston.Client.Modules.RPC {
    class struct {
        constructor(debug:boolean);
        public on(eventName:string, handler:(...args:any[]) => void):void;
        public off(eventName:string):void;
        public emit(eventName:string, ...args:any[]):void;
        public emitProc(eventName:string, ...args:any[]):Promise<any>;
        public emitServer(eventName:string, ...args:any[]):void;
        public emitServerProc(eventName:string, ...args:any[]):Promise<any>;
        public emitCEF(eventName:string, ...args:any[]):void;
        public emitCEFProc(eventName:string, ...args:any[]):Promise<any>;
    }
}