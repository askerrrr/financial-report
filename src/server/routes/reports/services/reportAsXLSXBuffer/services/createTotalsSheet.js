var getRequiredTotalsField = require("./getRequiredTotalsField");
var writeTotalsTitleToSheet = require("./writeTotalsTitleToSheet");
var writeTotalValuesToSheet = require("./writeTotalValuesToSheet");

var createTotalsSheet = async (report, sheet) => {
  var indent = report.skus.length + 2;

  var { skus, ...totalValues } = report;

  var requiredTotals = await getRequiredTotalsField(totalValues);

  sheet = await writeTotalsTitleToSheet(sheet, indent);
  sheet = await writeTotalValuesToSheet(sheet, indent, requiredTotals);

  return sheet;
};

module.exports = createTotalsSheet;
