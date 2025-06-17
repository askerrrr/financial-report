var calcAverageFinalNetProfitPerSKU = async (qty, finalNetProfitPerSKU) => {
  if (finalNetProfitPerSKU == 0) {
    return 0;
  }

  var averageFinalNetProfitPerSKU = finalNetProfitPerSKU / qty;

  return averageFinalNetProfitPerSKU;
};

module.exports = calcAverageFinalNetProfitPerSKU;
