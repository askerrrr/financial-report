var calcAverageProfitPerSKU = async (profitPerSKU, qty) => {
  if (profitPerSKU == 0 || qty == 0) {
    return 0;
  }

  var averageProfitPerSKU = profitPerSKU / qty;

  return averageProfitPerSKU;
};

module.exports = calcAverageProfitPerSKU;
