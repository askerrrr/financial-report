var getReports = require("../services/WBAPI");

var getReportsFromWBAPI = async (req, res, next) => {
  var { userId, dateFrom, dateTo } = req.body;
  var { getWBTokenByUserId } = req.app.locals.tokenCollectionServices;

  var token = await getWBTokenByUserId(userId);
  var reports = await getReports(userId, dateFrom, dateTo, token);

  req.body = { dateTo, dateFrom, reports, userId };
  next();
};

module.exports = getReportsFromWBAPI;
