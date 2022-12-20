
// IMPORTS

// CODE

//? Типы топлива
export const types = {
    'regular': 0, // 82
    'plus': 1, // 87
    'supreme': 2, // 92
    'diesel': 3, // Дизель
    'jet': 4, // Авиатопливо
    'infinity': 5, // Бесконечное
    'none': 6, // Без топлива
    'electro': 7 // Электричество
}

export const coefficient:any = {
    'regular': 0.0035,
    'plus': 0.0025,
    'supreme': 0.003,
    'diesel': 0.0015,
    'jet': 0.01,
    'electro': 0.004,
    'infinity': 0,
}