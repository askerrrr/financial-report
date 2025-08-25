var shortNum = require("../shortNum");

var calcTotalTaxAmount = async (skus) => {
  var totalTaxAmount = skus.reduce((acc, sku) => acc + sku.taxPerSKU, 0);

  return await shortNum(totalTaxAmount);
};

module.exports = calcTotalTaxAmount;
