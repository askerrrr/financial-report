var { DatabaseError } = require("../../../customError/");

var getReportingPeriods = async (collection, userId) => {
  try {
    var reportingPeriods = await collection.findOne({ userId }).exec();

    return reportingPeriods;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = getReportingPeriods;
