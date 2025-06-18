var shortNum = require("../shortNum");

var calcTotalNetProfit = async (
  totalRevenue,
  totalStorageCost,
  totalDeliveryCost,
  totalPaidAcceptance
) => {
  var totalNetProfit =
    totalRevenue - totalStorageCost - totalDeliveryCost - totalPaidAcceptance;

  return await shortNum(totalNetProfit);
};

module.exports = calcTotalNetProfit;
