var calcTotalNetProfit = async (data) => {
  var totalNetProfit = data.reduce((acc, i) => {
    if (
      typeof i.finalNetProfitPerSKU == "number" ||
      i.finalNetProfitPerSKU > 0
    ) {
      return acc + i.finalNetProfitPerSKU;
    }

    return "Расчет только после ввода себестоимости";
  }, 0);

  return totalNetProfit;
};

module.exports = calcTotalNetProfit;
