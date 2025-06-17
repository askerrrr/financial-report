var calcFinalNetProfitPerSKU = async (netProfitPerSKU, costPrice, qty) => {
  var finalNetProfitPerSKU = netProfitPerSKU - qty * costPrice;

  return finalNetProfitPerSKU;
};

module.exports = calcFinalNetProfitPerSKU;
