var calcTotalNetProfit = async (data) => {
  var totalNetProfit = data.reduce((acc, i) => {
    if (
      typeof i.finalNetProfitPerItem == "number" ||
      i.finalNetProfitPerItem > 0
    ) {
      return acc + i.finalNetProfitPerItem;
    }

    return "Расчет только после ввода себестоимости";
  }, 0);

  return totalNetProfit;
};

module.exports = calcTotalNetProfit;
