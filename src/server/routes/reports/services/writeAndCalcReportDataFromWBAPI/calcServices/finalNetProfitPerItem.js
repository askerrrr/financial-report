var calcFinalNetProfitPerItem = async (netProfitPerItem, costPrice, qty) => {
  var finalNetProfitPerItem = netProfitPerItem - qty * costPrice;

  return finalNetProfitPerItem;
};

module.exports = calcFinalNetProfitPerItem;
