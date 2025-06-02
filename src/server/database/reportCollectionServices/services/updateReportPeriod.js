var { DatabaseError } = require("../../../customError/customError");

var updateReportPeriod = async (collecton, userId, reportId, period) => {
  try {
    var result = await collecton.updateOne(
      { userId, "reports.id": reportId },
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
