var checkAllCostPricesNonZero = async (req, res, next) => {
  var { userId, reportIds } = req.body;
  var { getReportById } = req.app.locals.reportCollectionServices;

  var reports = [];

  for (var id of reportIds) {
    var report = await getReportById(userId, id);

    reports.push(report);
  }

  var allCostPricesNonZero = reports.every((report) => report.skus.every((sku) => sku.costPrice > 0));

  if (!allCostPricesNonZero) {
    return res.sendStatus(400);
  }

  req.reports = reports;

  next();
};

module.exports = checkAllCostPricesNonZero;
