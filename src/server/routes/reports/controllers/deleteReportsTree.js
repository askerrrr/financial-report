var deleteAllReportingPeriods = async (req, res, next) => {
  var { deleteReportsTreeByUserId } = req.app.locals.reportsTreeCollectionServices;

  var { userId } = req.params;

  var successDelete = await deleteReportsTreeByUserId(userId);

  return successDelete ? res.sendStatus(200) : res.sendStatus(304);
};

module.exports = deleteAllReportingPeriods;
