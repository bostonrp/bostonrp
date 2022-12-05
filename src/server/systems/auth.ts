
// IMPORTS

import Accounts from "@database/Accounts";

// CODE

class Auth {
    public static async getAccount(id:number) {
        return await Accounts.methods?.findOne({ where: { id } });
    }
}

export default Auth;