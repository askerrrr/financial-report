var env = require("./env");
var express = require("express");
var { join } = require("node:path");
var cookieParser = require("cookie-parser");
var checkDBState = require("./middleware/mongoose");
var runDBMigration = require("./database/migration");

var app = express();

(async () => {
  process.env.NODE_ENV = "production";

  app.locals.userCollectionServices = require("./database/collections/users");
  app.locals.tokenCollectionServices = require("./database/collections/tokens");
  app.locals.adminCollectionServices = require("./database/collections/admins");
  app.locals.reportCollectionServices = require("./database/collections/reports");
  app.locals.taxParamsCollectionServices = require("./database/collections/taxParams");
  app.locals.reportsTreeCollectionServices = require("./database/collections/reportTrees");

  await runDBMigration();

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
