var { join } = require("node:path");

var getOptionsPage = async (req, res, next) => res.sendFile(join(__dirname, "../../../../public/html/taxParams/index.html"));

module.exports = getOptionsPage;
