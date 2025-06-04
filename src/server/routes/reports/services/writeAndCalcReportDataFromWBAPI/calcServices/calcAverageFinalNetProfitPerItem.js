var calcAverageFinalNetProfitPerItem = async (qty, finalNetProfitPerItem) => {
  if (typeof finalNetProfitPerItem !== "number" || finalNetProfitPerItem == 0) {
    return "Расчет только после ввода себестоимости";
  }

  var averageFinalNetProfitPerItem = finalNetProfitPerItem / qty;

  return Math.round(averageFinalNetProfitPerItem);
};

module.exports = calcAverageFinalNetProfitPerItem;
