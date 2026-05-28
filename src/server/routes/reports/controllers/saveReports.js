import { dbClient } from "../../../database/index.js";
import reportsProcessing from "../services/different/reportsProcessing.js";

var sessionOptions = { maxTimeMs: 150_000 };

var saveReports = async (req, res, next) => {
  var { dateTo, dateFrom, userId } = req.body;

  try {
    var session = await dbClient.startSession(sessionOptions);
    await session.withTransaction(async () => {
      var reportData = await reportsProcessing(userId, dateFrom, dateTo, session);
      return res.json(reportData);
    });
  } catch (e) {
    throw e;
  } finally {
    await session.endSession();
  }
};

export default saveReports;
