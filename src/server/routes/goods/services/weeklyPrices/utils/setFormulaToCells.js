var columns = ["B", "C", "D", "E", "F", "G", "H"];

var setFormulaToCells = (ws, skusQty) => {
  columns.map((column, index) => {
    var count = skusQty;

    var cellNum = 5;

    while (count > 0) {
      var cellName = column + cellNum; //price
      var lowerCellName = column + (cellNum + 1); //discount

      var formula = `${cellName}  - (${cellName} * ${lowerCellName}) /  100`;

      var resultCell = column + (cellNum + 2);
      ws.getCell(resultCell).value = { formula };

      count--;
      cellNum += 5;
    }

    cellNum = 5;

    n = skusQty;
  });

  return ws;
};

module.exports = setFormulaToCells;
