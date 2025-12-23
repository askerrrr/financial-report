var truncateNum = require("../../reportParsing/truncateNum");

var calcFinalProfit = (preTaxProfit, insuranceFee, tax = 0) => {
  var finalProfit = preTaxProfit - insuranceFee - tax;
  return truncateNum(finalProfit);
};

module.exports = calcFinalProfit;
