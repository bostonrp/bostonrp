
// IMPORTS

import terminal from "../modules/terminal";
import Time from "./time";

// CODE

export async function loadAll() {
    terminal.debug('systems.loadAll();');

    await Time.load();
}