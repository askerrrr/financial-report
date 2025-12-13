var { DatabaseError, ReportNotFoundError } = require("../../../../customError");

var getReportById = async (collection, userId, reportId, session) => {
  try {
    var data;
    if (session) {
      data = await collection.findOne(
        { userId, "reports.reportId": reportId },
        { "reports.$": 1 },
        { session: session }
      );
    } else {
      data = await collection.findOne({ userId, "reports.reportId": reportId }, { "reports.$": 1 });
    }

    if (!data.reports.length) {
      throw new ReportNotFoundError(userId, reportId);
    }

    return { report: data.reports[0].toObject() };
  } catch (e) {
    if (e instanceof ReportNotFoundError) {
      throw e;
    }

    throw new DatabaseError(userId, e);
  }
};

module.exports = getReportById;
