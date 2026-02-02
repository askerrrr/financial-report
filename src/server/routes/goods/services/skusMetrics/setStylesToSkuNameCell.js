var firstColumnName = "A";

var setStylesToSkuNameCell = function (ws, indentToNextSku) {
  var fontStyles = { bold: true };
  var alignmentStyles = { vertical: "middle", horizontal: "center" };

  ws.getCell(firstColumnName + indentToNextSku).font = fontStyles;
  ws.getCell(firstColumnName + indentToNextSku).alignment = alignmentStyles;

  return ws;
};

module.exports = setStylesToSkuNameCell;
