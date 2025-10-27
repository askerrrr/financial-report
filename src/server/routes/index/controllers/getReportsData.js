var getReportTreeDto = require("../services/getReportTreeDto");

var projectonFields = [
  "reports.reportId",
  "reports.totalTaxAmount",
  "reports.totalFinalProfit",
  "reports.totalProductCosts",
].join(" ");

var getReportsData = async (req, res, next) => {
  var userId = req.app.locals.userId;

  var { getReportsByUserId } = req.app.locals.reportCollectionServices;
  var { getReportTree } = req.app.locals.reportsTreeCollectionServices;

  var [{ reportTree }, { reports }] = await Promise.all([
    getReportTree(userId),
    getReportsByUserId(userId, projectonFields),
  ]);

  if (!reportTree.length) {
    return res.json({ reports: [], reportTree: [] });
  }

  var reportTreeDto = await getReportTreeDto(reportTree);

  return res.json({ reports, reportTree: reportTreeDto });
};

module.exports = getReportsData;
