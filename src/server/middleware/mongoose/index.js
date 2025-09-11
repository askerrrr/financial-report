var env = require("../../env");
var mongoose = require("mongoose");
var serverEmitter = require("../../customEvent");
var { DatabaseConnectionError } = require("../../customError");

var timerId = null;
var connectionAttempts = 0;
var eventsConfigured = false;
var mongooseIsReconnected = false;
const MAX_CONNECTION_ATTEMPTS = 30;

var connection = mongoose.connection;

var setupMongooseEvents = () => {
  if (eventsConfigured) {
    return;
  }

  eventsConfigured = true;
  console.log("connection to mongoose...\n");

  connection.on("error", (e) => {
    console.log("mongoose connection error: ", { name: e.name, msg: e.message });
    mongoose.disconnect();
  });

  connection.on("disconnected", async () => {
    console.log("mongoose disconnected\n");

    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }

    timerId = setTimeout(mongooseConnection, 1000);
    serverEmitter.emit("close");
    console.log({ connectionAttempts });
    if (connectionAttempts === MAX_CONNECTION_ATTEMPTS) {
      clearTimeout(timerId);
      timerId = null;
      connection.removeAllListeners();
      console.log("mongoose connection was been destroed");

      return;
    }

    connectionAttempts++;
  });

  connection.on("reconnected", () => {});

  connection.on("connected", async () => {
    if (timerId) {
      console.clear();
      console.log("mongoose reconnected\n");

      mongooseIsReconnected = true;
      clearTimeout(timerId);
      timerId = null;
      serverEmitter.emit("start");
    }

    if (!mongooseIsReconnected) {
      console.clear();
      console.log("mongoose connected\n");
    }

    mongooseIsReconnected = false;
    connectionAttempts = 0;
  });
};

var mongooseConnection = async () => await mongoose.connect(env.getMongoURI(), env.mongoose_options);

var checkDBState = (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      next(new DatabaseConnectionError());
    }

    next();
  } catch (e) {
    if (e instanceof DatabaseConnectionError) {
      next(e);
    }

    next(new DatabaseConnectionError(e.message));
  }
};

module.exports = { setupMongooseEvents, mongooseConnection, connection };
