
// IMPORTS

import rpc from "@aspidemon/rage-rpc";

// CODE

mp.events.add('playerLeaveVehicle', (player) => {
    rpc.emitClient(player, 'client.vehicle:mileage:tick:stop');
});