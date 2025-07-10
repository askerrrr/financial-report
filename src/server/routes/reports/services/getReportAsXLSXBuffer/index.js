var ExcelJS = require("exceljs");
var createSKUsSheet = require("./services/createSKUsSheet");
var createTotalsSheet = require("./services/createTotalsSheet");

var getReportAsXLSXBuffer = async (report) => {
  var workbook = new ExcelJS.Workbook();

  workbook = await createSKUsSheet(report, workbook);
  workbook = await createTotalsSheet(report, workbook);

  var buffer = await workbook.xlsx.writeBuffer();

  return buffer;
};

module.exports = getReportAsXLSXBuffer;
