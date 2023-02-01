
// IMPORTS

import rpc from "@aspidemon/rage-rpc";
import { mainBrowser } from "./Browser";

// CODE

const localPlayer = mp.players.local;

rpc.on("auth:cef:hide", () => {
    mp.console.logInfo("Disable")
    mainBrowser.call('cef.auth:visible:set', false);

    mp.gui.cursor.show(false, false);
    mp.gui.chat.show(true);
    mp.gui.chat.activate(true);
    mp.game.ui.displayRadar(true);
    localPlayer.freezePosition(false);
})