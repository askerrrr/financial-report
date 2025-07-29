var calcAverageFinalProfitPerSKU = async (qty, finalProfitPerSKU) => {
  if (finalProfitPerSKU == 0) {
    return 0;
  }

  var averageFinalProfitPerSKU = finalProfitPerSKU / qty;

  return averageFinalProfitPerSKU;
};

module.exports = calcAverageFinalProfitPerSKU;
