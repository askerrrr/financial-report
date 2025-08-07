var recalculateReportsTaxRate = async (newTaxRate, year, reports) => {
  for (var report of reports) {
    if (report.recordTo.year == year) {
      report.taxRate = newTaxRate;

      report.totalTaxAmount = (report.totalRetailAmount * newTaxRate) / 100;

      report.skus.map((sku) => {
        sku.taxPerSKU = (sku.retailAmountPerSKU * newTaxRate) / 100;
      });
    }
  }

  return reports;
};
module.exports = recalculateReportsTaxRate;
