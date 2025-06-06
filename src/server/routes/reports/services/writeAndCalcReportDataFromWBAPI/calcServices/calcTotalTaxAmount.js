var calcTotalTaxAmount = async (totalRetailAmount, taxRate) => {
  if (taxRate) {
    return (totalRetailAmount * taxRate) / 100;
  }

  var defaultTaxRate = 6;
  return (totalRetailAmount * defaultTaxRate) / 100;
};

module.exports = calcTotalTaxAmount;
