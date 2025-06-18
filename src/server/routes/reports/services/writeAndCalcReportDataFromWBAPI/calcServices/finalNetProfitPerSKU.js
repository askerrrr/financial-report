var calcFinalNetProfitPerSKU = async (
  { qty, taxPerSKU, netProfitPerSKU },
  costPrice
) => {
  if (netProfitPerSKU === 0 || qty === 0) {
    return 0;
  }

  var finalNetProfitPerSKU = netProfitPerSKU - taxPerSKU - qty * costPrice;

  return finalNetProfitPerSKU;
};

module.exports = calcFinalNetProfitPerSKU;
