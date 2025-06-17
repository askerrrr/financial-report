var calcNetProfitMargin = async (revenuePerItem, finalNetProfitPerItem) => {
  if (finalNetProfitPerItem === 0) {
    return 0;
  }

  var netProfitMargin = (finalNetProfitPerItem * 100) / revenuePerItem;

  return netProfitMargin;
};

module.exports = calcNetProfitMargin;
