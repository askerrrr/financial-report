var fontStyles = { font: 10 };

var alignmentStyles = { vertical: "middle", horizontal: "right" };

var writeTotalValuesToSheet = async (sheet, cellNum, totalValues) => {
  var cellName = "B";

  sheet.getColumn(2).width = 17;
  sheet.getColumn(2).font = fontStyles;
  sheet.getColumn(2).alignment = alignmentStyles;

  for (var value of Object.values(totalValues)) {
    var currentCell = cellName + cellNum;
    cellNum++;

    sheet.getCell(currentCell).value = value;
  }

  return sheet;
};

module.exports = writeTotalValuesToSheet;
