var getReportByPeriodFromWBAPI = require("../services/getReportByPeriodFromWBAPI");

var gettingReriodDateFromClient = async (req, res, next) => {
  var { getWBTokenByUserId } = req.app.locals.tokenCollectionServices();

  var { userId, dateFrom, dateTo } = req.body;

  var token = await getWBTokenByUserId(userId);

  var report = await getReportByPeriodFromWBAPI(dateFrom, dateTo, token);

  req.report = report;

  next();
};

module.exports = gettingReriodDateFromClient;
