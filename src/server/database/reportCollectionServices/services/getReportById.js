var getReportById = async (collection, userId, id) => {
  var data = await collection.findOne({ userId, "reports.reportId": id });

  var report = data.reports.find((report) => report.reportId == id);

  return report;
};

module.exports = getReportById;
