var env = require("../../../env");

var reportLoadDelegate = async (req, res, next) => {
  var { userId, dateFrom, dateTo, isPeriodWithinSameWeek } = req.body;

  if (!isPeriodWithinSameWeek) {
    await fetch(env.report_loader_url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ userId, dateFrom, dateTo }),
    });

    return res.sendStatus(202);
  }

  next();
};

module.exports = reportLoadDelegate;
