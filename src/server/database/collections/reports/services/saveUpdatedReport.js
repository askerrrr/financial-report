var { DatabaseError } = require("../../../../customError");

var saveUpdatedReport = async (collection, userId, reportId, report) => {
  try {
    var result = await collection.updateOne(
      { userId, "reports.reportId": reportId },
      {
        $set: { "reports.$": report },
      }
    );

    return result.acknowledged;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = saveUpdatedReport;
