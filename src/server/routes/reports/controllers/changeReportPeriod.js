var changeReportPeriod = async (req, res, next) => {
  var { updateReportPeriod } = req.app.locals.reportCollectionServices;

  var { userId, reportId, value } = req.body;

  var succussfullUpdate = await updateReportPeriod(userId, reportId, value);

  return res.sendStatus(200);
};

module.exports = changeReportPeriod;
