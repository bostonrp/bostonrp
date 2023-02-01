
// IMPORTS

import rpc from "@aspidemon/rage-rpc";
import Vehicles from "../api/vehicles";

// CODE

rpc.on('server.vehicle:mileage:add', (player, vehicleID, count) => {
    let _vehicle = Vehicles.list.getByID(vehicleID);
    if(_vehicle) _vehicle.mileage.add(count);
});