var calcTaxPerSKU = async (retailAmount, taxRate) => {
  if (taxRate) {
    return (retailAmount * taxRate) / 100;
  }

  var defaultTaxRate = 6;

  return (retailAmount * defaultTaxRate) / 100;
};

module.exports = calcTaxPerSKU;
