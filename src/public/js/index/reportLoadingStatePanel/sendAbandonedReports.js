var url = "/reports/loading-state/abandoned/";

var sendAbandonedReports = async (userId, abandonedReportPeriods, needToResumeLoading) => {
  try {
    var res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, abandonedReportPeriods, needToResumeLoading }),
    });

    return res.status === 200;
  } catch (e) {
    console.log({ errMsg: e.message });
    return false;
  }
};

export default sendAbandonedReports;
