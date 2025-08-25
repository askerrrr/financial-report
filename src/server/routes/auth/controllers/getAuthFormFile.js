var { join } = require("node:path");

var getAuthFormFile = async (req, res, next) =>
  res.sendFile(join(__dirname, "../../../../public/html/auth/authForm.html"));

module.exports = getAuthFormFile;
