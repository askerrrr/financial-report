var getReportByPeriodFromWBAPI = require("../services/differentServices/getReportByPeriodFromWBAPI");

var getReportFromWBAPI = async (req, res, next) => {
  var { getWBTokenByUserId } = req.app.locals.tokenCollectionServices();

  var { userId, dateFrom, dateTo } = req.body;

  var token = await getWBTokenByUserId(userId);

  var report = await getReportByPeriodFromWBAPI(
    dateFrom,
    dateTo,
    token,
    userId
  );

  req.report = report;

  next();
};

module.exports = getReportFromWBAPI;
