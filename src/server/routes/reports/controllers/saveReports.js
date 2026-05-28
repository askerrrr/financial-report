import { dbClient } from "../../../database/index.js";
import reportsProcessing from "../services/different/reportsProcessing.js";

var sessionOptions = {};

var saveReports = async (req, res, next) => {
  var { dateTo, dateFrom, userId } = req.body;

  try {
    var session = await dbClient.startSession();
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
