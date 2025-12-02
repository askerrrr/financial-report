var calcInsuranceFeePerSKU = (preTaxProfit, insuranceFeePercentage) => {
  if (insuranceFeePercentage == 0) {
    return 0;
  }

  var insuranceFee = (preTaxProfit * insuranceFeePercentage) / 100;

  return insuranceFee;
};

module.exports = calcInsuranceFeePerSKU;
