var { DatabaseError } = require("../../../../customError");

var getReportsByUserId = async (collection, userId, year) => {
  try {
    var { reports } = await collection.findOne({ userId });

    if (year) {
      return reports.filter((reports) => reports.recordTo.year == year);
    }

    return reports;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = getReportsByUserId;
