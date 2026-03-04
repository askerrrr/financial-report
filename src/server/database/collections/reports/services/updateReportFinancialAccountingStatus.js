var updateReportFinancialAccountingStatus = async (collection, userId, reportId, newStatus) =>
  await collection.updateOne({ userId, "reports.reportId": reportId }, { $set: { "reports.$.isFinancesAccounted": newStatus } });

module.exports = updateReportFinancialAccountingStatus;
