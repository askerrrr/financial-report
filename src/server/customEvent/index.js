import EventEmitter from "node:events";
class ServerEmitter extends EventEmitter {}
var serverEmitter = new ServerEmitter();

export default serverEmitter;
