
// IMPORTS

// CODE

class Discord {
    private static _state:string = '';
    private static _details:string = '';

    public static set(state:string, details?:string) {
        this._state = state;
        if(details) this._details = details
    }

    public static render() {
        mp.discord.update(this._state, this._details);
    }
}

export default Discord;