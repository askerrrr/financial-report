import dbUtils from "../../../database/collections/index.js";

var changeFinancialAccountingStatus = async (req, res) => {
  var { userId, reportId, newStatus } = req.body;

  var { addReportToAccounted, removeReportFromAccounted } = dbUtils.reportCollectionServices;

  if (newStatus) {
    await addReportToAccounted(userId, reportId);
  } else {
    await removeReportFromAccounted(userId, reportId);
  }

  return res.sendStatus(200);
};

export default changeFinancialAccountingStatus;
