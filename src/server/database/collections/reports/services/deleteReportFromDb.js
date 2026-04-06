import { DatabaseError } from "../../../../customError/index.js";
var deleteReportFromDb = async (collection, userId, reportId, session) => {
  try {
    var doc = await collection.findOne({ userId, "reports.reportId": reportId }, { "reports.$": 1 }, { session: session });
    await collection.updateOne({ userId, "reports.reportId": reportId }, { $pull: { reports: { reportId } } }, { session: session });
    var report = doc.reports[0].toObject();
    return report;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

export default deleteReportFromDb;
