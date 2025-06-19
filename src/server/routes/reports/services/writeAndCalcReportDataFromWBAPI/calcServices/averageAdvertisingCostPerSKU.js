var shortNum = require("../shortNum");

var caclAverageAdvertisingCostPerSKU = async (
  totalSKUs,
  totalAdCampaignCosts
) => {
  var averageAdvertisingCostPerSKU = totalAdCampaignCosts / totalSKUs;

  return await shortNum(averageAdvertisingCostPerSKU);
};

module.exports = caclAverageAdvertisingCostPerSKU;
