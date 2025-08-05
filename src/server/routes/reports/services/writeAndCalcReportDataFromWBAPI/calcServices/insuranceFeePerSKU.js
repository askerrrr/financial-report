var shortNum = require("../shortNum");

var calcInsuranceFeePerSKU = async (
  finalProfitPerSKU,
  insuranceFeePercentage
) => {
  if (insuranceFeePercentage == 0) {
    return 0;
  }

  var insuranceFee = (finalProfitPerSKU * insuranceFeePercentage) / 100;

  return await shortNum(insuranceFee);
};

module.exports = calcInsuranceFeePerSKU;
