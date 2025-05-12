var express = require("express");
var { join } = require("node:path");
var { mkdir } = require("node:fs/promises");
var cookieParser = require("cookie-parser");
var userCollectionServices = require("./database/index");

var app = express();

(async () => {
  await mkdir("/var/report_uploads/", { recursive: true });

  app.locals.userCollectionServices = userCollectionServices;

  app.listen(5000, "127.0.0.1", () => console.log("server running"));
})();

app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(join(__dirname, "../public")));

app.use(require("./middleware/mongoose/index"));

app.use("/auth", require("./routes/auth/index"));
app.use("/reg", require("./routes/registration/index"));

app.use(cookieParser());

app.use(require("./middleware/verifyJWTToken"));

app.use("/", require("./routes/root/index"));
app.use("/upload", require("./routes/uploadFile/index"));

app.use("/reports", require("./routes/xlsx/index"));

app.all(/.*/, require("./middleware/notFoundHandler/notFoundHandler"));

app.use(require("./middleware/errHandler/errorHandler"));
