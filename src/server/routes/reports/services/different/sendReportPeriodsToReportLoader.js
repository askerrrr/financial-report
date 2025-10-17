var sendReportPeriodsToReportLoader = async ({ userId, dateFrom, dateTo }) => {
  var res = await fetch(process.env.REPORT_LOADER_URL, {
    method: "POST",
    body: JSON.stringify({ userId, dateFrom, dateTo }),
    headers: { "content-type": "application/json", Authorization: "Bearer " + process.env.SECRET_KEY },
  });

  return { status: res.status };
};

module.exports = sendReportPeriodsToReportLoader;
