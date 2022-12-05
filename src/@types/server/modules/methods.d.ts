
// CODE

declare namespace TBoston.Methods {
    // interface Root {
    //     getRealTimeToSec():string;
    //     sleep(ms:number):any;
    //     digitFormat(number:number):string;
    // }

    class RGB {
        public set(r:number, g:number, b:number, a?:number):void;
        public get():{
            r:number;
            g:number;
            b:number;
            a:number;
        };
    }
}