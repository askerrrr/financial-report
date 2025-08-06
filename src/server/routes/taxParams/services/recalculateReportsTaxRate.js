var recalculateReportsTaxRate = async (newTaxRate, year, reports) => {
  reports.map((report) => {
    if (report.recordTo.year == year) {
      report.taxRate = newTaxRate;
    }
  });

  reports.map(
    (report) =>
      (report.totalTaxAmount = (report.totalRetailAmount * newTaxRate) / 100)
  );

  reports.map((report) =>
    report.skus.map((sku) => {
      if (report.recordTo.year == year) {
        sku.taxPerSKU = (sku.retailAmountPerSKU * newTaxRate) / 100;
      }
    })
  );

  return reports;
};
module.exports = recalculateReportsTaxRate;
