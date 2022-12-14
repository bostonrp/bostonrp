
// IMPORTS

import methods from "../modules/methods";

// CODE

class User {
    public static secret:string|undefined;
}

//? EVENT
mp.events.add('client.user:secret:update', (secret:string) => {
    User.secret = secret;
});

setTimeout(() => {
    methods.callServer('server.test', 0, 2, 5, 3);
}, 1000);

export default User;