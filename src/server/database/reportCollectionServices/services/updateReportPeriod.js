var updateReportPeriod = async (collecton, userId, reportId, period) => {
  var result = await collecton.updateOne(
    { userId, "reports.id": reportId },
    {
      $set: { "reports.$.period": period },
    }
  );

  return result.modifiedCount;
};

module.exports = updateReportPeriod;
