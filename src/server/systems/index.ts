
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

    try {
        await Time.load();

        terminal.done(`[Systems] Системы были загружены и готовы к работе`);
    } catch(e) { return terminal.error(e); }
}