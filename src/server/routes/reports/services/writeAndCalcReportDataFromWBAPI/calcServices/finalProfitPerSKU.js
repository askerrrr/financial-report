var calcFinalProfitPerSKU = async (
  { qty, taxPerSKU, profitPerSKU },
  costPrice
) => {
  if (profitPerSKU === 0 || qty === 0) {
    return 0;
  }

  var finalProfitPerSKU = profitPerSKU - taxPerSKU - qty * costPrice;

  return finalProfitPerSKU;
};

module.exports = calcFinalProfitPerSKU;
