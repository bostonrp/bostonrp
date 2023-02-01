
// CODE

declare namespace TBoston.Users {
    interface createOptions {
        dynamic_id:number;
        username:string;
        social_id:number;
        social_name:string;
        ip?:string;
    }
}

declare namespace TBoston.Users.Economy {
    interface createOptions {
        cash:number;
        max_cash:number;
    }
}