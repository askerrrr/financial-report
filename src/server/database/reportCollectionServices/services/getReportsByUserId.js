var getReportsByUserId = async (collection, userId) => {
  var user = await collection.findOne({ userId });

  var reports = user?.reports || [];

  return reports;
};

module.exports = getReportsByUserId;
