var deleteAllReports = async (req, res, next) => {
  var { deleteAllReportsByUserId } = req.app.locals.reportCollectionServices;

  var { userId } = req.params;

  var successDeleted = await deleteAllReportsByUserId(userId);

  return res.status(200).json(successDeleted);
};

module.exports = deleteAllReports;
