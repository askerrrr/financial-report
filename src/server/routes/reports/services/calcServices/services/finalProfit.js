var shortNum = require("../../writeAndCalcReportDataFromWBAPI/shortNum");

var calcFinalProfitPerSKU = (preTaxProfitPerSKU, insuranceFee, tax = 0) => {
  var finalProfitPerSKU = preTaxProfitPerSKU - insuranceFee - tax;

  return shortNum(finalProfitPerSKU);
};

module.exports = calcFinalProfitPerSKU;
