/**
 * @param {'setcostprice' | 'setotherexpenses'} changedData
 */

var sendChangedData = async (data, isGuestAccess = false, changedData) => {
  var url;

  if (isGuestAccess) {
    url = "/decode-report-without-registration/report/set-cost-price";
  } else if (changedData === "setcostprice") {
    url = "/report/set-cost-price-to-sku";
  } else if (changedData === "setotherexpenses") {
    url = "/report/set-other-expenses-to-sku";
  }

  var res = await fetch(url, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    return alert("Не удалось изменить данные");
  }

  var data = await res.json();
  return data;
};

export default sendChangedData;
