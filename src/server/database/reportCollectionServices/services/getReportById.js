var { DatabaseError } = require("../../../customError/customError");

var getReportById = async (collection, userId, id) => {
  try {
    var data = await collection.findOne({ userId, "reports.reportId": id });

    var report = data.reports.find((report) => report.reportId == id);

    return report.toObject();
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = getReportById;
