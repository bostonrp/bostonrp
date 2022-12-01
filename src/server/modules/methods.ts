
// IMPORTS

// CODE

let methods:TBoston.Methods.Root = {
    getRealTimeToSec() {
        let _date = new Date();
        return `${_date.getHours()}:${_date.getMinutes()}:${_date.getSeconds()}`;
    },

    async sleep(ms:number) {
        return new Promise(res => setTimeout(res, ms));
    }
};

export default methods;