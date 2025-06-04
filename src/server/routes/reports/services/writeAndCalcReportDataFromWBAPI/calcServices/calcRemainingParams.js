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

  item.netProfitMargin = netProfitMargin;
  item.finalNetProfitPerItem = finalNetProfitPerItem;
  item.averageFinalNetProfitPerItem = averageFinalNetProfitPerItem;

  return item;
};

module.exports = calcRemainingParams;
