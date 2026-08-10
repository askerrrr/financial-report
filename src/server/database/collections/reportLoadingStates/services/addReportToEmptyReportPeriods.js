var addReportToEmptyReportPeriods = async (collection, userId, dateFrom, dateTo, session) => {
  var sessionOptions = session ? { session } : {};

  await collection.updateOne({ userId }, { $push: { emptyReportPeriods: { dateFrom, dateTo } } });
};

export default addReportToEmptyReportPeriods;
