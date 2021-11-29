// https://nodejs.org/api/os.html

const os = require("os");
console.log("OS Version:", os.version());
console.log("Total Memory:", os.totalmem());
console.log("Available Memory:", os.freemem());
console.log("CPU:", os.cpus());
console.log("Host:", os.hostname());
