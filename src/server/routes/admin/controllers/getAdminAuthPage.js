var { join } = require("node:path");

var getAdminAuthPage = async (req, res, next) => res.sendFile(join(__dirname, "../../../../public/html/admin/index.html"));

module.exports = getAdminAuthPage;
