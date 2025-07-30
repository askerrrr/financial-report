var shortNum = require("../shortNum");

var calcTotalPreTaxProfit = async (skus) => {
  var totalPreTaxProfit = skus.reduce(
    (acc, sku) => acc + sku.preTaxProfitPerSKU,
    0
  );

  return await shortNum(totalPreTaxProfit);
};

module.exports = calcTotalPreTaxProfit;
