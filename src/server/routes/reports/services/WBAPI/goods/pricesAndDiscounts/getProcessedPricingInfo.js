var { WBAPIError } = require("../../../../../../customError");

var getProcessedPricingInfo = async (userId, uploadID, token) => {
  var url = `https://discounts-prices-api.wildberries.ru/api/v2/history/tasks?uploadID=${uploadID}`;
  var options = {
    headers: { "content-type": "application/json", Authorization: "Bearer " + token },
  };

  try {
    var res = await fetch(url, options);

    var { data, error, errorText } = await res.json();

    if (error) {
      throw new WBAPIError(userId, res.status, errorText);
    }

    return data;
  } catch (e) {
    if (e instanceof WBAPIError) {
      throw e;
    }

    throw new WBAPIError(userId, 400, e);
  }
};

module.exports = getProcessedPricingInfo;
