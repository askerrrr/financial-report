var getEmptyReportPeriods = async (collection, userId) => {
  var data = await collection.findOne({ userId }).select("emptyReportPeriods");
  return { emptyReportPeriods: data?.emptyReportPeriods || [] };
};

export default getEmptyReportPeriods;
