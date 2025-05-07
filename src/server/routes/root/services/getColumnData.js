var deleteColumnTitle = require("./deleteColumnTitle");
var getTotalSumColumnData = require("./getTotalSumColumnData");

var getSimpleData = (arr) => arr.slice(0, -4);

var conversionToNumber = (data) => {
  console.log(data);
  if (data.every((i) => typeof +i == "number")) {
    return data.map((i) => +i);
  }

  return data;
};

var getColumnData = async (colNum, ws, isTotalSum = false) => {
  var column = ws.getColumn(colNum);

  var data = [];

  column.eachCell((e) => data.push(e.text ?? ""));

  data = deleteColumnTitle(data);

  data = conversionToNumber(data);

  return isTotalSum ? getTotalSumColumnData(data) : getSimpleData(data);
};

module.exports = getColumnData;
