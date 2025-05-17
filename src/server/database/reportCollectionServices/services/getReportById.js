var getReportById = async (collection, userId, id) => {
  var data = await collection.findOne({ userId, "reports.id": id });

  var reports = data.reports;
};

module.exports = getReportById;
