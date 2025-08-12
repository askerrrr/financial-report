var shortNum = require("../shortNum");

var calcTotalTaxAmount = async (totalRetailAmount, taxRate) => {
  if (taxRate === 0) {
    return 0;
  }

  var totalTaxAmount = (totalRetailAmount * taxRate) / 100;

  return await shortNum(totalTaxAmount);
};

module.exports = calcTotalTaxAmount;
