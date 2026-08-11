var getEmptyReportPeriods = async (collection, userId, session) => {
  var sessionOptions = session ? { session } : {};

  var data = await collection.findOne({ userId }, null, { ...sessionOptions }).select("emptyReportPeriods");
  return { emptyReportPeriods: data?.emptyReportPeriods || [] };
};

export default getEmptyReportPeriods;
