var shortNum = require("../../reportParsing/shortNum");

var caclAverageAdvertisingCostPerSKU = (totalSKUs, totalAdCampaignCosts) => {
  var averageAdvertisingCost = totalAdCampaignCosts / totalSKUs;

  return shortNum(averageAdvertisingCost);
};

module.exports = caclAverageAdvertisingCostPerSKU;
