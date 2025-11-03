var { WBAPIError } = require("../../../../customError");

var setPricesAndDiscounts = async (userId, token, weeklyPricesAndDiscounts) => {
  try {
    var url = "https://discounts-prices-api.wildberries.ru/api/v2/upload/task";

    var options = {
      method: "POST",
      body: JSON.stringify(weeklyPricesAndDiscounts),
      headers: { "content-type": "application/json", Authorization: "Bearer " + token },
    };

    var res = await fetch(url, options);

    var { data, error, errorText } = await res.json();

    if (error) {
      throw new WBAPIError(userId, res.status, errorText);
    }

    var { id, alreadyExists } = data;

    return { id, alreadyExists };
  } catch (e) {
    if (e instanceof WBAPIError) {
      throw e;
    }

    throw new WBAPIError(userId, res.status, e);
  }
};

module.exports = setPricesAndDiscounts;
