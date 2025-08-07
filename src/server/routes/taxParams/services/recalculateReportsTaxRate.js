var calcTaxPerSKU = require("../../reports/services/writeAndCalcReportDataFromWBAPI/calcServices/taxPerSKU");

var recalculateReportsTaxRate = async (newTaxRate, year, reports) => {
  for (var report of reports) {
    if (report.recordTo.year == year) {
      report.taxRate = newTaxRate;

      report.skus.map(async (sku) => {
        sku.taxPerSKU = await calcTaxPerSKU(sku.retailAmountPerSKU, newTaxRate);
      });

      report.totalTaxAmount = report.skus.reduce(
        (acc, sku) => acc + sku.taxPerSKU,
        0
      );
    }
  }

  return reports;
};
module.exports = recalculateReportsTaxRate;
