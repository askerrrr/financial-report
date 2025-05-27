var calcNetProfitAsAPercentagePerUnit = async (netProfit, retailPrice) =>
  retailPrice ? Math.floor((netProfit * 100) / retailPrice) : 0;

export default calcNetProfitAsAPercentagePerUnit;
