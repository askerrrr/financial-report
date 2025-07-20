var shortNum = require("../shortNum");

var calcTotalTaxAmount = async (totalRetailAmount, taxRate) => {
  var totalTaxAmount = (totalRetailAmount * taxRate) / 100;

  return await shortNum(totalTaxAmount);
};

module.exports = calcTotalTaxAmount;
