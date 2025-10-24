var express = require("express");
var { join } = require("node:path");
var cookieParser = require("cookie-parser");

var mainServerIsListen = false;
var errorServerIsListen = false;

var mainServerInstance = null;
var errorServerInstance = null;

var createServer = () => {
  var app = express();
  return app;
};

var runErrorServer = async () => {
  if (errorServerInstance) {
    await new Promise((resolve) => {
      if (errorServerInstance && errorServerInstance.close) {
        errorServerInstance.close(() => {
          errorServerInstance.removeAllListeners();
          errorServerInstance = null;
          errorServerIsListen = false;
          resolve();
        });
      }
    });
  }

  var errorApp = createServer();
  errorApp.get("/", (_, res) => res.set({ "Content-Type": "text/html" }).send("<p>Сервер временно недоступен</p>"));
  errorServerIsListen = true;
  errorServerInstance = errorApp.listen(process.env.PORT, process.env.HOST, () => console.log("Сервер временно недоступен."));
};

var runServer = async () => {
  if (mainServerInstance) {
    await new Promise((resolve) => {
      if (mainServerInstance && mainServerInstance.close) {
        mainServerInstance.close(() => {
          mainServerInstance.removeAllListeners();
          mainServerInstance = null;
          mainServerIsListen = false;
          resolve();
        });
      }
    });
  }

  process.env.NODE_ENV = "production";
  var app = createServer();

  app.locals = { ...require("./database/collections/") };
  app.disable("x-powered-by");
  app.use(express.urlencoded());
  app.use(express.json());
  app.use(express.static(join(__dirname, "../public")));

  app.use("/decode-report-without-registration/", require("./routes/decodeReportWithoutRegistration"));
  app.use("/auth", require("./routes/auth/"));
  app.use("/admin", require("./routes/admin/"));
  app.use("/reg", require("./routes/registration/"));

  app.use(cookieParser());
  app.use(require("./middleware/verifyJWTToken"));
  app.use("/", require("./routes/index/"));
  app.use("/token", require("./routes/WBToken/"));
  app.use("/tax_params", require("./routes/taxParams/"));
  app.use("/reports", require("./routes/reports/"));
  app.use("/goods", require("./routes/goods"));

  app.all(/.*/, require("./middleware/notFoundHandler/"));

  app.use(require("./middleware/errorHandler/"));

  mainServerIsListen = true;
  mainServerInstance = app.listen(process.env.PORT, process.env.HOST, async () => console.log("server running"));
};

var { runDB } = require("./database");
var serverEmitter = require("./customEvent");

var startApp = async () => {
  try {
    await runDB();
    await runServer();
  } catch (e) {
    console.log(e);
    if (e.name !== "MongooseServerSelectionError" || e.name !== "MongoServerSelectionError") {
      await runErrorServer();
    }
  }
};

startApp();

serverEmitter.on("start", async () => {
  if (errorServerIsListen) {
    await new Promise((resolve) => {
      errorServerInstance.close(() => {
        errorServerInstance.removeAllListeners();
        errorServerInstance = null;
        errorServerIsListen = false;
        resolve();
      });
    });
  }
  return await runServer();
});

serverEmitter.on("close", async () => {
  if (mainServerIsListen) {
    await new Promise((resolve) => {
      mainServerInstance.close(() => {
        mainServerInstance.removeAllListeners();
        mainServerInstance = null;
        mainServerIsListen = false;
        resolve();
      });
    });
  }
  return await runErrorServer();
});

process.on("unhandledRejection", async (reason, promise) => {
  //console.log("reason name: ", reason.name);
});
