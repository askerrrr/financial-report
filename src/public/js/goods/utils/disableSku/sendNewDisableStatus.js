var sendNewDisableStatus = async (skuName, disableStatus) => {
  var url = "/goods/change-sku-disable-status";
  var userId = document.cookie.split("=")[1];

  disableStatus = disableStatus === false;

  var res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ userId, skuName, disableStatus }),
    headers: { "content-type": "application/json" },
  });

  if (!res.ok) {
    alert("Не удалось скрыть товар...");
    return;
  }

  return true;
};

export default sendNewDisableStatus;
