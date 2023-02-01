
// IMPORTS

import rpc from "@aspidemon/rage-rpc";
import Vehicle from "../api/Vehicle";

// CODE

//? Запускает тик просчета пробега автомобиля
rpc.on('client.vehicle:mileage:tick:start', () => {
    Vehicle.startTickMileage();
});

//? Останавливает тик просчета пробега автомобиля
rpc.on('client.vehicle:mileage:tick:stop', () => {
    Vehicle.stopTickMileage();
});

//? Ивент отдающий текущую скорость автомобиля
rpc.on('client.vehicle:speed:get', () => {
    let _vehicle = mp.players.local.vehicle;
    if(_vehicle) return _vehicle.getSpeed();
    return null;
});