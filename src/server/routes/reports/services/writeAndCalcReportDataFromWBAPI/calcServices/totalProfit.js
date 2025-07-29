var shortNum = require("../shortNum");

var calcTotalProfit = async (
  totalRevenue,
  totalStorageCost,
  totalDeliveryCost,
  totalPaidAcceptance,
  totalAdCampaignCosts
) => {
  var totalProfit =
    totalRevenue -
    totalStorageCost -
    totalDeliveryCost -
    totalPaidAcceptance -
    totalAdCampaignCosts;

  return await shortNum(totalProfit);
};

module.exports = calcTotalProfit;
