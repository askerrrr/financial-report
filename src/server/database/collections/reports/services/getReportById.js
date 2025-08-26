var { DatabaseError, ReportNotFoundError } = require("../../../../customError");

var getReportById = async (collection, userId, id) => {
  try {
    var data = await collection.findOne({ userId, "reports.reportId": id });

    if (!data) {
      throw new ReportNotFoundError(userId, id);
    }

    var report = data.reports.find((report) => report.reportId == id);

    return report.toObject();
  } catch (e) {
    if (e instanceof ReportNotFoundError) {
      throw e;
    }

    throw new DatabaseError(userId, e);
  }
};

module.exports = getReportById;
