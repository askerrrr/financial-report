/**
 * @param {'setcostprice' | 'setotherexpenses'} changedData
 */

var sendChangedData = async (data, isGuestAccess = false, changedData) => {
  var url;

  if (isGuestAccess) {
    url = "/decode-report-without-registration/report/set-cost-price";
  } else if (changedData === "setcostprice") {
    url = "/report/skus/cost-price";
  } else if (changedData === "setotherexpenses") {
    url = "/report/skus/other-expenses";
  }

  var res = await fetch(url, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    alert("Не удалось изменить данные");
    return;
  }

  var data = await res.json();
  return data;
};

export default sendChangedData;
