var calcNetProfitAsAPercentagePerUnit = async (netProfit, costPrice) => {
  if (costPrice) {
    return (netProfit * 100) / costPrice;
  }

  return 0;
};

export default calcNetProfitAsAPercentagePerUnit;
