var shortNum = require("../shortNum");

var calcTaxPerSKU = async (retailAmount, taxRate) => {
  if (taxRate === 0) {
    return 0;
  }

  var taxPerSKU = (retailAmount * taxRate) / 100;

  return await shortNum(taxPerSKU);
};

module.exports = calcTaxPerSKU;
