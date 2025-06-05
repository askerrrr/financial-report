var calcTotalFinalNetProfit = async (items) => {
  var totalFInalNetProfit = items.reduce(
    (acc, i) => acc + i.finalNetProfitPerItem,
    0
  );

  return totalFInalNetProfit;
};

module.exports = calcTotalFinalNetProfit;
