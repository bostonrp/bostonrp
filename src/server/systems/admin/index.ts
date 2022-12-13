
// IMPORTS

import { Vehicle } from "src/server/api/vehicles";
import { RGB } from "src/server/modules/methods";

// CODE

mp.events.addCommand('veh', (player, _, model) => {
    let veh = new Vehicle(model, player.position);
    veh.setColor(new RGB(31, 87, 84), new RGB(31, 87, 84));
    player.putIntoVehicle(veh.handle, 0);
});

mp.events.addCommand('revive', (player, _, id:any) => {
    let _target = mp.players.at(id);

    if(!_target) return;
    _target.spawn(_target.position);
});