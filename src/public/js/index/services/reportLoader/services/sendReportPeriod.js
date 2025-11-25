var sendReportPeriod = async (dateFrom, dateTo, isPeriodWithinSameWeek, uploadAllReports) => {
  var userId = document.cookie.split("=")[1];

  var res = await fetch("/reports/save-new-report", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, dateFrom, dateTo, isPeriodWithinSameWeek, uploadAllReports }),
  });

  if (res.status !== 200) {
    var { msg } = await res.json();
    alert(msg);
    return;
  }

  var reportData = await res.json();
  return reportData;
};

export default sendReportPeriod;
