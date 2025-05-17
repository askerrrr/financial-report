var getReport = async (req, res, next) => {
  var { userId, id } = req.pamams;

  var { getReportById } = req.app.locals.reportCollectionServices();
};

module.exports = getReport;
