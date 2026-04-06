var columns = ["B", "C", "D", "E", "F", "G", "H"];

var setFormulaToCells = (ws, skusQty) => {
  columns.map((column) => {
    var count = skusQty;

    var indentToPrice = 5;
    var indentToDiscount = 6;
    var indentToResult = 7;

    while (count > 0) {
      var priceCellAddress = column + indentToPrice;
      var discountCellAddress = column + indentToDiscount;

      var formula = `${priceCellAddress}  - (${priceCellAddress} * ${discountCellAddress}) /  100`;

      var resultCellAddress = column + indentToResult;
      ws.getCell(resultCellAddress).value = { formula };

      count--;
      indentToPrice += 5;
      indentToDiscount += 5;
      indentToResult += 5;
    }

    indentToPrice = 5;
    indentToDiscount = 6;
    indentToResult = 7;
  });

  return ws;
};

export default setFormulaToCells;
