var ExcelJS = require("exceljs");
var createSKUsSheet = require("./services/createSKUsSheet");
var createTotalsSheet = require("./services/createTotalsSheet");

var getReportAsXLSXBuffer = async (report) => {
  var workbook = new ExcelJS.Workbook();

  var skusSheet = workbook.addWorksheet("Товары");

  skusSheet = await createSKUsSheet(report, skusSheet);

  var totalsSheet = workbook.addWorksheet("Сводка");

  totalsSheet = await createTotalsSheet(report, totalsSheet);

  var buffer = await workbook.xlsx.writeBuffer();

  return buffer;
};

module.exports = getReportAsXLSXBuffer;
