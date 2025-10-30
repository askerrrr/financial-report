var shortNum = require("../../writeAndCalcReportDataFromWBAPI/shortNum");

var calcPreTaxProfitPerSKU = ({ qty, profit }, costPrice) => {
  if (profit === 0 || qty === 0) {
    return 0;
  }

  var preTaxProfitPerSKU = profit - qty * costPrice;

  return shortNum(preTaxProfitPerSKU);
};

module.exports = calcPreTaxProfitPerSKU;
