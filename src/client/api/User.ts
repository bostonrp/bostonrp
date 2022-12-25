
// IMPORTS

// CODE

class User {
    public secret:string|undefined;
}

const user = new User();

//? EVENT
mp.events.add('client.user:secret:update', (secret) => {
    user.secret = secret;
});

export default user;