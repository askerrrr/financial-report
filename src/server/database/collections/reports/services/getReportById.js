var { DatabaseError, ReportNotFoundError } = require("../../../../customError");

var getReportById = async (collection, userId, reportId) => {
  try {
    var { reports } = await collection.findOne({ userId });

    var report = reports.find((report) => report.reportId == reportId);

    if (!report) {
      throw new ReportNotFoundError(userId, reportId);
    }

    return report;
  } catch (e) {
    if (e instanceof ReportNotFoundError) {
      throw e;
    }

    throw new DatabaseError(userId, e);
  }
};

module.exports = getReportById;
