var calcProfitAsAPercentagePerUnit = async (profit, retailPrice) =>
  retailPrice ? Math.floor((profit * 100) / retailPrice) : 0;

export default calcProfitAsAPercentagePerUnit;
