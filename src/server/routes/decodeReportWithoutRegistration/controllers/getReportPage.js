var { join } = require("node:path");

var getReportPage = async (req, res, next) => res.sendFile(join(__dirname, "../../../../public/html/decodeReportWithoutRegistration/report.html"));

module.exports = getReportPage;
