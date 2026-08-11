var emptyReportPeriodMsg = "Нет данных за выбранный отчетный период";

var sendReportPeriod = async (userId, dateFrom, dateTo, isPeriodWithinSameWeek = false, needToLoadAllReports = false) => {
  var res = await fetch("/report/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, dateFrom, dateTo, isPeriodWithinSameWeek, needToLoadAllReports }),
  });

  if (res.status === 204) {
    return { reportData: {}, msg: emptyReportPeriodMsg };
  } else if (res.status !== 200) {
    var data = await res.json();
    return { reportData: {}, msg: data?.msg };
  } else {
    var data = await res.json();
    return { reportData: data?.reportData, msg: "" };
  }
};

export default sendReportPeriod;
