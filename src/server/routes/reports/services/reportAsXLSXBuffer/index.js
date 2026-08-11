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

  return { buffer };
};

var getMonthlySummaryAsXLSXBuffer = async (reports) => {
  var workbook = new ExcelJS.Workbook();

  var sheet = workbook.addWorksheet("Лист 1");

  var indent = 2;

  sheet = await writeTotalsTitleToSheet(sheet, indent);

  var monthlySummary = await getMonthlySummary(reports);

  sheet = await writeTotalValuesToSheet(sheet, indent, monthlySummary);

  var isCrossYearPeriodReport = reports.filter((report) => report.isCrossYearPeriod);

  if (isCrossYearPeriodReport.length) {
    var currentYearPostfix = "InCurrentYear";
    var nextYearPostfix = "InNextYear";

    var startYear = isCrossYearPeriodReport[0].dateFrom.split("-")[0];
    var currentYearSheet = workbook.addWorksheet("Сводка за " + startYear);
    var currentYearMonthlySummary = await getMonthlySummary(isCrossYearPeriodReport, currentYearPostfix);
    currentYearSheet = await writeTotalsTitleToSheet(currentYearSheet, indent);
    currentYearSheet = await writeTotalValuesToSheet(currentYearSheet, indent, currentYearMonthlySummary);

    var endYear = isCrossYearPeriodReport[0].dateTo.split("-")[0];
    var nextYearSheet = workbook.addWorksheet("Сводка за " + endYear);
    var nextYearMonthlySummary = await getMonthlySummary(isCrossYearPeriodReport, nextYearPostfix);
    nextYearSheet = await writeTotalsTitleToSheet(nextYearSheet, indent);
    nextYearSheet = await writeTotalValuesToSheet(nextYearSheet, indent, nextYearMonthlySummary);
  }

  var buffer = await workbook.xlsx.writeBuffer();

  return { buffer };
};

export { getReportAsXLSXBuffer, getMonthlySummaryAsXLSXBuffer };
