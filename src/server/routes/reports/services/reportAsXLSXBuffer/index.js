import ExcelJS from "exceljs";
import createSKUsSheet from "./services/createSKUsSheet.js";
import getMonthlySummary from "./services/getMonthlySummary.js";
import createTotalsSheet from "./services/createTotalsSheet.js";
import writeTotalsTitleToSheet from "./services/writeTotalsTitleToSheet.js";
import writeTotalValuesToSheet from "./services/writeTotalValuesToSheet.js";

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

export { getReportAsXLSXBuffer, getMonthlySummaryAsXLSXBuffer };
