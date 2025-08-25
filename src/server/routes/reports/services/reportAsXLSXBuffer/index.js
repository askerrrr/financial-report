var ExcelJS = require("exceljs");
var createSKUsSheet = require("./services/createSKUsSheet");
var getMonthlySummary = require("./services/getMonthlySummary");
var createTotalsSheet = require("./services/createTotalsSheet");
var writeTotalsTitleToSheet = require("./services/writeTotalsTitleToSheet");
var writeTotalValuesToSheet = require("./services/writeTotalValuesToSheet");

var getReportAsXLSXBuffer = async (report) => {
  var workbook = new ExcelJS.Workbook();

  var skusSheet = workbook.addWorksheet("Товары");

  skusSheet = await createSKUsSheet(report, skusSheet);

  var totalsSheet = workbook.addWorksheet("Сводка");

  totalsSheet = await createTotalsSheet(report, totalsSheet);

  var buffer = await workbook.xlsx.writeBuffer();

  return buffer;
};

var getMonthlySummaryAsXLSXBuffer = async (reports) => {
  var workbook = new ExcelJS.Workbook();

  var sheet = workbook.addWorksheet("Лист 1");

  var indent = 2;

  sheet = await writeTotalsTitleToSheet(sheet, indent);

  var monthlySummary = await getMonthlySummary(reports);

  sheet = await writeTotalValuesToSheet(sheet, indent, monthlySummary);

  var buffer = await workbook.xlsx.writeBuffer();

  return buffer;
};

module.exports = { getReportAsXLSXBuffer, getMonthlySummaryAsXLSXBuffer };
