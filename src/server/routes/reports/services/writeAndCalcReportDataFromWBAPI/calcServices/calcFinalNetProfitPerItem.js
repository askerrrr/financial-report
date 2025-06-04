var calcFinalNetProfitPerItem = async (netProfitPerItem, costPrice, qty) => {
  var finalNetProfitPerItem = netProfitPerItem - qty * costPrice;

  return Math.round(finalNetProfitPerItem);
};

module.exports = calcFinalNetProfitPerItem;
