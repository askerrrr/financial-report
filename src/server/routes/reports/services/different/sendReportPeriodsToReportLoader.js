var env = require("../../../../env");

var sendReportPeriodsToReportLoader = async ({ userId, dateFrom, dateTo }) => {
  var res = await fetch(env.report_loader_url, {
    method: "POST",
    body: JSON.stringify({ userId, dateFrom, dateTo }),
    headers: { "content-type": "application/json", Authorization: "Bearer " + env.secretKey },
  });

  return { status: res.status };
};

module.exports = sendReportPeriodsToReportLoader;
