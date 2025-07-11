var getRequiredTotalsField = require("./getRequiredTotalsField");
var writeTotalsTitleToSheet = require("./writeTotalsTitleToSheet");
var writeTotalValuesToSheet = require("./writeTotalValuesToSheet");

var createTotalsSheet = async (report, workbook) => {
  var sheet = workbook.addWorksheet("Лист 2");

  var indent = report.skus.length + 2;

  var { skus, ...totalValues } = report;

  var requiredTotals = await getRequiredTotalsField(totalValues);

  sheet = await writeTotalsTitleToSheet(sheet, indent);
  sheet = await writeTotalValuesToSheet(sheet, indent, requiredTotals);

  return workbook;
};

module.exports = createTotalsSheet;
