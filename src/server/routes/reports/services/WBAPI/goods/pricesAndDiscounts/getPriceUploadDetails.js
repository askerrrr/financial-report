var { WBAPIError } = require("../../../../../../customError");

var getPriceUploadDetails = async (userId, uploadId, token) => {
  try {
    var url = `https://discounts-prices-api.wildberries.ru/api/v2/history/goods/task?limit=1000&uploadID=${uploadId}`;
    var options = { method: "GET", headers: { "content-type": "application/json", Authorization: "Bearer " + token } };

    var res = await fetch(url, options);

    var json = await res.json();
    var { historyGoods } = json.data;

    return { historyGoods };
  } catch (e) {
    throw new WBAPIError(userId, res.status, e);
  }
};

module.exports = getPriceUploadDetails;
