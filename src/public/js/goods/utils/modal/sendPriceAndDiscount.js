var sendPriceAndDiscount = async (sku, checkedWeekDays, setNewPriceNow, expectedPriceExists = false) => {
  var userId = document.cookie.split("=")[1];
  console.log({ sku, checkedWeekDays, setNewPriceNow, expectedPriceExists });
  var url = "/goods/set-price-or-discount";

  var res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      userId,
      sku,
      checkedWeekDays,
      setNewPriceNow,
      expectedPriceExists,
    }),
  });

  if (!res.ok) {
    alert("Не удалось сохранить...");
    return;
  }

  return true;
};

export default sendPriceAndDiscount;
