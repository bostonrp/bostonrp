
// CODE

declare namespace TBoston.Systems.Auth {
    interface createAccount {
        email:string;
        username:string;
        password:string;
        socialID:string;
        socialName:string;
        hwid:string;
        ip:string;
        referal_code?:string;
        donate?:number;
    }

    interface regData {
        email:string;
        username:string;
        password:string;
        referalcode:string;
    }
}