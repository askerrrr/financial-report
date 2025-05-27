var calcNetProfitAsAPercentagePerUnit = async (netProfit, retailPrice) =>
  retailPrice ? (netProfit * 100) / retailPrice : 0;

export default calcNetProfitAsAPercentagePerUnit;
