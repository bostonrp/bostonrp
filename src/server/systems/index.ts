
// IMPORTS

import terminal from "../modules/terminal";
import Time from "./time";

import './anticheat';
import './auth';
import './weather';
import './admin/index';

// CODE

export async function loadAll() {
    terminal.debug('systems.loadAll();');

    await Time.load();
}