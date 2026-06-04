var url = "/reports/loading-state/abandoned/";

var sendAbandonedReports = async (userId, abandonedReportPeriods, needToResumeLoading) => {
  var res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, abandonedReportPeriods, needToResumeLoading }),
  });

  return res.status;
};

export default sendAbandonedReports;
