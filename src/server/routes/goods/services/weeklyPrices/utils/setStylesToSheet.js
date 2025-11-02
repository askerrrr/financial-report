var setStylesToSheet = (ws) => {
  var columnNum = 1;
  var maxColumnCount = 8;

  while (columnNum <= maxColumnCount) {
    ws.getColumn(columnNum).width = 17;
    columnNum++;
  }

  return ws;
};

module.exports = setStylesToSheet;
