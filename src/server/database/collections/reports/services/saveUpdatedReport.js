import { DatabaseError } from "../../../../customError/index.js";
var saveUpdatedReport = async (collection, userId, reportId, report) => {
  try {
    var result = await collection.updateOne(
      { userId, "reports.reportId": reportId },
      {
        $set: { "reports.$": report },
      },
    );

    return result.acknowledged;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

export default saveUpdatedReport;
