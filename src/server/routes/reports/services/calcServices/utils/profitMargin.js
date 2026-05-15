import truncateNum from "../../reportParsing/truncateNum.js";

var calcProfitMargin = (finalProfit, retailAmount) => {
  if (finalProfit === 0) {
    return 0;
  }
  console.log({ finalProfit, retailAmount });
  var profitMargin = (finalProfit * 100) / retailAmount;
  return truncateNum(profitMargin);
};

export default calcProfitMargin;
