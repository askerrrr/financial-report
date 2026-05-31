var updateReportLoadingStoppedStatus = async (collection, userId, newStatus, session) => {
  var sessionOptions = session ? { session: session } : {};
  await collection.updateOne({ userId }, { $set: { isReportLoadingisStopped: newStatus } }, { ...sessionOptions });
};
export default updateReportLoadingStoppedStatus;
