var calcAverageNetProfitPerItem = async (netProfitPerItem, qty) => {
  var averageNetProfitPerItem = netProfitPerItem / qty;

  return averageNetProfitPerItem;
};

module.exports = calcAverageNetProfitPerItem;
