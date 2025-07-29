import shortNum from "./shortNum.js";

var calcTotalProfitMargin = async (totalRetailAmount, totalFinalProfit) => {
  var totalProfitMargin = (totalFinalProfit * 100) / totalRetailAmount;

  return await shortNum(totalProfitMargin);
};

export default calcTotalProfitMargin;
