
// IMPORTS

import Accounts from "@database/Accounts";
import methods from "../modules/methods";
import terminal from "../modules/terminal";

// CODE

class Auth {
    public static async getAccount(id:number) {
        return await Accounts.methods?.findOne({ where: { id } });
    }

    // todo Возможно и не потребуется
    public static async hasAccount(id:number) {
        if(!!this.getAccount(id)) return true;
        return false;
    }

    public static async createAccount(options?:TBoston.Systems.Auth.createAccount) {
        if(!options) return;

        let passwordHash = null;
        passwordHash = methods.createCryptoHash(options.password, 'md5');
        passwordHash = methods.createCryptoHash(passwordHash, 'sha256');
        passwordHash = methods.createCryptoHash(passwordHash, 'md5');

        await Accounts.methods?.create({
            email: options.email,
            username: options.username,
            password: passwordHash,
            socialID: options.socialID,
            socialName: options.socialName,
            hwid: options.hwid,
            reg_ip: options.ip,
            last_ip: options.ip,
            reg_date: Date.now(),
            last_date: Date.now(),
            referal_code: options.referal_code,
            donate: options.donate
        });
    }

    public static async deleteAccount(id:number) {
        if(!await this.hasAccount(id)) return;
        Accounts.methods?.destroy({ where: { id } });
    }
}

export default Auth;