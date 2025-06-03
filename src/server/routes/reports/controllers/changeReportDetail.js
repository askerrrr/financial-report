var changeElementInArray = require("../services/differentServices/changeElementInArray");
var calcRemainingParams = require("../services/writeAndCalcReportDataFromWBAPI/calcRemainingParams");

var changeReportDetail = async (req, res, next) => {
  var { updateItems, getReportById } =
    req.app.locals.reportCollectionServices();

  var { userId, reportId } = req.body;

  var { items } = await getReportById(userId, reportId);

  var changedItems = await changeElementInArray(items, req.body);

  var item = changedItems[req.body.index];

  var itemWithCalculatedParams = await calcRemainingParams(
    item,
    +req.body.value
  );

  changedItems[req.body.index] = itemWithCalculatedParams;

  var successUpdate = await updateItems(userId, reportId, changedItems);

  if (successUpdate) {
    return res.status(200).json({
      index: req.body.index,
      netProfitMargin: itemWithCalculatedParams.netProfitMargin,
      finalNetProfitPerItem: itemWithCalculatedParams.finalNetProfitPerItem,
      averageFinalNetProfitPerItem:
        itemWithCalculatedParams.averageFinalNetProfitPerItem,
    });
  }

  res.sendStatus(304);
};

module.exports = changeReportDetail;
