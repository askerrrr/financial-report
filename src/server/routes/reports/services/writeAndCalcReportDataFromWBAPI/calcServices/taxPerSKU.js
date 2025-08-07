var shortNum = require("../shortNum");

var calcTaxPerSKU = async (retailAmount, taxRate) => {
  var taxPerSKU = (retailAmount * taxRate) / 100;

  return await shortNum(taxPerSKU);
};

module.exports = calcTaxPerSKU;
