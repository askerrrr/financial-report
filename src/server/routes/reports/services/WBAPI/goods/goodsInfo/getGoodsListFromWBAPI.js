var { WBAPIError } = require("../../../../../../customError");

var getGoodsListFromWBAPI = async (userId, token) => {
  try {
    var url = "https://discounts-prices-api.wildberries.ru/api/v2/list/goods/filter?limit=1000";

    var res = await fetch(url, { method: "GET", headers: { Authorization: "Bearer " + token } });

    var data = await res.json();

    if (data.error) {
      //
    }

    var { listGoods } = data.data;

    return { rawListGoogs: listGoods };
  } catch (e) {
    throw new WBAPIError(userId, 400, e);
  }
};

module.exports = getGoodsListFromWBAPI;
