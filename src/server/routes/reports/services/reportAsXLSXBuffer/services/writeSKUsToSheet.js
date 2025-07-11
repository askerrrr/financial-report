var { requiredSKUsField } = require("./getRequiredSKUFieldsName");

var columns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

var writeSKUsToSheet = async (workbook, skus) => {
  var sheet = workbook.addWorksheet("Лист 1");
  var cellNum = 2;

  for (var i = 0; i < skus.length; i++) {
    for (var j = 0; j < columns.length; j++) {
      var cellName = columns[j] + cellNum;

      var skuFieldValue = skus[i][requiredSKUsField[j]];

      sheet.getCell(cellName).value = skuFieldValue;
    }

    ++cellNum;
  }

  return workbook;
};

module.exports = writeSKUsToSheet;
