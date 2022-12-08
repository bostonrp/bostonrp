
// IMPORTS

// CODE

mp.events.add('playerEnterVehicle', (player) => {
    player.call('client.vehicle:mileage:tick:start');
});