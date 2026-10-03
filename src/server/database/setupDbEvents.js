import { logger } from "../../logger.js";
import getMongooseOptions from "./getMongooseOptions.js";
import { serverEmitter, databaseEmitter } from "../customEvent/index.js";

var MAX_DELAY_MS = 60_000;
var reconnectAttempts = 0;
var INITIAL_DELAY_MS = 1000;
var currentDelay = INITIAL_DELAY_MS;

var reconnectTimer = null;
var isReconnecting = false;
var eventsConfigured = false;

var clearReconnectTimer = () => {
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }
};

var resetReconnectState = () => {
  isReconnecting = false;
  reconnectAttempts = 0;
  currentDelay = INITIAL_DELAY_MS;
  clearReconnectTimer();
};

var scheduleReconnect = (dbInstance, dbClientToEncryption) => {
  if (isReconnecting) return;

  isReconnecting = true;
  serverEmitter.emit("close");

  var tryConnect = async () => {
    if (!isReconnecting) return;

    reconnectAttempts += 1;
    logger.info({ reconnectAttempts });

    try {
      var options = await getMongooseOptions(dbClientToEncryption);

      await dbInstance.connect(process.env.MONGO_URI, options);
    } catch (err) {
      logger.fatal(`Reconnect attempt failed: ${err?.message || err}`);

      currentDelay = Math.min(currentDelay * 2, MAX_DELAY_MS);

      reconnectTimer = setTimeout(tryConnect, currentDelay);
    }
  };

  reconnectTimer = setTimeout(tryConnect, 300);
};

var setupDbEvents = (dbInstance, dbClientToEncryption) => {
  if (eventsConfigured) return;
  eventsConfigured = true;

  dbInstance.connection.on("error", (err) =>
    logger.fatal(`mongoose connection error: ${err?.message || err}`),
  );

  dbInstance.connection.on("disconnected", () => {
    logger.warn("---------- DB DISCONNECTED ----------");
    scheduleReconnect(dbInstance, dbClientToEncryption);
  });

  dbInstance.connection.on("connected", () => {
    if (isReconnecting) {
      logger.info("---------- DB RECONNECTED ----------");
      serverEmitter.emit("start");
    } else {
      logger.info("---------- DB CONNECTED ----------");
    }
    resetReconnectState();
  });

  dbClientToEncryption.on("error", (err) => {
    logger.fatal(`encryption client error: ${err?.message || err}`);
  });

  databaseEmitter.on("connection_error", () => {
    logger.fatal("---------- DB CONNECTION ERROR ----------");
    scheduleReconnect(dbInstance, dbClientToEncryption);
  });
};

export default setupDbEvents;
