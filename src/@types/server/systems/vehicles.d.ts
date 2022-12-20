
// CODE

declare namespace TBoston.API.Vehicles {
    interface createOptions {
        fuel?:number;
        fuelMax?:number;
        fuelType?:keyof TBoston.API.Vehicles.Fuel.types,
        mileage?:number;
    }
}

// FUEL

declare namespace TBoston.API.Vehicles.Fuel {
    interface creationOptions {
        maxBank?:number;
        bank?:number;
        type?:keyof types;
    }

    interface types {
        regular:string; // 87
        plus:string; // 89
        supreme:string; // 92
        diesel:string; // Дизель
        jet:string; // Авиатопливо
        infinity:string; // Бесконечное топливо
        none:string; // Без топлива
        electro:string; // Электричество
    }
}

// MILEAGE

declare namespace TBoston.API.Vehicles.Mileage {
    interface creationOptions {
        mileage?:number;
    }
}