var { join } = require("node:path");

var getReportPage = async (req, res, next) => res.sendFile(join(__dirname, "../../../../public/html/report/report.html"));

module.exports = getReportPage;
