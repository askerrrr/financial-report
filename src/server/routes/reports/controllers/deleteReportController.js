var deleteReportController = async (req, res, next) => {
  var { deleteReportFromDb } = req.app.locals.reportCollectionServices();

  var { userId, reportId } = req.params;

  var successDeleteReport = await deleteReportFromDb(userId, reportId);

  return successDeleteReport ? res.sendStatus(200) : res.sendStatus(304);
};

module.exports = deleteReportController;
