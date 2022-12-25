
// IMPORTS

import terminal from "../modules/terminal";
import Time from "./time";
import Items from "./inventory/items";
import Weather from "./weather";
import WhiteList from "./whitelist";

import './anticheat';
import './auth';
import './weather';
import './admin/index';
import './inventory/index';

// CODE

export async function loadAll() {
    terminal.debug('systems.loadAll();');

    try {
        await Time.load();
        await Weather.load();
        await Items.loadAll();
        await WhiteList.load();

        terminal.done(`[Systems] Системы были загружены и готовы к работе`);
    } catch(e) { return terminal.error(e); }
}