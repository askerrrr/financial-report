var { connection } = require("../../../database");
var reportsProcessing = require("../services/different/reportsProcessing");

var saveReports = async (req, res, next) => {
  var { dateTo, dateFrom, userId } = req.body;

  try {
    var session = await connection.startSession();
    await session.withTransaction(async () => {
      try {
        var data = await reportsProcessing(userId, dateFrom, dateTo, session);

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
