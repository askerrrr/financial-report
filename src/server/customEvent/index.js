var EventEmitter = require("node:events");
class ServerEmitter extends EventEmitter {}
var serverEmitter = new ServerEmitter();

module.exports = serverEmitter;
