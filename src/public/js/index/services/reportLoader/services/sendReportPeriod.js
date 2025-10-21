var sendReportPeriod = async (dateFrom, dateTo, isPeriodWithinSameWeek) => {
  var userId = document.cookie.split("=")[1];

  var res = await fetch("/reports/save-new-report", {
    method: "POST",
    body: JSON.stringify({ userId, dateFrom, dateTo, isPeriodWithinSameWeek }),
    headers: { "Content-Type": "application/json" },
  });

  if (res.status === 409) {
    var { msg } = await res.json();
    alert(msg);
    return;
  }

  if (res.status === 202) {
    return true;
  }

  if (!res.ok) {
    var { msg } = await res.json();
    alert(msg);
    return;
  }

  var reportData = await res.json();
  return reportData;
};

export default sendReportPeriod;
