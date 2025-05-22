var getReport = async (req, res, next) => {
  var { userId, id } = req.params;

  var { getReportById } = req.app.locals.reportCollectionServices();

  var report = await getReportById(userId, id);

  res.cookie("reportId", id).json({ report });
};

module.exports = getReport;
