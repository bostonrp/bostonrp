
// IMPORTS

import DataBase from './database';
import terminal from './terminal';

import './methods';
import './database/models/index';
import Vehicles from '../api/vehicles';

// CODE

export async function loadAll() {
    terminal.debug('modules.loadAll();');

    try {
        await DataBase.Init();
        await Vehicles.loadInfos();

        terminal.done(`[Modules] Модули успешно загрузились`);
    } catch(e) { terminal.error(e); }
}