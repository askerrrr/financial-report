var projectonFields = [
  "reports.reportId",
  "reports.totalTaxAmount",
  "reports.totalFinalProfit",
  "reports.totalProductCosts",
  "reports.isFinancesAccounted",
];

var getReports = async (req, res, next) => {
  var { userId, reportIds } = req.body;
  var { getReportsByUserId } = req.app.locals.reportCollectionServices;

  var { reports } = await getReportsByUserId(userId, null, projectonFields, reportIds);

  return res.json({ reports });
};

module.exports = getReports;
