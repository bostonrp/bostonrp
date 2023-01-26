import { mainBrowser } from "./Browser";

const localPlayer = mp.players.local;

mp.events.add("auth:cef:hide", () => {
    mp.console.logInfo("Disable")
    mainBrowser.call('cef.auth:visible:set', false);

    mp.gui.cursor.show(false, false);
    mp.gui.chat.show(true);
    mp.gui.chat.activate(true);
    mp.game.ui.displayRadar(true);
    localPlayer.freezePosition(false);
})