import { mainBrowser } from "./Browser";

mp.events.add("auth:cef:hide", () => {
    mainBrowser.call('cef.auth:visible:set', false);
})