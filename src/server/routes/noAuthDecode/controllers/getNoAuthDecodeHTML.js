var { join } = require("node:path");

var getNoAuthDecodeHTML = async (req, res, next) =>
  res.sendFile(
    join(__dirname, "../../../../public/html/noAuthDecode/index.html")
  );

module.exports = getNoAuthDecodeHTML;
