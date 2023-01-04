
// IMPORTS

import { createApp } from 'vue';
import App from './App.vue';

import EventManager from './EventManager';

// CODE

const events = new EventManager(true);

global.emit = (eventName, ...args) => {
    events.call(eventName, ...args);
}

global.on = (eventName, handler) => {
    events.add(eventName, handler);
}

global.off = (eventName) => {
    events.remove(eventName);
}

let app = createApp(App);

app.config.globalProperties.$mp = window.mp;
app.config.globalProperties.$events = events;

app.mount('#app');