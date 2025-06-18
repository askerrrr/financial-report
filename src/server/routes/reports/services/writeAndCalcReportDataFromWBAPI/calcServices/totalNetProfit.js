var calcTotalNetProfit = async (
  totalRevenue,
  totalStorageCost,
  totalDeliveryCost,
  totalPaidAcceptance
) => totalRevenue - totalStorageCost - totalDeliveryCost - totalPaidAcceptance;

module.exports = calcTotalNetProfit;
