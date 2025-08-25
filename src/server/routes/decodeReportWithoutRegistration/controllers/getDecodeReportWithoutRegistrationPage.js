var { join } = require("node:path");

var getDecodeReportWithoutRegistrationPage = async (req, res, next) =>
  res.sendFile(join(__dirname, "../../../../public/html/decodeReportWithoutRegistration/index.html"));

module.exports = getDecodeReportWithoutRegistrationPage;
