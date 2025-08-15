var { join } = require("node:path");

var getdecodeReportWithoutAuthPage = async (req, res, next) =>
  res.sendFile(join(__dirname, "../../../../public/html/decodeReportWithoutAuth/index.html"));

module.exports = getdecodeReportWithoutAuthPage;
