var { requiredSKUsFieldsName } = require("./getRequiredSKUFieldsName");

var columns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

var alignmentStyles = {
  vertical: "middle",
  horizontal: "center",
};

var writeSKUsToSheet = async (sheet, skus) => {
  var cellNum = 2;

  for (var i = 0; i < skus.length; i++) {
    for (var j = 0; j < columns.length; j++) {
      var cellName = columns[j] + cellNum;

      var skuFieldValue = skus[i][requiredSKUsFieldsName[j]];

      sheet.getCell(cellName).alignment = alignmentStyles;

      sheet.getCell(cellName).value = skuFieldValue;
    }

    ++cellNum;
  }

  return sheet;
};

module.exports = { writeSKUsToSheet, columns };
