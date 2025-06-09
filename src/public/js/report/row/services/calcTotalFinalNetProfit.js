import shortNum from "./shortNum.js";

var calcTotalFinalNetProfit = async (items) => {
  var totalFinalNetProfit = items.reduce(
    (acc, i) => acc + i.finalNetProfitPerItem,
    0
  );

  return await shortNum(totalFinalNetProfit);
};

export default calcTotalFinalNetProfit;
