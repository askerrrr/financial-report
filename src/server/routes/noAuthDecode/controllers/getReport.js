var getReport = async (req, res, next) => {
  var { id } = req.params;

  var { report } = req.app.locals?.reports.find((report) => report.id === id);

  if (!report) {
    return res.status(500).json({ msg: "Произошла ошибка, попробуйте позже" });
  }

  var setCostPriceLink = "/no-auth-decode/report/set-cost-price";
  var downloadReportLink = "/no-auth-decode/xlsx/" + id + "/" + report.reportId;

  return res.json({ report, setCostPriceLink, downloadReportLink });
};

module.exports = getReport;
