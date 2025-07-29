var getReportsDto = async (reports) => {
  var data = [];

  for (var report of reports) {
    data.push({
      id: report.reportId,
      dateFrom: report.dateFrom,
      dateTo: report.dateTo,
      totalFinalProfit: report.totalFinalProfit,
      totalProductCosts: report.productCosts,
      totalTaxAmount: report.totalTaxAmount,
    });
  }

  return data;
};

module.exports = getReportsDto;
