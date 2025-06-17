var calcAverageFinalNetProfitPerSKU = async (qty, finalNetProfitPerSKU) => {
  if (typeof finalNetProfitPerSKU !== "number" || finalNetProfitPerSKU == 0) {
    return "Расчет только после ввода себестоимости";
  }

  var averageFinalNetProfitPerSKU = finalNetProfitPerSKU / qty;

  return averageFinalNetProfitPerSKU;
};

module.exports = calcAverageFinalNetProfitPerSKU;
