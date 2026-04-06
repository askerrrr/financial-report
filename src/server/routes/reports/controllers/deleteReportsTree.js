var deleteAllReportingPeriods = async (req, res, next) => {
  var { deleteReportTreeByUserId } = req.app.locals.reportsTreeCollectionServices;

  var { userId } = req.params;

  var successDelete = await deleteReportTreeByUserId(userId);

  return successDelete ? res.sendStatus(200) : res.sendStatus(304);
};

export default deleteAllReportingPeriods;
