var isWeeklyFinancialReportNotYetAvailable = ({
  weeklyFinancialReport,
  paidStorageReport,
  advertisingReport,
}) => {
  return (
    !weeklyFinancialReport.length &&
    (paidStorageReport.length || advertisingReport.length)
  );
};

export default isWeeklyFinancialReportNotYetAvailable;
