import dbUtils from "../../../database/collections/index.js";

var changeFinancialAccountingStatus = async (req, res) => {
  var { userId, reportId, newStatus } = req.body;

  var { addReportToAccounted } = dbUtils.reportCollectionServices;

  await addReportToAccounted(userId, reportId, newStatus);
  return res.sendStatus(200);
};

export default changeFinancialAccountingStatus;
