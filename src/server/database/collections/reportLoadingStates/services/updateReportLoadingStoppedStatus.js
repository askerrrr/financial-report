var updateReportLoadingStoppedStatus = async (collection, userId, newStatus, session) => {
  var sessionOptions = session ? { session: session } : {};
  await collection.updateOne({ userId }, { $set: { isReportLoadingIsStopped: newStatus } }, { ...sessionOptions });
};
export default updateReportLoadingStoppedStatus;
