var calcTotalProfitMargin = ({ totalRetailAmount, totalFinalProfit }) => {
  if (totalFinalProfit === 0 || totalRetailAmount === 0) {
    return 0;
  }

  var totalProfitMargin = (totalFinalProfit * 100) / totalRetailAmount;
  return totalProfitMargin;
};

module.exports = calcTotalProfitMargin;
