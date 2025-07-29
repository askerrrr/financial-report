var shortNum = require("../shortNum");

var calcInsuranceFeePerSKU = async (
  finalProfitPerSKU,
  insuranceFeePercentage
) => {
  var insuranceFee = (finalProfitPerSKU * insuranceFeePercentage) / 100;

  return await shortNum(insuranceFee);
};

module.exports = calcInsuranceFeePerSKU;
