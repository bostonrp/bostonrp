
// IMPORTS

import './api/index';
import './events/index';
import './modules/index';
import './systems/index';
import rpc from '@aspidemon/rage-rpc';

rpc.onServerProc("test", (text) => {
    return text
})
