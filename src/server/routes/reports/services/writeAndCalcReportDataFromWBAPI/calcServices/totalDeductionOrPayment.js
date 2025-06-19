var calcTotalDeductionOrPayment = async (report) =>
  report.reduce((acc, sku) => acc + sku.deduction, 0);

module.exports = calcTotalDeductionOrPayment;
