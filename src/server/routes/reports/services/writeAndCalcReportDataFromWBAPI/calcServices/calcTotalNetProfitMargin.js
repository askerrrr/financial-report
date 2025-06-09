var calcTotalNetProfitMargin = async (totalRetailAmount, totalNetProfit) => {
  if (typeof totalNetProfit !== "number" || totalNetProfit == 0) {
    return "Расчет только после ввода себестоимости";
  }

  var totalNetProfitMargin = (totalNetProfit * 100) / totalRetailAmount;

  return totalNetProfitMargin;
};

module.exports = calcTotalNetProfitMargin;
