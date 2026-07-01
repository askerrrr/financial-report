var removeReportFromAccounted = async (collectin, userId, reportId) => {
  return await collection.updateOne(
    { userId, "reports.reportId": reportId },
    { $set: { "reports.$.isFinancesAccounted": false }, $pull: { reportsWithAccountedFinances: { reportId } } },
  );
};

export default removeReportFromAccounted;
