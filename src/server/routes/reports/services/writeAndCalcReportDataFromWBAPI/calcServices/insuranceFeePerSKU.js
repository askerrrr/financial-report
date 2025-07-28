var shortNum = require("../shortNum");

var calcInsuranceFeePerSKU = async (
  finalNetProfitPerSKU,
  insuranceFeePercentage
) => {
  var insuranceFee = (finalNetProfitPerSKU * insuranceFeePercentage) / 100;

  return await shortNum(insuranceFee);
};

module.exports = calcInsuranceFeePerSKU;
