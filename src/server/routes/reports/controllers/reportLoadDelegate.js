var sendReportPeriodsToReportLoader = require("../services/different/sendReportPeriodsToReportLoader");

var reportLoadDelegate = async (req, res, next) => {
  var { uploadAllReports } = req.body;

  if (uploadAllReports) {
    try {
      var { status } = await sendReportPeriodsToReportLoader(req.body);
      return res.status(status).json({ msg: "Загрузка отчётов началась. Они будут отображаться по мере их добавления" });
    } catch {
      return res.status(503).json({ msg: "Не удалось загрузить отчёты за выбранный период.\nВременно доступна загрузка отчётов по одному" });
    }
  }

  var { isPeriodWithinSameWeek } = req.body;

  if (!isPeriodWithinSameWeek) {
    try {
      var { status } = await sendReportPeriodsToReportLoader(req.body);
      return res.status(status).json({ msg: "Загрузка отчётов началась. Они будут отображаться по мере их добавления" });
    } catch {
      return res.status(503).json({ msg: "Не удалось загрузить отчёты за выбранный период.\nВременно доступна загрузка отчётов по одному" });
    }
  }

  next();
};

module.exports = reportLoadDelegate;
