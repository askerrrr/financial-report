var getReport = async (req, res, next) => {
  var { id } = req.params;
  console.log({ id });

  var { report } = req.app.locals?.reports.find((report) => report.id === id);

  if (!report) {
    return res.status(500).json({ msg: "Произошла ошибка, попробуйте позже" });
  }

  var setCostPriceUrl = "/no-auth-decode/report/set-cost-price";

  return res.json({ report, setCostPriceUrl });
};

module.exports = getReport;
