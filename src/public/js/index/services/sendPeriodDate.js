import getCookieByName from "./getCookieByName.js";

var userId = await getCookieByName("userId");

var sendPeriodDate = async (dateFrom, dateTo) => {
  var res = await fetch("/reports/wbapi", {
    method: "POST",
    body: JSON.stringify({ userId, dateFrom, dateTo }),
    headers: { "Content-Type": "application/json" },
  });

  return res.ok;
};

export default sendPeriodDate;
