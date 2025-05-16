var getReportsData = async (req, res, next) => {
  var { getReportsByUserId } = req.app.locals.reportCollectionServices();
};

module.exports = getReportsData;
