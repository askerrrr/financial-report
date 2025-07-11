var { writeSKUsToSheet } = require("./writeSKUsToSheet");
var writeSKUsTitleToSheet = require("./writeSKUsTitleToSheet");
var { getRequiredSKUFieldsName } = require("./getRequiredSKUFieldsName");

var createSKUsSheet = async (report, sheet) => {
  var skus = await getRequiredSKUFieldsName(report.skus);

  sheet = await writeSKUsToSheet(sheet, skus);
  sheet = await writeSKUsTitleToSheet(sheet);

  return sheet;
};

module.exports = createSKUsSheet;
