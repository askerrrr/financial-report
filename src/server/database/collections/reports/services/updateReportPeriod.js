var { DatabaseError } = require("../../../../customError");

var updateReportPeriod = async (collecton, userId, reportId, period) => {
  try {
    var result = await collecton.updateOne(
      { userId, "reports.reportId": reportId },
      {
        $set: { "reports.$.period": period },
      }
    );

    return result.modifiedCount;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = updateReportPeriod;
