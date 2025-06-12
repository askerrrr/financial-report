var updateReport = async (collection, userId, reportId, report) => {
  var result = await collection.updateOne(
    { userId, "reports.reportId": reportId },
    {
      $set: { "reports.$": report },
    }
  );

  return result.acknowledged;
};

module.exports = updateReport;
