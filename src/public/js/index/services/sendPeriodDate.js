import getCookieByName from "./getCookieByName.js";

var userId = await getCookieByName("userId");

var sendPeriodDate = async (dateFrom, dateTo) => {
  var res = await fetch("/reports/wbapi", {
    method: "POST",
    body: JSON.stringify({ userId, dateFrom, dateTo }),
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    var reportData = await res.json();

    return reportData;
  }

  return;
};

export default sendPeriodDate;
