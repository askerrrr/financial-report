import calc from "../../reports/services/calcServices/index.js";

var recalculateReportsTaxRate = async (newTaxRate, year, reports) => {
  for (var report of reports) {
    if (report.recordTo.year == year) {
      report.taxRate = newTaxRate;

      report.skus.map(async (sku) => {
        sku.tax = calc.sku.tax(sku.retailAmount, newTaxRate);
      });

      report.totalTaxAmount = report.skus.reduce((acc, sku) => acc + sku.tax, 0);
    }
  }

  return reports;
};
export default recalculateReportsTaxRate;
