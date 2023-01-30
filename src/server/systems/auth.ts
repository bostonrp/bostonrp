
// IMPORTS

import Accounts from "../modules/database/models/accounts";
import methods from "../modules/methods";

// CODE

class Auth {
    public static async getAccountByKey(key:string, value:any):Promise<any> {
        return await Accounts.methods?.findOne({ where: { [key]: value } });
    }

    public static generatePasswordHash(password:string) {
        let _passwordHash = null;
        _passwordHash = methods.createCryptoHash(password, 'md5');
        _passwordHash = methods.createCryptoHash(_passwordHash, 'sha256');
        _passwordHash = methods.createCryptoHash(_passwordHash, 'md5');
        return _passwordHash;
    }

    // todo ты не можешь сохранять не шифрованый пароль в базу, это не безопасно
    public static async createAccount(options?:TBoston.Systems.Auth.createAccount) {
        if(!options) return;

        await Accounts.methods?.create({
            email: options.email,
            username: options.username,
            password: options.password,
            social_id: options.social_id,
            social_name: options.social_name,
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
        if(!await this.getAccountByKey('id', id)) return;
        Accounts.methods?.destroy({ where: { id } });
    }
}

export default Auth;