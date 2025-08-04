var url = "/reports/change";

var sendChangedData = async (costPriceData) => {
  var res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ ...costPriceData }),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    return alert("Не удалось изменить данные");
  }

  var data = await res.json();
  return data;
};

export default sendChangedData;
