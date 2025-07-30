var calcFinalProfitPerSKU = async (
  preTaxProfitPerSKU,
  insuranceFee,
  taxPerSKU = 0
) => preTaxProfitPerSKU - insuranceFee - taxPerSKU;

module.exports = calcFinalProfitPerSKU;
