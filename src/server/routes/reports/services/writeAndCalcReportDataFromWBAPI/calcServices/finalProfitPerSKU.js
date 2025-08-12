var shortNum = require("../shortNum");

var calcFinalProfitPerSKU = async (preTaxProfitPerSKU, insuranceFee, taxPerSKU = 0) => {
  var finalProfitPerSKU = preTaxProfitPerSKU - insuranceFee - taxPerSKU;

  return await shortNum(finalProfitPerSKU);
};

module.exports = calcFinalProfitPerSKU;
