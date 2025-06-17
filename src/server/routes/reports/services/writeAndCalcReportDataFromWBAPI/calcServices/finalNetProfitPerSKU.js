var calcFinalNetProfitPerSKU = async (netProfitPerSKU, costPrice, qty) => {
  if (netProfitPerSKU === 0 || qty === 0) {
    return 0;
  }

  var finalNetProfitPerSKU = netProfitPerSKU - qty * costPrice;

  return finalNetProfitPerSKU;
};

module.exports = calcFinalNetProfitPerSKU;
