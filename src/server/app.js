var env = require("./env");
var express = require("express");
var { join } = require("node:path");
var { mkdir } = require("node:fs/promises");
var cookieParser = require("cookie-parser");
var checkDBState = require("./middleware/mongoose");
var userCollectionServices = require("./database/collections/users");
var adminCollectionServices = require("./database/collections/admins");
var tokenCollectionServices = require("./database/collections/tokens");
var reportCollectionServices = require("./database/collections/reports");
var taxParamsCollectionServices = require("./database/collections/taxParams");
var reportsTreeCollectionServices = require("./database/collections/reportTrees");

var app = express();

(async () => {
  process.env.NODE_ENV='production'
  
  app.locals.userCollectionServices = userCollectionServices;
  app.locals.adminCollectionServices = adminCollectionServices;
  app.locals.reportCollectionServices = reportCollectionServices;
  app.locals.tokenCollectionServices = tokenCollectionServices;
  app.locals.taxParamsCollectionServices = taxParamsCollectionServices;
  app.locals.reportsTreeCollectionServices = reportsTreeCollectionServices;

  app.listen(env.PORT, env.HOST, () => console.log("server running"));
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
