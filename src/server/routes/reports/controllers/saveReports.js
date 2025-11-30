var { connection } = require("../../../database");
var reportsProcessing = require("../services/different/reportsProcessing");

var saveReports = async (req, res, next) => {
  var { dateTo, dateFrom, userId } = req.body;

  try {
    var session = await connection.startSession();
    await session.withTransaction(async () => {
      var startYear = dateFrom.split("-")[0];
      var endYear = dateTo.split("-")[0];
      try {
        var data;
        var isCrossYearReport = false;

        if (startYear === endYear) {
          data = await reportsProcessing(userId, dateFrom, dateTo, isCrossYearReport, session);
        } else {
          isCrossYearReport = true;
          data = await reportsProcessing(userId, dateFrom, dateTo, isCrossYearReport, session);
        }

        res.json(data);
      } catch (e) {
        throw e;
      }
    });
  } catch (e) {
    throw e;
  } finally {
    await session.endSession();
  }
};

module.exports = saveReports;
