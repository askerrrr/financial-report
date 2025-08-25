var sendReportPeriod = async (dateFrom, dateTo) => {
  var res = await fetch("/reports/save-new-report", {
    method: "POST",
    body: JSON.stringify({ dateFrom, dateTo }),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    var { msg } = await res.json();

    return alert(msg);
  }

  var reportData = await res.json();

  return reportData;
};

export default sendReportPeriod;
