var { WBAPIError } = require("../../../../customError");

var calculateTotalAdCampaignCosts = async (data) =>
  data.reduce((acc, i) => acc + i.updSum, 0);

var getAdvertisingCostsForPeriod = async (dateFrom, dateTo, token) => {
  var url = `https://advert-api.wildberries.ru/adv/v1/upd?from=${dateFrom}&to=${dateTo}`;

  var res = await fetch(url, {
    method: "GET",
    headers: { Authorization: "Bearer " + token },
  });

  if (!res.ok) {
    throw new WBAPIError(
      userId,
      res.status,
      res.statusText,
      "advertising_report"
    );
  }

  var data = await res.json();

  var totalAdCampaignCosts = await calculateTotalAdCampaignCosts(data);

  return totalAdCampaignCosts;
};

module.exports = getAdvertisingCostsForPeriod;
