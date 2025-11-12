var { DatabaseError, ReportNotFoundError } = require("../../../../customError");

var getReportById = async (collection, userId, reportId) => {
  try {
    var { reports } = await collection.findOne(
      { userId, "reports.reportId": reportId },
      { "reports.$": 1 }
    );

    if (!reports.length) {
      throw new ReportNotFoundError(userId, reportId);
    }

    return { report: reports[0].toObject() };
  } catch (e) {
    if (e instanceof ReportNotFoundError) {
      throw e;
    }

    throw new DatabaseError(userId, e);
  }
};

module.exports = getReportById;
