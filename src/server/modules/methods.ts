
// IMPORTS

// CODE

let methods:TBoston.Methods.Root = {
    getRealTimeToSec() {
        let _date = new Date();
        return `${this.digitFormat(_date.getHours())}:${this.digitFormat(_date.getMinutes())}:${this.digitFormat(_date.getSeconds())}`;
    },

    async sleep(ms:number) {
        return new Promise(res => setTimeout(res, ms));
    },

    digitFormat(number:number) {
        return ("0" + number).slice(-2);
    }
};

export default methods;