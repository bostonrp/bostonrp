
// IMPORTS

import Weather from "../systems/weather";
import user from "./User";

// CODE

class Client {
    public init(secretKey:string) {
        user.secret = secretKey;
        
        Weather.startGettingInZone();
    }
}

const client = new Client();

//? EVENTS
mp.events.add('client.init', (secretKey) => {
    client.init(secretKey);
});

export default client;