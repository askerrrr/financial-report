var shortNum = require("../shortNum");

var calcTotalNetProfit = async (
  totalRevenue,
  totalStorageCost,
  totalDeliveryCost,
  totalPaidAcceptance,
  totalAdCampaignCosts
) => {
  var totalNetProfit =
    totalRevenue -
    totalStorageCost -
    totalDeliveryCost -
    totalPaidAcceptance -
    totalAdCampaignCosts;

  return await shortNum(totalNetProfit);
};

module.exports = calcTotalNetProfit;
