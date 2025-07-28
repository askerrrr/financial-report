var { join } = require("node:path");

var getOptionsPage = async (req, res, next) =>
  res.sendFile(join(__dirname, "../../../../public/html/options/index.html"));

module.exports = getOptionsPage;
