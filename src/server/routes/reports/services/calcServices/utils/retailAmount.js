var truncateNum = require("../../reportParsing/truncateNum");

var calcRetailAmount = (report) => {
  var reportFilteredByReportType = report.filter((item) => item.report_type === 1);
  var retailAmount =
    reportFilteredByReportType.filter((item) => item.doc_type_name === "Продажа").reduce((acc, item) => acc + item.retail_amount, 0) -
    reportFilteredByReportType.filter((item) => item.doc_type_name === "Возврат").reduce((acc, item) => acc + item.retail_amount, 0);

  console.log({ retailAmount });
  return truncateNum(retailAmount);
};

module.exports = calcRetailAmount;
