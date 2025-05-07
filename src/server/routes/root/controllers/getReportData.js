var getXLSXData = require("../services/getXLSXData");

var getReportData = async (req, res, next) => {
  try {
    var filePath =
      "C:\\Users\\Adm\\Desktop\\dir\\financial report\\wb_report_7-5-2025_12-30.xlsx";

    var data = await getXLSXData(filePath);

    console.log("data: ", data);

    return res.json({ data });
  } catch (e) {
    next(e);
  }
};

module.exports = getReportData;
