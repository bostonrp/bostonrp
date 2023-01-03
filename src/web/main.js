
// IMPORTS

import { createApp } from 'vue';
import App from './App.vue';

import EventManager from './EventManager';

// CODE

const events = new EventManager(true);

window.emit = (eventName, args) => {
    let [...args2] = JSON.parse(args);
    global.events.call(eventName, ...args2);
}

window.on = (eventName, handler) => {
    global.events.add(eventName, handler);
}

window.off = (eventName) => {
    global.events.remove(eventName);
}

let app = createApp(App);

app.config.globalProperties.$mp = window.mp;
app.config.globalProperties.$events = events;


app.mount('#app');