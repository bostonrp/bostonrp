
// IMPORTS

import * as modules from './modules/index';
import methods from './modules/methods';
import terminal from './modules/terminal';

// CODE

async function Init() {
    await methods.sleep(350);
    terminal.debug('Init();');

    await modules.loadAll();
}

Init();
