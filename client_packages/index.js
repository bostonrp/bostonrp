
// CODE

try {
    require('./client.js');
} catch(e) {
    mp.console.logInfo(`${e.stack}`);
}