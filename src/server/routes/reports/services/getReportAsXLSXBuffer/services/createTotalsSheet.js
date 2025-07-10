var getRequiredTotals = require("./getRequiredTotals");
var writeTitleToTotalsSheet = require("./writeTitleToTotalsSheet");
var writeTotalValuesToSheet = require("./writeTotalValuesToSheet");

var createTotalsSheet = async (report, workbook) => {
  var sheet = workbook.addWorksheet("Лист 2");

  var indent = report.skus.length + 2;

  var { skus, ...totalValues } = report;

  var requiredTotals = await getRequiredTotals(totalValues);

  sheet = await writeTitleToTotalsSheet(sheet, indent);
  sheet = await writeTotalValuesToSheet(sheet, indent, requiredTotals);

  return sheet;
};

module.exports = createTotalsSheet;
