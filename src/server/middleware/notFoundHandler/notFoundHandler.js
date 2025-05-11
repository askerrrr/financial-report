var { join } = require("node:path");

var notFoundHandler = async (req, res) =>
  res.sendFile(join(__dirname, "../../../public/html/notFound.html"));

module.exports = notFoundHandler;
