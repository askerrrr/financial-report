var sendPriceAndDiscount = async (skuId, price, discount, checkedWeekDays) => {
  var userId = document.cookie.split("=")[1];

  var url = "/goods/set-price-or-discount";

  var res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ userId, skuId, price, discount, checkedWeekDays }),
  });

  if (!res.ok) {
    alert("Не удалось сохранить...");
    return;
  }

  return true;
};

export default sendPriceAndDiscount;
