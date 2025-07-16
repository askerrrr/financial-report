var deleteAllReportingPeriods = async (req, res, next) => {
  var { deleteAllReportingPeriodsByUserId } =
    req.app.locals.reportsTreeCollectionServices;

  var { userId } = req.params;

  var successDelete = await deleteAllReportingPeriodsByUserId(userId);

  return successDelete ? res.sendStatus(200) : res.sendStatus(304);
};

module.exports = deleteAllReportingPeriods;
