import { reportModel } from "../../../models/index.js";

var getReportById = async (userId, reportId, session) => {
  var sessionOptions = session
    ? { session }
    : { readPreference: "secondaryPreferred" };

  var report = await reportModel.findOne({ userId, reportId }, null, {
    ...sessionOptions,
  });

  return { report };
};

export default getReportById;
