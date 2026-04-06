var updateReportFinancialAccountingStatus = async (collection, userId, reportId, newStatus) =>
  await collection.updateOne({ userId, "reports.reportId": reportId }, { $set: { "reports.$.isFinancesAccounted": newStatus } });

export default updateReportFinancialAccountingStatus;
