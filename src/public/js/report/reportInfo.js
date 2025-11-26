var reportInfo = ({ dateFrom, dateTo, skus }) => {
  var reportPeriodElement = document.getElementById("report-period");
  var reportPediod = `${dateFrom} ----  ${dateTo}`;
  reportPeriodElement.textContent = reportPediod;

  var reportsItemsCountElement = document.getElementById("report-items-count");
  reportsItemsCountElement.textContent = skus.length;
};

export default reportInfo;
