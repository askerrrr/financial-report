const conversionToNumberOrString = require("./conversionToNumberOrString");
var deleteColumnTitle = require("./deleteColumnTitle");
var getTotalSumColumnData = require("./getTotalSumColumnData");

var getSimpleData = (arr) => arr.slice(0, -4);

var getColumnData = async (colNum, ws, isTotalSum = false) => {
  var column = ws.getColumn(colNum);

  var data = [];

  column.eachCell((e) => data.push(e.text ?? ""));

  data = deleteColumnTitle(data);
  data = conversionToNumberOrString(data);

  return isTotalSum ? getTotalSumColumnData(data) : getSimpleData(data);
};

module.exports = getColumnData;
