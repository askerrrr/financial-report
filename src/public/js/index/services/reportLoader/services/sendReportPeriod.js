var sendReportPeriod = async (dateFrom, dateTo, isPeriodWithinSameWeek) => {
  var res = await fetch("/reports/save-new-report", {
    method: "POST",
    body: JSON.stringify({ dateFrom, dateTo, isPeriodWithinSameWeek }),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    var { msg } = await res.json();
    alert(msg);
    return;
  }

  var reportData = await res.json();
  return reportData;
};

export default sendReportPeriod;
