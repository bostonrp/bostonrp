
// IMPORTS

import methods, { List } from "../../modules/methods";
import terminal from "../../modules/terminal";
import User from "./user";

// CODE

class Users {
    public static list = new List('Users');

    // public static getByStaticID(staticID:number):User {
    //     return this.list.getByID(staticID);
    // }

    public static getByDynamicID(id:number): User {
        return this.list.getByID(id);
    }

    public static getSecretExists(secret:string) {
        let _result = this.list.getAll().find((_player:User) => _player.secret == secret);

        if(_result != undefined) return true;
        return false;
    }

    // todo Возможно не будет использоваться
    public static exists(id:number):boolean {
        let _player = mp.players.at(id);
        if(_player !== null) return true;
        return false;
    }
}

export default Users;