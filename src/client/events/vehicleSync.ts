
// IMPORTS

import Vehicle from "../api/Vehicles";

// CODE

mp.events.add('client.vehicle:mileage:tick:start', () => {
    Vehicle.startTickMileage();
});

mp.events.add('client.vehicle:mileage:tick:stop', () => {
    Vehicle.stopTickMileage();
});