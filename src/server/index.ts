
// IMPORTS

import * as modules from './modules/index';
import * as systems from './systems/index';

import methods from './modules/methods';
import terminal from './modules/terminal';

import './api/index';
import './events/index';

// CODE

async function Init() {
    await methods.sleep(350);
    terminal.debug('Init();');

    await modules.loadAll();
    await systems.loadAll();
}

Init();
