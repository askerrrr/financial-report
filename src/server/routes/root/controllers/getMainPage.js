var { join } = require("node:path");

var getMainPage = async (req, res, next) => res.sendFile(join(__dirname, "../../../../public/html/index.html"));

module.exports = getMainPage;
