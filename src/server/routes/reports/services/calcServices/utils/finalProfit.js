var truncateNum = require("../../reportParsing/truncateNum");

var calcFinalProfit = (sku, propPostfix = "") => {
  var finalProfit =
    sku["preTaxProfit" + propPostfix] -
    sku["tax" + propPostfix] -
    sku["insuranceFee" + propPostfix] -
    sku["additionalInsuranceFee" + propPostfix] -
    sku["otherExpenses" + propPostfix];

  return truncateNum(finalProfit);
};

module.exports = calcFinalProfit;
