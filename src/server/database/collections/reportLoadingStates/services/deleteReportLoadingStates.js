var deleteReportLoadingStates = async (collection, userId, session) =>
  await collection.updateOne({ userId }, { $set: { reportsQueue: [], loadingInProgress: false, abandonedReports: [], freshReportPeriodIndex: -1 } });

export default deleteReportLoadingStates;
