
// IMPORTS

import { DataTypes } from 'sequelize';
import { DBModel } from '../index';

// CODE

const VehiclesInfo = new DBModel('vehicles_info', {
    name: {
        type: DataTypes.CHAR({ length: 15 }),
        allowNull: false
    },

    displayName: {
        type: DataTypes.CHAR({ length: 25 }),
        allowNull: false
    },

    class: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    fuelType: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    fuelMax: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    handling: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: {
            acceleration: 0.01, // number
            antiRollBarBiasFront: 0.0, // number // number
            antiRollBarBiasRear: 0.0, // number // number
            antiRollBarForce: 0.0, // number
            brakeBiasFront: 0.0, // number
            brakeBiasRear: 0.0, // number
            brakeForce: 0.0, // number
            camberStiffness: 0.0, // number
            centreOfMassOffset: { x: 0, y: 0, z: 0 },
            clutchChangeRateScaleDownShift: 0.0, // number
            clutchChangeRateScaleUpShift: 0.0, // number
            collisionDamageMult: 0.0, // number
            damageFlags: 0.0, // number
            deformationDamageMult: 0.0, // number
            downforceModifier: 0.0, // number
            driveBiasFront: 0.0, // number
            driveInertia: 0.0, // number
            driveMaxFlatVel: 0.0, // number
            engineDamageMult: 0.0, // number
            handBrakeForce: 0.0, // number
            handlingFlags: 0.0, // number
            inertiaMultiplier: { x: 0, y: 0, z: 0 },
            initialDragCoeff: 0.0, // number
            initialDriveForce: 0.0, // number
            initialDriveGears: 0.0, // number
            initialDriveMaxFlatVel: 0.0, // number
            lowSpeedTractionLossMult: 0.0, // number
            mass: 0.0, // number
            modelFlags: 0.0, // number
            monetaryValue: 0.0, // number
            oilVolume: 0.0, // number
            percentSubmerged: 0.0, // number
            percentSubmergedRatio: 0.0, // number
            petrolTankVolume: 0.0, // number
            rollCentreHeightFront: 0.0, // number
            rollCentreHeightRear: 0.0, // number
            seatOffsetDistX: 0.0, // number
            seatOffsetDistY: 0.0, // number
            seatOffsetDistZ: 0.0, // number
            steeringLock: 0.0, // number
            steeringLockRatio: 0.0, // number
            suspensionBiasFront: 0.0, // number
            suspensionBiasRear: 0.0, // number
            suspensionCompDamp: 0.0, // number
            suspensionForce: 0.0, // number
            suspensionLowerLimit: 0.0, // number
            suspensionRaise: 0.0, // number
            suspensionReboundDamp: 0.0, // number
            suspensionUpperLimit: 0.0, // number
            tractionBiasFront: 0.0, // number
            tractionBiasRear: 0.0, // number
            tractionCurveLateral: 0.0, // number
            tractionCurveLateralRatio: 0.0, // number
            tractionCurveMax: 0.0, // number
            tractionCurveMaxRatio: 0.0, // number
            tractionCurveMin: 0.0, // number
            tractionCurveMinRatio: 0.0, // number
            tractionLossMult: 0.0, // number
            tractionSpringDeltaMax: 0.0, // number
            tractionSpringDeltaMaxRatio: 0.0, // number
        }
    }
});

export default VehiclesInfo;