var shortNum = require("../../writeAndCalcReportDataFromWBAPI/shortNum");

var caclAverageAdvertisingCostPerSKU = (totalSKUs, totalAdCampaignCosts) => {
  var averageAdvertisingCostPerSKU = totalAdCampaignCosts / totalSKUs;

  return shortNum(averageAdvertisingCostPerSKU);
};

module.exports = caclAverageAdvertisingCostPerSKU;
