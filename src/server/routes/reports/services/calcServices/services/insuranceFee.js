var shortNum = require("../../writeAndCalcReportDataFromWBAPI/shortNum");

var calcInsuranceFeePerSKU = (preTaxProfitPerSKU, insuranceFeePercentage) => {
  if (insuranceFeePercentage == 0) {
    return 0;
  }

  var insuranceFee = (preTaxProfitPerSKU * insuranceFeePercentage) / 100;

  return shortNum(insuranceFee);
};

module.exports = calcInsuranceFeePerSKU;
