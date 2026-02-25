var reportInfo = (report) => {
  var reportPeriodElement = document.getElementById("report-period");
  var reportPediod = `${report.dateFrom} ----  ${report.dateTo}`;
  reportPeriodElement.textContent = reportPediod;

  var reportsItemsCountElement = document.getElementById("report-items-count");
  reportsItemsCountElement.textContent = report.skus.length;

  var financialAccountingStatusElement = document.getElementById("financial-accounting-status");
  financialAccountingStatusElement.textContent = report.isFinancesAccounted ? "Да" : "Нет";
};

export default reportInfo;
