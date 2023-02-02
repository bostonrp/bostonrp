
// IMPORTS

import rpc from "@aspidemon/rage-rpc";
import { mainBrowser } from "api/Browser";
import methods from "modules/methods";

// CODE

rpc.on('client.auth:register:send:server', (data:string) => {
    methods.callServer('server.auth:register:send', data);
});

rpc.on('client.auth:login:send:server', (data:string) => {
    methods.callServer('server.auth:login:send', data);
});

rpc.on("client.auth:cef:hide", () => {
    mainBrowser.call('cef.auth:visible:set', false);

    mp.gui.cursor.show(false, false);
    mp.gui.chat.show(true);
    mp.gui.chat.activate(true);
    mp.game.ui.displayRadar(true);
    mp.players.local.freezePosition(false);
});