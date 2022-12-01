
// IMPORTS

import DataBase from './database';
import terminal from './terminal';

import './methods';
import './database/models/index';

// CODE

export async function loadAll() {
    terminal.debug('modules.loadAll();');

    await DataBase.Init();
}