var sendReportPeriodsToReportLoader = require("../services/different/sendReportPeriodsToReportLoader");

var reportLoadDelegate = async (req, res, next) => {
  var { isPeriodWithinSameWeek } = req.body;

  if (!isPeriodWithinSameWeek) {
    try {
      var { status } = await sendReportPeriodsToReportLoader(req.body);
      return res.sendStatus(status);
    } catch {
      return res.status(503).json({ msg: "Не удалось загрузить отчёты за выбранный период.\nВременно доступна загрузка отчётов по одному" });
    }
  }

  next();
};

module.exports = reportLoadDelegate;
