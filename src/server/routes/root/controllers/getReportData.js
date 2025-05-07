var getXLSXData = require("../services/getXLSXData");
var conversionToNumberOrString = require("../services/conversionToNumberOrString");

var getReportData = async (req, res, next) => {
  try {
    var filePath =
      "C:\\Users\\Adm\\Desktop\\dir\\financial report\\wb_report_7-5-2025_14-2.xlsx";

    var data = await getXLSXData(filePath);

    return res.json({ data });
  } catch (e) {
    next(e);
  }
};

module.exports = getReportData;
