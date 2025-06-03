var calcTotalNetProfitMargin = async (totalRevenue, totalNetProfit) => {
  if (typeof totalNetProfit !== "number" || totalNetProfit == 0) {
    return "Расчет только после ввода себестоимости";
  }

  var totalNetProfitMargin = (totalNetProfit * 100) / totalRevenue;

  return Math.round(totalNetProfitMargin);
};

module.exports = calcTotalNetProfitMargin;
