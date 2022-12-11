
// IMPORTS

import Events from "../api/Events";
import Vehicles from "../api/vehicles";
import terminal from "../modules/terminal";

// CODE

Events.add('server.vehicle:mileage:add', (player, vehicleID, count) => {
    let _vehicle = Vehicles.list.getByID(vehicleID);
    if(_vehicle) _vehicle.mileage.add(count);
});