var changeElementInArray = require("../services/differentServices/changeElementInArray");
var calcRestTotalParams = require("../services/writeAndCalcReportDataFromWBAPI/calcRestTotalParams");
var calcRemainingParams = require("../services/writeAndCalcReportDataFromWBAPI/calcServices/calcRemainingParams");

var changeReportDetail = async (req, res, next) => {
  var { updateReport, getReportById } =
    req.app.locals.reportCollectionServices();

  var { userId, reportId } = req.body;

  var { items, ...rest } = await getReportById(userId, reportId);

  var changedItems = await changeElementInArray(items, req.body);

  var item = changedItems[req.body.index];

  var itemWithCalculatedParams = await calcRemainingParams(
    item,
    +req.body.value
  );

  changedItems[req.body.index] = itemWithCalculatedParams;

  var updatedReport = await calcRestTotalParams(rest, changedItems);

  var successUpdate = await updateReport(userId, reportId, updatedReport);

  if (successUpdate) {
    var {
      netProfitMargin,
      finalNetProfitPerItem,
      averageFinalNetProfitPerItem,
    } = itemWithCalculatedParams;

    var { totalFinalNetProfit, totalNetProfitMargin } = updatedReport;

    return res.status(200).json({
      netProfitMargin,
      finalNetProfitPerItem,
      averageFinalNetProfitPerItem,
      total: { totalFinalNetProfit, totalNetProfitMargin },
      index: req.body.index,
    });
  }

  res.sendStatus(304);
};

module.exports = changeReportDetail;
