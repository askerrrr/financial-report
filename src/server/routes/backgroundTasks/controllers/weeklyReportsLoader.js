import { dbClient } from "../../../database/index.js";
import reportsProcessing from "../../reports/services/different/reportsProcessing.js";

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

export default weeklyReportsLoader;
