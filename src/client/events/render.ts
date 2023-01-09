
// IMPORTS

import client, { Cursor } from "api/Client";

// CODE

mp.events.add('render', () => {
    mp.game.ui.hideHudComponentThisFrame(1); // Wanted Stars
    mp.game.ui.hideHudComponentThisFrame(2); // Weapon Icon
    mp.game.ui.hideHudComponentThisFrame(3); // Cash
    mp.game.ui.hideHudComponentThisFrame(4); // MP Cash
    mp.game.ui.hideHudComponentThisFrame(6); // Vehicle Name
    mp.game.ui.hideHudComponentThisFrame(7); // Area Name
    mp.game.ui.hideHudComponentThisFrame(8);// Vehicle Class
    mp.game.ui.hideHudComponentThisFrame(9); // Street Name
    mp.game.ui.hideHudComponentThisFrame(13); // Cash Change
    mp.game.ui.hideHudComponentThisFrame(17); // Save Game
    mp.game.ui.hideHudComponentThisFrame(20); // Weapon Stats

    if(Cursor.get()) mp.gui.cursor.show(true, true);
    // else mp.gui.cursor.show(false, false);
});