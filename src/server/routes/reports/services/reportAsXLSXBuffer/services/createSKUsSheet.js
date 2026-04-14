import { writeSKUsToSheet } from "./writeSKUsToSheet.js";
import writeSKUsTitleToSheet from "./writeSKUsTitleToSheet.js";
import { getRequiredSKUFieldsName } from "./getRequiredSKUFieldsName.js";

var createSKUsSheet = async (report, sheet) => {
  var skus = getRequiredSKUFieldsName(report.skus);

  sheet = await writeSKUsToSheet(sheet, skus);
  sheet = await writeSKUsTitleToSheet(sheet);

  return sheet;
};

export default createSKUsSheet;
