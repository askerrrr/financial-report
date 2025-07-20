var calcTaxPerSKU = async (retailAmount, taxRate) => {
  var taxPerSKU = (retailAmount * taxRate) / 100;

  return taxPerSKU;
};

module.exports = calcTaxPerSKU;
