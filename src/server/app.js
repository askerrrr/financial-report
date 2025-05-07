var express = require("express");
var { join } = require("node:path");

var app = express();

(async () =>
  app.listen(5000, "127.0.0.1", () => console.log("server running")))();

app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(join(__dirname, "../public")));

app.use(require("./middleware/mongoose/index"));

app.use("/", require("./routes/root/index"));
app.use("/updoad", require("./routes/uploadFile/index"));

app.use(require("./middleware/errHandler/errorHandler"));
