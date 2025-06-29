var deleteAllReportingPeriods = async (req, res, next) => {
  var { deleteAllReportingPeriodsByUserId } =
    req.app.locals.reportingPeriodsCollectionServices;

  var userId = req.app.locals.userId;

  await deleteAllReportingPeriodsByUserId(userId);
};

module.exports = deleteAllReportingPeriods;
