import getCookieValueByName from "./getCookieValueByName.js";

var getReportsData = async () => {
  var userId = await getCookieValueByName("userId");

  var res = await fetch("/api/" + userId);

  if (!res.ok) {
    return alert("Не удалось загрузить отчеты");
  }

  var reportData = await res.json();

  return reportData;
};

export default getReportsData;
