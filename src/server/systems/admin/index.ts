
// IMPORTS

import { Vehicle } from "src/server/api/Vehicles";

// CODE

mp.events.addCommand('veh', (player, _, model) => {
    let veh = new Vehicle(model, player.position);
    player.putIntoVehicle(veh.handle, 0);
});