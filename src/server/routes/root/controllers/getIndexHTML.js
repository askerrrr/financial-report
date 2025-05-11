var { join } = require("node:path");

var getIndexHTML = async (req, res, next) =>
  res.sendFile(join(__dirname, "../../../../public/html/index.html"));

module.exports = getIndexHTML;
