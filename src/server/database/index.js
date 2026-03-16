var mongoose = require("mongoose");
var serverEmitter = require("../customEvent");

var timerId = null;
var connectionAttempts = 0;
var eventsConfigured = false;
var mongooseReconnected = false;
var MAX_CONNECTION_ATTEMPTS = 5;

var mongooseConnection = async () => {
  if (process.env.MONGO_HOST) {
    var mongoUri = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.DB_NAME}`;

    await mongoose.connect(mongoUri, JSON.parse(process.env.MONGO_OPTIONS));
  } else {
    await mongoose.connect(process.env.MONGO_URI);
  }
};

var setupMongooseEvents = () => {
  if (eventsConfigured) {
    return;
  }

  eventsConfigured = true;
  console.log("connection to mongodb...\n");

  mongoose.connection.on("error", (e) => {
    console.log("mongodb connection error: ", { name: e.name, msg: e.message });
    mongoose.disconnect();
  });

  mongoose.connection.on("disconnected", async () => {
    console.log("mongodb disconnected\n");

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
      mongoose.connection.removeAllListeners();
      console.log("mongodb connection was been destroed");

      return;
    }

    connectionAttempts++;
  });

  mongoose.connection.on("connected", async () => {
    if (timerId) {
      console.clear();
      console.log("mongodb reconnected\n");

      mongooseReconnected = true;
      clearTimeout(timerId);
      timerId = null;
      serverEmitter.emit("start");
    }

    if (!mongooseReconnected) {
      console.clear();
      console.log("mongodb connected\n");
    }

    mongooseReconnected = false;
    connectionAttempts = 0;
  });
};

var killAllSessions = async () => await mongoose.connection.db.command({ killAllSessions: [] }).then(() => console.log("old sessions killed"));

var runDB = async () => {
  setupMongooseEvents();
  await mongooseConnection();
  await killAllSessions();

  var runDBMigration = require("./migration/");

  //await runDBMigration().then(() => console.log("\n     migration completed\n-------------------------\n"));
};

module.exports = { runDB, dbClient: mongoose.connection };
