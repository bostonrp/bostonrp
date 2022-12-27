
// IMPORTS

import { activeCamera } from "../api/Camera";
import AntiCheat from "../systems/anticheat";

// CODE

//? Ивент, который отдает координаты активной камеры
mp.events.add('client.camera:position:get', (name) => {
    AntiCheat.callServer('server.camera:position:send', JSON.stringify(activeCamera.getPosition()), JSON.stringify(activeCamera.pointingAt(1000)), name);
});
