var getXLSXData = require("../services/getXLSXData");

var getReportData = async (req, res, next) => {
  var filePath =
    "/home/phosphorus/financial-report/wb_report_7-5-2025_14-2.xlsx";

  var data = await getXLSXData(filePath);

  return res.json({ data });
};

module.exports = getReportData;
