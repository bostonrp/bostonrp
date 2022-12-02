
// IMPORTS

import config from '@shared/configs/mysql.json';
import { DataTypes, ModelAttributes, Sequelize, Model } from 'sequelize';
import terminal from '../terminal';

// CODE

let models:any = new Array();

class DataBase {
    public static main:Sequelize = new Sequelize({
        dialect: 'postgres',
    
        host: config.hostname,
        username: config.username,
        password: config.password,
        database: config.databasename,

        logging: config.debug ? console.log : false
    });
    
    public static async Init():Promise<boolean> {
        terminal.debugDetailed('DataBase.Init();');
        let startTime = Date.now();

        try {
            if(!await this.hasConnection()) return false;
            await this._loadModels();

            let endTime = Date.now();
            terminal.debug('[DataBase] Модуль базы данных был загружена', `${endTime - startTime}ms`);
            return true;
        } catch(e) {
            terminal.error(e);
            return false;
        }
    }

    public static async hasConnection(silent:boolean = false):Promise<boolean> {
        if(!silent) terminal.debugDetailed('DataBase.hasConnection();');

        try {
            await this.main.authenticate();
            return true;
        } catch(e) {
            if(!silent) terminal.error(e);
            return false;
        }
    }

    private static async _loadModels() {
        terminal.debugDetailed('DataBase._loadModels();');

        try {
            if(models.length <= 0) return;

            models.forEach((model:DBModel) => {
                model.init();
            });

            models = undefined;
        } catch(e) {
            terminal.error(e);
        }
    }
}

export class DBModel {
    private _modelName:string;
    private _modelColumns:any;

    constructor(modelName:string, modelColumns:ModelAttributes<Model<any, any>, any>) {
        this._modelName = modelName;

        let _defaultValues = {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            }
        };

        this._modelColumns = Object.assign({}, _defaultValues, modelColumns);
        models.push(this);
    }

    // SETTERS

    // GETTERS

    get name():string {
        return this._modelName;
    }

    // OTHERS

    public init() {
        terminal.debugDetailed(`[DataBase] '${this._modelName}'.init();`);

        try {
            let _model = DataBase.main.define(this._modelName, this._modelColumns, {
                timestamps: false,
                freezeTableName: true
            });
            
            _model.sync({ alter: true });
            this._delete();
        } catch(e) {
            console.log(e);
        }
    }

    private _delete():boolean {
        try {
            let _modelIndex = models.findIndex((model:DBModel) => model.name == this._modelName);
            models.splice(_modelIndex, 1);
            return true;
        } catch(e) {
            console.log(e);
            return false;
        }
    }
}

export default DataBase;
