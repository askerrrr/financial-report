var shortNum = require("../shortNum");

var calcInsuranceFeePerSKU = async (preTaxProfitPerSKU, insuranceFeePercentage) => {
  if (insuranceFeePercentage == 0) {
    return 0;
  }

  var insuranceFee = (preTaxProfitPerSKU * insuranceFeePercentage) / 100;

  return await shortNum(insuranceFee);
};

module.exports = calcInsuranceFeePerSKU;
