
// IMPORTS

// CODE

mp.events.add('playerLeaveVehicle', (player) => {
    player.call('client.vehicle:mileage:tick:stop');
});