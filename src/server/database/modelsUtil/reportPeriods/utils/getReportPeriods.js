import { reportPeriodModel } from "../../../models/index.js";

var getReportPeriods = async (userId, session) => {
  var sessionOptions = session
    ? { session }
    : { readPreference: "secondaryPreferred" };

  var { reportPeriods } = await reportPeriodModel.findOne(
    { userId },
    {},
    { ...sessionOptions },
  );

  return { reportPeriods };
};

export default getReportPeriods;
