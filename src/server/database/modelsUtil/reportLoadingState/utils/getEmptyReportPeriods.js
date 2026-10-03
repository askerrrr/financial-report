import { reportLoadingStateModel } from "../../../models/index.js";

var getEmptyReportPeriods = async (userId, session) => {
  var sessionOptions = session
    ? { session }
    : { readPreference: "secondaryPreferred" };

  var data = await reportLoadingStateModel
    .findOne({ userId }, null, { ...sessionOptions })
    .select("emptyReportPeriods");

  return { emptyReportPeriods: data?.emptyReportPeriods || [] };
};

export default getEmptyReportPeriods;
