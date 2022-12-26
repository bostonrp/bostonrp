
// IMPORTS

// CODE

class User {
    public secret:string|undefined;

    // SETTERS

    public setAlpha(number:number) {
        if(number < 0 || number > 255) return;
        mp.players.local.setAlpha(number);
    }

    public setInvincible(status:boolean = false) {
        mp.players.local.setInvincible(status);
    }

    public setFreeze(status:boolean) {
        mp.players.local.freezePosition(status);
    }

    // GETTERS

    // OTHERS
}

const user = new User();
export default user;