var env = require("./env");
var express = require("express");
var { join } = require("node:path");
var { mkdir } = require("node:fs/promises");
var cookieParser = require("cookie-parser");
var checkDBState = require("./middleware/mongoose");
var userCollectionServices = require("./database/userCollectionServices/");
var tokenCollectionServices = require("./database/tokenCollectionServices/");
var reportCollectionServices = require("./database/reportCollectionServices/");
var optionsCollectionServices = require("./database/optionsCollectionServices");
var reportsTreeCollectionServices = require("./database/reportsTreeCollectionServices/");

var app = express();

(async () => {
  await mkdir("/var/report_uploads/", { recursive: true });
  await mkdir("/var/report_skus_photo/", { recursive: true });
  await mkdir("/var/temporary-photo-storage/", { recursive: true });

  app.locals.userCollectionServices = userCollectionServices;

  app.locals.reportCollectionServices = reportCollectionServices;

  app.locals.tokenCollectionServices = tokenCollectionServices;

  app.locals.optionsCollectionServices = optionsCollectionServices;

  app.locals.reportsTreeCollectionServices = reportsTreeCollectionServices;

  app.listen(env.PORT, env.HOST, () => console.log("server running"));
})();

app.disable("x-powered-by");
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(join(__dirname, "../public")));

app.use(checkDBState);

app.use("/no-auth-decode/", require("./routes/noAuthDecode"));
app.use("/auth", require("./routes/auth/"));
app.use("/reg", require("./routes/registration/"));

app.use(cookieParser());

app.use(require("./middleware/verifyJWTToken"));

app.use("/", require("./routes/root/"));

app.use("/token", require("./routes/WBToken/"));

app.use("/options", require("./routes/options/"));

app.use("/reports", require("./routes/reports/"));

app.all(/.*/, require("./middleware/notFoundHandler/"));

app.use(require("./middleware/errHandler/"));
