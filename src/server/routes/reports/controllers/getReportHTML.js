var { join } = require("node:path");

var getReportHTML = async (req, res, next) => {
  res.sendFile(join(__dirname, "../../../../public/report/report.html"));
};

module.exports = getReportHTML;
