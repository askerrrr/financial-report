var sendCostPrices = async (userId, reportId, taxYear, costPrices, isGuestAccess = false) => {
  var url;

  if (isGuestAccess) {
    url = "/reports/set-cost-price-to-skus";
  } else {
    url = "/decode-report-without-registration/report/set-cost-price";
  }

  var res = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, reportId, taxYear, costPrices }),
  });

  if (!res.ok) {
    alert("Не удалось установить себестоимости...");
    return;
  }

  var { skusDataToClient, total } = await res.json();

  return { skusDataToClient, total };
};

export default sendCostPrices;
