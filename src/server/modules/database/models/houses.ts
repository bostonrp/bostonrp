
// TODO: Переделать какиш

// // IMPORTS

// import { DataTypes } from 'sequelize';
// import { BaseModel } from '../index';

// // CODE

// const Houses = new BaseModel('houses', {
//     address: {
//         type: DataTypes.TEXT,
//         allowNull: true
//     },

//     price: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         defaultValue: 0
//     },

//     tax: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         defaultValue: 0
//     },

//     interior: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         defaultValue: 0
//     },

//     is_buy: {
//         type: DataTypes.BOOLEAN,
//         allowNull: false,
//         defaultValue: false
//     },
    
//     // interior_position: {
//     //     type: DataTypes.JSON,
//     //     allowNull: false,
//     //     defaultValue: { x: 0, y: 0, z: 0 }
//     // },

//     position: {
//         type: DataTypes.JSON,
//         allowNull: false,
//         defaultValue: { x: 0, y: 0, z: 0 }
//     }
// });

// export default Houses;