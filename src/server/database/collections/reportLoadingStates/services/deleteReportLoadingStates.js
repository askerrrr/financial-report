var deleteReportLoadingStates = async (collection, userId, session) =>
  await collection.updateOne(
    { userId },
    { $set: { requiredReportPeriods: [], reportsQueue: [], loadingInProgress: false, abandonedReports: [], freshReportPeriodIndex: -1 } }
  );

module.exports = deleteReportLoadingStates;
