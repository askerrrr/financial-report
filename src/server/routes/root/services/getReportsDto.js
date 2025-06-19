var getReportsDto = async (reports) => {
  var data = [];

  for (var report of reports) {
    data.push({
      id: report.reportId,
      dateFrom: report.dateFrom,
      dateTo: report.dateTo,
      totalFinalNetProfit: report.totalFinalNetProfit,
      totalProductCosts: report.productCosts,
      totalTaxAmount: report.totalTaxAmount,
    });
  }

  return data;
};

module.exports = getReportsDto;
