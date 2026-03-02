var url = "/reports/set-cost-price-to-sku";

var sendChangedData = async (data) => {
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
