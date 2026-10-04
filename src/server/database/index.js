import mongoose from "mongoose";
import { MongoClient } from "mongodb";
import { logger } from "../../logger.js";
import setupDbEvents from "./setupDbEvents.js";
import killSessions from "./killSessions.js";
import getMongooseOptions from "./getClientOptions.js";
import { databaseEmitter, serverEmitter } from "../customEvent/index.js";

var auth = {
  username: process.env.MONGO_AUTH_USER,
  password: process.env.MONGO_AUTH_PWD,
};
var authSource = process.env.MONGO_AUTH_DB;
var authMechanism = process.env.MONGO_AUTH_MECHANISM || "SCRAM-SHA-1";

var dbClient = mongoose.connection;
var dbClientToEncryption = new MongoClient(process.env.MONGO_URI, {
  auth,
  authSource,
  authMechanism,
});

var runDB = async () => {
  setupDbEvents(mongoose, dbClientToEncryption);

  try {
    var options = await getMongooseOptions(dbClientToEncryption);

    await mongoose.connect(process.env.MONGO_URI, options);
    await mongoose.syncIndexes();

    serverEmitter.emit("start");
  } catch (e) {
    logger.fatal(e);

    databaseEmitter.emit("connection_error");
  }
};

export { runDB, dbClient };
