import dbUtils from "../../../database/collections/index.js";

var deleteAllReports = async (req, res, next) => {
  var { deleteAllReportsByUserId } = dbUtils.reportCollectionServices;
  var { deleteReportTreeByUserId } = dbUtils.reportsTreeCollectionServices;
  var { deleteTaxYears } = dbUtils.taxParamsCollectionServices;

  var { userId } = req.params;

  var taxYearsIdDeleted = await deleteTaxYears(userId);
  var reportsIsDeleted = await deleteAllReportsByUserId(userId);
  var reportTreeIsDeleted = await deleteReportTreeByUserId(userId);

  return taxYearsIdDeleted && reportsIsDeleted && reportTreeIsDeleted ? res.sendStatus(200) : res.sendStatus(304);
};

export default deleteAllReports;
