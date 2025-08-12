var { join } = require("node:path");

var getNoAuthDecodePage = async (req, res, next) =>
  res.sendFile(
    join(__dirname, "../../../../public/html/noAuthDecode/index.html")
  );

module.exports = getNoAuthDecodePage;
