var shortNum = require("../shortNum");

var calcTotalTaxAmount = async (totalRetailAmount, taxRate) => {
  if (taxRate) {
    return (totalRetailAmount * taxRate) / 100;
  }

  var defaultTaxRate = 6;

  var totalTaxAmount = (totalRetailAmount * defaultTaxRate) / 100;

  return await shortNum(totalTaxAmount);
};

module.exports = calcTotalTaxAmount;
