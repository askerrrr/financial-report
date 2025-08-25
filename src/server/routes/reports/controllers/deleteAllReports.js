var deleteAllReports = async (req, res, next) => {
  var { deleteAllReportsByUserId } = req.app.locals.reportCollectionServices;
  var { deleteReportsTreeByUserId } = req.app.locals.reportsTreeCollectionServices;
  var { deleteTaxYears } = req.app.locals.taxParamsCollectionServices;

  var { userId } = req.params;

  var taxYearsIdDeleted = await deleteTaxYears(userId);
  var reportsIsDeleted = await deleteAllReportsByUserId(userId);
  var reportTreeIsDeleted = await deleteReportsTreeByUserId(userId);

  return taxYearsIdDeleted && reportsIsDeleted && reportTreeIsDeleted ? res.sendStatus(200) : res.sendStatus(304);
};

module.exports = deleteAllReports;
