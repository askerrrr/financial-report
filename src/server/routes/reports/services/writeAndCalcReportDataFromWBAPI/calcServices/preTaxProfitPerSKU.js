var calcPreTaxProfitPerSKU = async ({ qty, profitPerSKU }, costPrice) => {
  if (profitPerSKU === 0 || qty === 0) {
    return 0;
  }

  var preTaxProfttPerSKU = profitPerSKU - qty * costPrice;

  return preTaxProfttPerSKU;
};

module.exports = calcPreTaxProfitPerSKU;
