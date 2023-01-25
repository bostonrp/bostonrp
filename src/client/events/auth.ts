
// IMPORTS

import methods from "modules/methods";

// CODE

mp.events.add('client.auth:register:send:server', (data:string) => {
    methods.callServer('server.auth:register:send', data);
});

mp.events.add('client.auth:login:send:server', (data:string) => {
    methods.callServer('server.auth:login:send', data);
});