import mongoose from "mongoose";
import serverEmitter from "../customEvent/index.js";
import { schemaMap } from "./encryptedFieldsSchemaMap.js";

var timerId = null;
var connectionAttempts = 0;
var eventsConfigured = false;
var mongooseReconnected = false;
var MAX_CONNECTION_ATTEMPTS = 5;
var keyVaultNamespace = process.env.KEY_VAULT_NAME_SPACE;
var kmsProviders = { local: { key: process.env.MONGO_LOCAL_MASTER_KEY } };
var extraOptions = { cryptSharedLibPath: process.env.MONGO_CRYPT_SHARED_PATH, cryptSharedLibRequired: true };

var dbClient = mongoose.connection;

var mongooseConnection = async () => {
  if (process.env.MONGO_HOST) {
    var mongoUri = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.DB_NAME}`;

    await mongoose.connect(mongoUri, JSON.parse(process.env.MONGO_OPTIONS));
  } else {
    await mongoose.connect(process.env.MONGO_URI, {
      autoEncryption: {
        schemaMap,
        kmsProviders,
        extraOptions,
        keyVaultNamespace,
      },
    });
  }
};

var setupMongooseEvents = () => {
  if (eventsConfigured) {
    return;
  }

  eventsConfigured = true;
  console.log("connection to mongodb...\n");

  dbClient.on("error", (e) => {
    console.log("mongodb connection error: ", { name: e.name, msg: e.message });
    mongoose.disconnect();
  });

  dbClient.on("disconnected", async () => {
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
      dbClient.removeAllListeners();
      console.log("mongodb connection was been destroed");

      return;
    }

    connectionAttempts++;
  });

  dbClient.on("connected", async () => {
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

var killAllSessions = async () => await dbClient.db.command({ killAllSessions: [] }).then(() => console.log("old sessions killed"));

var runDB = async () => {
  setupMongooseEvents();
  await mongooseConnection();
  await killAllSessions();

  //await runDBMigration().then(() => console.log("\n     migration completed\n-------------------------\n"));
};

export { runDB, dbClient };
