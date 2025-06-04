var shortNum = require("../shortNum");
var calcNetProfitMargin = require("./calcNetProfitMargin");
var calcFinalNetProfitPerItem = require("./calcFinalNetProfitPerItem");
var calcAverageFinalNetProfitPerItem = require("./calcAverageFinalNetProfitPerItem");

var calcRemainingParams = async (item, costPrice) => {
  var finalNetProfitPerItem = await calcFinalNetProfitPerItem(
    item.netProfitPerItem,
    item.qty,
    costPrice
  );

  var netProfitMargin = await calcNetProfitMargin(
    item.revenuePerItem,
    finalNetProfitPerItem
  );

  var averageFinalNetProfitPerItem = await calcAverageFinalNetProfitPerItem(
    item.qty,
    finalNetProfitPerItem
  );

  item.netProfitMargin = await shortNum(netProfitMargin);
  item.finalNetProfitPerItem = await shortNum(finalNetProfitPerItem);
  item.averageFinalNetProfitPerItem = await shortNum(
    averageFinalNetProfitPerItem
  );

  return item;
};

module.exports = calcRemainingParams;
