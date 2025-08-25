var { join } = require("node:path");

var getAuthFormPage = async (req, res, next) =>
  res.sendFile(join(__dirname, "../../../../public/html/auth/index.html"));

module.exports = getAuthFormPage;
