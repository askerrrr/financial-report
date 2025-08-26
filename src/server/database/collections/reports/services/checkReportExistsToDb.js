var { DatabaseError } = require("../../../../customError");

var checkReportExistsToDb = async (collection, userId, dateFrom, dateTo) => {
  try {
    var report = await collection.findOne({ userId, "reports.dateFrom": dateFrom, "reports.dateTo": dateTo });

    return report;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = checkReportExistsToDb;
