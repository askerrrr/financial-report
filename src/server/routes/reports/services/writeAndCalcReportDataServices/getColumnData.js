var getSimpleData = require("./getSimpleData");
var deleteColumnTitle = require("./deleteColumnTitle");
var getSummaryColumnData = require("./getSummaryColumnData");
var conversionToNumberOrString = require("./conversionToNumberOrString");

var getColumnData = async (colNum, ws, summaryData = false) => {
  var column = ws.getColumn(colNum);

  var data = [];

  column.eachCell((e) => data.push(e.text ?? ""));

  var columnDataWithoutTitle = deleteColumnTitle(data);

  var convertedData = conversionToNumberOrString(columnDataWithoutTitle);

  return summaryData
    ? getSummaryColumnData(convertedData)
    : getSimpleData(convertedData);
};

module.exports = getColumnData;
