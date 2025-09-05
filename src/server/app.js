var env = require("./env");
var express = require("express");
var mongoose = require("mongoose");
var { join } = require("node:path");
var cookieParser = require("cookie-parser");
var checkDBState = require("./middleware/mongoose");
var runDBMigration = require("./database/migration");

var app = express();
var errorApp = express();
var mongooseConnection = async () => await mongoose.connect(env.getMongoURI(), env.mongoose_options).then(() => console.log("mongoose conected"));
mongoose.Promise = Promise;
mongoose.connection.on("error", () => mongoose.disconnect());
mongoose.connection.on("disconnected", () => setTimeout(mongooseConnection, 5000));

(async () => {
  await mongooseConnection();
  process.env.NODE_ENV = "production";

  app.locals.userCollectionServices = require("./database/collections/users");
  app.locals.tokenCollectionServices = require("./database/collections/tokens");
  app.locals.adminCollectionServices = require("./database/collections/admins");
  app.locals.reportCollectionServices = require("./database/collections/reports");
  app.locals.taxParamsCollectionServices = require("./database/collections/taxParams");
  app.locals.reportsTreeCollectionServices = require("./database/collections/reportTrees");

  var success = await runDBMigration();

  if (!success) {
    errorApp.get("/", (_, res) => res.set({ "Content-Type": "text/html" }).send("<p>Сервер временно недоступен</p>"));
    return errorApp.listen(env.PORT, env.HOST, () => console.log("Сервер временно недоступен."));
  }

  app.listen(env.PORT, env.HOST, async () => console.log("server running"));
})();

app.disable("x-powered-by");
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(join(__dirname, "../public")));

app.use(checkDBState);

app.use("/decode-report-without-registration/", require("./routes/decodeReportWithoutRegistration"));
app.use("/auth", require("./routes/auth/"));
app.use("/admin", require("./routes/admin/"));
app.use("/reg", require("./routes/registration/"));

app.use(cookieParser());

app.use(require("./middleware/verifyJWTToken"));

app.use("/", require("./routes/root/"));

app.use("/token", require("./routes/WBToken/"));

app.use("/tax_params", require("./routes/taxParams/"));

app.use("/reports", require("./routes/reports/"));

app.all(/.*/, require("./middleware/notFoundHandler/"));

app.use(require("./middleware/errorHandler/"));
