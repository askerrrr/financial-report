import dbUtils from "../../../database/collections/index.js";

var changeReportPeriod = async (req, res, next) => {
  var { updateReportPeriod } = dbUtils.reportCollectionServices;

  var { userId, reportId, value } = req.body;

  var succussfullUpdate = await updateReportPeriod(userId, reportId, value);

  return res.sendStatus(200);
};

export default changeReportPeriod;
