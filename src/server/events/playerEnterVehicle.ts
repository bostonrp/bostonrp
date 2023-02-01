
// IMPORTS

import rpc from "@aspidemon/rage-rpc";

// CODE

mp.events.add('playerEnterVehicle', (player) => {
    rpc.emitClient(player, 'client.vehicle:mileage:tick:start');
});