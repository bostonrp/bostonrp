
// IMPORTS

import Vehicle from "../api/Vehicle";

// CODE

//? Запускает тик просчета пробега автомобиля
mp.events.add('client.vehicle:mileage:tick:start', () => {
    Vehicle.startTickMileage();
});

//? Останавливает тик просчета пробега автомобиля
mp.events.add('client.vehicle:mileage:tick:stop', () => {
    Vehicle.stopTickMileage();
});