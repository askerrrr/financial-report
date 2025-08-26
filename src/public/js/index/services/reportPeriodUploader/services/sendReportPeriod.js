var sendReportPeriod = async (dateFrom, dateTo) => {
  var res = await fetch("/reports/save-new-report", {
    method: "POST",
    body: JSON.stringify({ dateFrom, dateTo }),
    headers: { "Content-Type": "application/json" },
  });

  console.log({ status: res.status });

  if (!res.ok) {
    var { msg } = await res.json();

    alert(msg);
    return;
  }

  var reportData = await res.json();

  return reportData;
};

export default sendReportPeriod;
