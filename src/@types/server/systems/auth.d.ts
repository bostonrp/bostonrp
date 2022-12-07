
// CODE

declare namespace TBoston.Systems.Auth {
    interface createAccount {
        email:string;
        username:string;
        password:string;
        socialID:number;
        socialName:string;
        hwid:string;
        ip:string;
        referal_code?:string;
        donate?:number;
    }
}