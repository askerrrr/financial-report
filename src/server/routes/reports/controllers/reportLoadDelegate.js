var env = require("../../../env");

var reportLoadDelegate = async (req, res, next) => {
  var { userId, dateFrom, dateTo, isPeriodWithinSameWeek } = req.body;

  if (!isPeriodWithinSameWeek) {
    try {
      await fetch(env.report_loader_url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ userId, dateFrom, dateTo }),
      });

      return res.sendStatus(202);
    } catch {
      return res.status(503).json({ msg: "Не удалось загрузить отчёты за выбранный период.\nВременно доступна загрузка отчётов по одному" });
    }
  }

  next();
};

module.exports = reportLoadDelegate;
