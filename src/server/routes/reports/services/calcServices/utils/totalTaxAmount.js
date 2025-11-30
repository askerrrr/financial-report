var shortNum = require("../../reportParsing/shortNum");

var calcTotalTaxAmount = (skus) => {
  var totalTaxAmount = skus.reduce((acc, sku) => acc + sku.tax, 0);

  return shortNum(totalTaxAmount);
};

module.exports = calcTotalTaxAmount;
