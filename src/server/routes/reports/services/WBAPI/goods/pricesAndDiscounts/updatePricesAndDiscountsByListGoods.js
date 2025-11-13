var updatePricesAndDiscountsByListGoods = async (userId, token, nmList) => {
  var url = "https://discounts-prices-api.wildberries.ru/api/v2/list/goods/filter";
  var options = {
    method: "POST",
    body: JSON.stringify({ nmList }),
    headers: { Authorization: "Bearer " + token },
  };

  var res = await fetch(url, options);

  var json = await res.json();

  if (json.error) {
    //
  }

  var { listGoods } = json.data;

  return { rawListGoogs: listGoods };
};

module.exports = updatePricesAndDiscountsByListGoods;
