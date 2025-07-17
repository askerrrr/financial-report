var deleteReport = async (req, res, next) => {
  var { deleteReportFromDb } = req.app.locals.reportCollectionServices;
  var { deleteReportFromReportTree } =
    req.app.locals.reportsTreeCollectionServices;

  var { userId, reportId, year, month } = req.body;

  var deletedFromTree = await deleteReportFromReportTree(
    userId,
    year,
    month,
    reportId
  );

  var deleteFromReports = await deleteReportFromDb(userId, reportId);

  return deleteFromReports && deletedFromTree
    ? res.sendStatus(200)
    : res.sendStatus(304);
};

module.exports = deleteReport;
