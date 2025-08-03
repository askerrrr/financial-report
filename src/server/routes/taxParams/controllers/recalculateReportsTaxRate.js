var recalculateReportsTaxRate = async (req, res, next) => {
  var taxRate = req.taxRate;
  var userId = req.app.locals.userId;
  var { getReportsByUserId, saveUpdatedReports } =
    req.app.locals.reportCollectionServices;

  var reports = await getReportsByUserId(userId);

  if (reports.length == 0) {
    return res.sendStatus(200);
  }

  reports.map((report) => (report.taxRate = taxRate));
  reports.map(
    (report) =>
      (report.totalTaxAmount = (report.totalRetailAmount * taxRate) / 100)
  );

  reports.map((report) =>
    report.skus.map(
      (sku) => (sku.taxPerSKU = (sku.retailAmountPerSKU * taxRate) / 100)
    )
  );

  var successUpdate = await saveUpdatedReports(userId, reports);

  if (successUpdate) {
    return res.sendStatus(200);
  }

  return res.sendStatus(304);
};

module.exports = recalculateReportsTaxRate;
