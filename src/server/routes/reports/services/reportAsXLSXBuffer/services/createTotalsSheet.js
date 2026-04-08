import getRequiredTotalsField from "./getRequiredTotalsField.js";
import writeTotalsTitleToSheet from "./writeTotalsTitleToSheet.js";
import writeTotalValuesToSheet from "./writeTotalValuesToSheet.js";

var createTotalsSheet = async (report, sheet) => {
  var indent = report.skus.length + 2;

  var { skus, ...totalValues } = report;

  var requiredTotals = getRequiredTotalsField(totalValues);

  sheet = await writeTotalsTitleToSheet(sheet, indent);
  sheet = await writeTotalValuesToSheet(sheet, indent, requiredTotals);

  return sheet;
};

export default createTotalsSheet;
