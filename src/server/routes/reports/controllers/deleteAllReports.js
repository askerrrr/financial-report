var deleteAllReports = async (req, res, next) => {
  var { deleteAllReportsByUserId } = req.app.locals.reportCollectionServices;

  var { userId } = req.params;

  var successDeleted = await deleteAllReportsByUserId(userId);

  return successDeleted ? res.sendStatus(200) : res.sendStatus(304);
};

module.exports = deleteAllReports;
