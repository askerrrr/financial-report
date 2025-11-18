var { WBAPIError } = require("../../../../../../customError");

var getPricesAndDiscountsByListGoods = async (userId, token, nmList) => {
  try {
    var url = "https://discounts-prices-api.wildberries.ru/api/v2/list/goods/filter";
    var options = {
      method: "POST",
      body: JSON.stringify({ nmList }),
      headers: { Authorization: "Bearer " + token },
    };

    var res = await fetch(url, options);

    var json = await res.json();

    if (json.error) {
      throw new WBAPIError(userId, res.status, json.errorText);
    }

    var { listGoods } = json.data;

    return { rawListGoods: listGoods };
  } catch (e) {
    if (e instanceof WBAPIError) {
      throw e;
    }

    throw new WBAPIError(userId, 500, e);
  }
};

module.exports = getPricesAndDiscountsByListGoods;
