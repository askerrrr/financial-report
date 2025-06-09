import shortNum from "./shortNum.js";

var calcTotalNetProfitMargin = async (
  totalRetailAmount,
  totalFinalNetProfit
) => {
  var totalNetProfitMargin = (totalFinalNetProfit * 100) / totalRetailAmount;

  return await shortNum(totalNetProfitMargin);
};

export default calcTotalNetProfitMargin;
