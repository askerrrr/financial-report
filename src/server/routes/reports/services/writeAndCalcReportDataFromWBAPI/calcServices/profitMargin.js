var shortNum = require("../shortNum");

var calcProfitMargin = async (revenuePerItem, finalProfitPerItem) => {
  if (finalProfitPerItem === 0) {
    return 0;
  }

  var profitMargin = (finalProfitPerItem * 100) / revenuePerItem;

  return await shortNum(profitMargin);
};

module.exports = calcProfitMargin;
