var totalValuesStyles = { vertical: "middle", horizontal: "right" };

var writeTotalValuesToSheet = async (sheet, cellNum, totalValues) => {
  var cellName = "B";

  for (var value of Object.values(totalValues)) {
    var currentCell = cellName + cellNum;
    cellNum++;

    sheet.getCell(currentCell).value = value;
    sheet.getCell(currentCell).alignment = totalValuesStyles;
  }

  return sheet;
};

module.exports = writeTotalValuesToSheet;
