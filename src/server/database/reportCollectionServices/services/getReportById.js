var getReportById = async (collection, userId, id) => {
  var data = await collection.findOne({ userId, "reports.id": id });

  var reports = data.reports;

  var report = reports.find((report) => report.id == id);

  return report;
};

module.exports = getReportById;
