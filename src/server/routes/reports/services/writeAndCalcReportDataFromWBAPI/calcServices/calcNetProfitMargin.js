var calcNetProfitMargin = async (revenuePerItem, finalNetProfitPerItem) => {
  if (typeof finalNetProfitPerItem !== "number" || finalNetProfitPerItem == 0) {
    return "Расчет только после ввода себестоимости";
  }

  var netProfitMargin = (finalNetProfitPerItem * 100) / revenuePerItem;

  return netProfitMargin;
};

module.exports = calcNetProfitMargin;
