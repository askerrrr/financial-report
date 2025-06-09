var calcTotalFinalNetProfit = async (items) => {
  var totalFinalNetProfit = items.reduce(
    (acc, i) => acc + i.finalNetProfitPerItem,
    0
  );

  return totalFinalNetProfit;
};

export default calcTotalFinalNetProfit;
