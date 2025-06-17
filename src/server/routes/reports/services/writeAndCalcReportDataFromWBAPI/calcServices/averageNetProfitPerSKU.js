var calcAverageNetProfitPerSKU = async (netProfitPerSKU, qty) => {
  if (netProfitPerSKU == 0 || qty == 0) {
    return 0;
  }

  var averageNetProfitPerSKU = netProfitPerSKU / qty;

  return averageNetProfitPerSKU;
};

module.exports = calcAverageNetProfitPerSKU;
