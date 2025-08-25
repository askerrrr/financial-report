import getCookieValueByName from "../../getCookieValueByName.js";

var userId = await getCookieValueByName("userId");

var sendPeriodDate = async (dateFrom, dateTo) => {
  var res = await fetch("/reports/save-new-report", {
    method: "POST",
    body: JSON.stringify({ userId, dateFrom, dateTo }),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    var { msg } = await res.json();

    return alert(msg);
  }

  var reportData = await res.json();

  return reportData;
};

export default sendPeriodDate;
