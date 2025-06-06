var getReportByPeriodFromWBAPI = require("../services/differentServices/getReportByPeriodFromWBAPI");
var createPaidStorageReportTask = require("../services/differentServices/createPaidStorageReportTask");
var getPaidStorageReportByPeriodFromWBAPI = require("../services/differentServices/getPaidStorageReportByPeriodFromWBAPI");

var getReportFromWBAPI = async (req, res, next) => {
  var { getWBTokenByUserId } = req.app.locals.tokenCollectionServices();

  var { userId, dateFrom, dateTo } = req.body;

  var token = await getWBTokenByUserId(userId);

  var taskId = await createPaidStorageReportTask(
    dateFrom,
    dateTo,
    token,
    userId
  );

  var paidStorageReport = await getPaidStorageReportByPeriodFromWBAPI(
    taskId,
    token,
    userId
  );

  var report = await getReportByPeriodFromWBAPI(
    dateFrom,
    dateTo,
    token,
    userId
  );

  req.reportData = { report, paidStorageReport, dateFrom, dateTo };

  next();
};

module.exports = getReportFromWBAPI;
