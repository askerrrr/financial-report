var { dbClient } = require("../../../database");
var reportsProcessing = require("../../reports/services/different/reportsProcessing");

var weeklyReportsLoader = async (req, res) => {
  var { getAllUsersFromDb } = req.app.locals.userCollectionServices;

  var { users } = await getAllUsersFromDb();

  var dateFrom, dateTo;

  for (var { userId } of users) {
    try {
      var session = await dbClient.startSession();

      await session.withTransaction(async () => {
        await reportsProcessing(userId, dateFrom, dateTo, session);
      });
    } catch (e) {
      throw e;
    } finally {
      await session.endSession();
    }
  }
};

module.exports = weeklyReportsLoader;
