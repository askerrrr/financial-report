var calcTotalFinalNetProfit = require("./calcServices/calcTotalFinalNetProfit");

var calcRestTotalParams = async (rest, items) => {
  rest.totalFinalNetProfit = await calcTotalFinalNetProfit(items);

  return { ...rest, items };
};

module.exports = calcRestTotalParams;
