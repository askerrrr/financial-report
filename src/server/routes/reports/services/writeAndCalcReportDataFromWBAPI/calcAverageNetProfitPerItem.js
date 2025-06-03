var calcAverageNetProfitPerItem = async (netProfitPerItem, qty) => {
  var averageNetProfitPerItem = netProfitPerItem / qty;

  return Math.round(averageNetProfitPerItem);
};

module.exports = calcAverageNetProfitPerItem;
