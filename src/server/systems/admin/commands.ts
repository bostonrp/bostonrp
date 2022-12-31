
// IMPORTS

import terminal from "modules/terminal";
import Admin from ".";

// CODE

mp.events.addCommand('campos', (player) => {
    Admin.getCameraPosition(player.id)
});

mp.events.add('server.camera:position:send', (player, position, pointAtCoord) => {
    const pos:Vector3 = JSON.parse(position);
    const point2 = JSON.parse(pointAtCoord);
    let point = point2.position;

    terminal.log(`${pos.x.toFixed(4)}, ${pos.y.toFixed(4)}, ${pos.z.toFixed(4)} (${point.x.toFixed(4)}, ${point.y.toFixed(4)}, ${point.z.toFixed(4)})`);
})

mp.events.addCommand('pos', (player) => {
    terminal.log(Admin.getPosition(player.id));
});

mp.events.addCommand('tw', (player) => {
    Admin.teleportToWaypoint(player.id);
});

mp.events.addCommand('time', (player, _, hour, minute) => {
    Admin.setWorldTime(player.id, parseInt(hour), parseInt(minute));
});

mp.events.addCommand('weather', (player, _, name) => {
    Admin.setWeather(player.id, name);
});

mp.events.addCommand('god', (player, _, id) => {
    Admin.setInvincible(parseInt(id), true);
});

mp.events.addCommand('inv', (player, _, id) => {
    Admin.setInvisible(parseInt(id), true);
});

mp.events.addCommand('slap', (player, _, id) => {
    Admin.slap(parseInt(id));
});

mp.events.addCommand('veh', (player, _, model) => {
    Admin.createVehicle(player.id, model);
});

mp.events.addCommand('revive', (player, _, id) => {
    Admin.revive(parseInt(id));
});