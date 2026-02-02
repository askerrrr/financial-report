var fontStyles = { bold: true };
var alignmentStyles = { vertical: "middle", horizontal: "center" };

var columns = ["B", "C", "D", "E", "F", "G", "H"];

var writeYearsToColumns = (ws, listGoods) => {
  var sku = listGoods[0];
  var { metrics } = sku;
  var firstCellNum = 1;

  for (var i = 0; i < metrics.length; i++) {
    var column = columns[i];
    ws.getCell(column + firstCellNum).value = metrics[i].year;
    ws.getColumn(column).width = 20;
    ws.getColumn(column).alignment = alignmentStyles;
    ws.getColumn(column).font = fontStyles;
  }

  return ws;
};

module.exports = writeYearsToColumns;
