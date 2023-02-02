
// IMPORTS

import { createApp } from 'vue';
import App from './App.vue';

import rpc from '@aspidemon/rage-rpc/src/web'

// CODE

global.rpc = rpc;

let app = createApp(App);

app.config.globalProperties.$mp = window.mp;
app.config.globalProperties.$events = rpc;

app.mount('#app');