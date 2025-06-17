var calcAverageNetProfitPerItem = async (netProfitPerItem, qty) => {
  if (netProfitPerItem == 0 || qty == 0) {
    return 0;
  }

  var averageNetProfitPerItem = netProfitPerItem / qty;

  return averageNetProfitPerItem;
};

module.exports = calcAverageNetProfitPerItem;
