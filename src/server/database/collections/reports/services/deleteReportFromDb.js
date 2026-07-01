var deleteReportFromDb = async (collection, userId, reportId, session) => {
  var doc = await collection.findOneAndUpdate(
    { userId },
    { $pull: { reports: { reportId } }, $pull: { reportsWithAccountedFinances: { reportId } } },
    { returnDocument: "before", session: session },
  );

  return { reportBeforeDeletion: doc.reports[0].toObject() };
};

export default deleteReportFromDb;
