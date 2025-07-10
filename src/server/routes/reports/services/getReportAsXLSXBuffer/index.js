var ExcelJS = require("exceljs");
var createTotalsSheet = require("./services/createTotalsSheet");

var getReportAsXLSXBuffer = async (report) => {
  var workbook = new ExcelJS.Workbook();

  workbook = await createTotalsSheet(report, workbook);

  var buffer = await workbook.xlsx.writeBuffer();

  return buffer;
};

module.exports = getReportAsXLSXBuffer;
