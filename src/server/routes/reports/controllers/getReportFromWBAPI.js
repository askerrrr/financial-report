var getReportByPeriodFromWBAPI = require("../services/different/getReportByPeriodFromWBAPI");
var createPaidStorageReportTask = require("../services/different/createPaidStorageReportTask");
var getAdvertisingCostsForPeriod = require("../services/different/getAdvertisingCostsForPeriod");
var getPaidStorageReportByTaskIdFromWBAPI = require("../services/different/getPaidStorageReportByTaskIdFromWBAPI");
var checkPaidStorageReportCreationStatus = require("../services/different/checkPaidStorageReportCreationStatus");

var getReportFromWBAPI = async (req, res, next) => {
  var userId = req.app.locals.userId
  var { dateFrom, dateTo } = req.body;
  var { getWBTokenByUserId } = req.app.locals.tokenCollectionServices;

  var token = await getWBTokenByUserId(userId);

  var taskId = await createPaidStorageReportTask(dateFrom, dateTo, token, userId);

  var statusIsDone = await checkPaidStorageReportCreationStatus(taskId, token);

  if (!statusIsDone) {
    return res.sendStatus(304);
  }

  var storageReport = await getPaidStorageReportByTaskIdFromWBAPI(taskId, token, userId);

  var totalAdvertisingCosts = await getAdvertisingCostsForPeriod(dateFrom, dateTo, token, userId);

  var mainReport = await getReportByPeriodFromWBAPI(dateFrom, dateTo, token, userId);

  req.reportData = {
    dateTo,
    dateFrom,
    mainReport,
    storageReport,
    totalAdvertisingCosts,
  };

  next();
};

module.exports = getReportFromWBAPI;
