var shortNum = require("../shortNum");

var calcPreTaxProfitPerSKU = async ({ qty, profitPerSKU }, costPrice) => {
  if (profitPerSKU === 0 || qty === 0) {
    return 0;
  }

  var preTaxProfitPerSKU = profitPerSKU - qty * costPrice;

  return await shortNum(preTaxProfitPerSKU);
};

module.exports = calcPreTaxProfitPerSKU;
