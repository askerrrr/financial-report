var getReport = async (req, res, next) => {
  var { userId, id } = req.pamams;

  var { getReportById } = req.app.locals.reportCollectionServices();

  var report = await getReportById(userId, id);

  res.json({ report });
};

module.exports = getReport;
