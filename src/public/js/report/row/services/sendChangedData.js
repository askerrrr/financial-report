import getCookieByName from "../../../index/services/getCookieByName.js";

var userId = await getCookieByName("userId");

var sendChangedData = async (value, index, fieldName, url, reportId) => {
  var res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ userId, value, index, fieldName, reportId }),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    return alert("Не удалось изменить данные");
  }

  var data = await res.json();

  return data;
};

export default sendChangedData;
