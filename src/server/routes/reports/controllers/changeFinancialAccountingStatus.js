var dbUtils = require("../../../database/collections");

var changeFinancialAccountingStatus = async (req, res) => {
  var { userId, reportId, newStatus } = req.body;

  var { updateReportFinancialAccountingStatus } = dbUtils.reportCollectionServices;

  await updateReportFinancialAccountingStatus(userId, reportId, newStatus);
  return res.sendStatus(200);
};

module.exports = changeFinancialAccountingStatus;
